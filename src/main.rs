use warp::Filter;

mod game;
use game::game;

#[tokio::main]
async fn main() {
    pretty_env_logger::init();

    let dist_dir = std::env::var("root_dist_dir").unwrap_or(String::from("dist"));
    let port: u16 = std::env::var("root_port").ok().and_then(|s| s.parse().ok()).unwrap_or(3000);

    let game = warp::path("game")
        .and(warp::ws())
        .map(|ws: warp::ws::Ws| ws.on_upgrade(game));
    let web = warp::fs::dir(dist_dir);
    let routes = game.or(web);

    warp::serve(routes).run(([127, 0, 0, 1], port)).await;
}