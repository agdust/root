use futures::{future::ready, StreamExt};
use log::{debug, info, warn};
use std::sync::Arc;
use tokio::sync::mpsc::unbounded_channel;
use tokio::sync::RwLock;
use uuid::Uuid;
use warp::ws::{self, WebSocket};

mod command_error;
mod message;
mod room;
mod runtime;
mod socket_state;

use command_error::CommandError;
use message::Message;
use socket_state::SocketState;

#[derive(serde::Deserialize)]
struct Packet {
    id: Uuid,
    msg: Message,
}

#[derive(serde::Serialize)]
#[serde(rename = "lowercase")]
enum Status {
    Ok,
    Err,
}

#[derive(serde::Serialize)]
struct Response {
    id: Uuid,
    status: Status,
    error: Option<CommandError>,
    data: serde_json::Value,
}

pub async fn handler(websocket: WebSocket) {
    let (ws_tx, ws_rx) = websocket.split();
    let (tx, rx) = unbounded_channel::<String>();
    tokio::task::spawn(rx.map(ws::Message::text).map(Ok).forward(ws_tx));
    let state = SocketState::new(tx);
    info!("Socket connected {}", state.id());
    let state = Arc::new(RwLock::new(state));
    ws_rx
        .take_while(|result| ready(result.is_ok()))
        .map(Result::unwrap)
        .map(|msg| msg.to_str().map(|s| s.to_owned()))
        .take_while(|result| ready(result.is_ok()))
        .map(Result::unwrap)
        .for_each({
            let state = state.clone();
            move |msg| {
                let state = state.clone();
                async move {
                    let st = state.read().await;
                    let sender = st.sender();
                    let packet = match serde_json::from_str::<Packet>(msg.as_str()) {
                        Ok(packet) => packet,
                        Err(error) => {
                            warn!("Invalid packet received `{}`\n{}", msg, error);
                            return;
                        }
                    };
                    match st.name() {
                        Some(name) => debug!("{}({}): {:?}", st.id(), name, msg),
                        None => debug!("{}: {:?}", st.id(), msg),
                    };
                    std::mem::drop(st);
                    match Message::handle(state, packet.msg).await {
                        Ok(value) => sender
                            .send(
                                serde_json::to_string(&Response {
                                    id: packet.id,
                                    status: Status::Ok,
                                    error: None,
                                    data: value,
                                })
                                .unwrap(),
                            )
                            .ok(),
                        Err(error) => sender
                            .send(
                                serde_json::to_string(&Response {
                                    id: packet.id,
                                    status: Status::Err,
                                    error: Some(error),
                                    data: serde_json::Value::Null,
                                })
                                .unwrap(),
                            )
                            .ok(),
                    };
                }
            }
        })
        .await;
    let mut state = state.write().await;
    state.leave_room().await;
    info!("Socket disconnected {}", state.id());
}