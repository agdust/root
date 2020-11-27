use super::FactionId;
use sqlx::{postgres::PgConnection, query_as};

#[derive(Clone, serde::Serialize, serde::Deserialize)]
#[serde(rename = "owned_item")]
pub struct OwnedItem {
    item: i16,
    faction: FactionId,
}

impl OwnedItem {
    pub async fn load(game: &str, conn: &mut PgConnection) -> sqlx::Result<Vec<Self>> {
        query_as!(
            Self,
            r#"SELECT item, faction as "faction: _" FROM owned_items WHERE game = $1"#,
            game
        )
        .fetch_all(conn)
        .await
    }
}
