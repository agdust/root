use super::{CardId, Suit};
use sqlx::{postgres::PgConnection, query_as};

#[derive(Clone, serde::Serialize, serde::Deserialize)]
#[serde(rename = "card")]
pub struct Card {
    id: i16,
    card: CardId,
    suit: Suit,
}

impl Card {
    pub async fn load(game: &str, conn: &mut PgConnection) -> sqlx::Result<Vec<Self>> {
        query_as!(
            Self,
            r#"SELECT id, card as "card: _", suit as "suit: _" FROM cards WHERE game = $1"#,
            game
        )
        .fetch_all(conn)
        .await
    }
}
