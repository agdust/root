use super::FactionId;
use sqlx::{postgres::PgConnection, query_as};

#[derive(Clone, serde::Serialize, serde::Deserialize)]
#[serde(rename = "eyrie")]
pub struct Eyrie {
    faction: FactionId,
}

impl Eyrie {
    pub async fn load(game: &str, conn: &mut PgConnection) -> sqlx::Result<Option<Self>> {
        query_as!(
            Self,
            r#"SELECT faction as "faction: _" FROM eyrie WHERE game = $1"#,
            game
        )
        .fetch_optional(conn)
        .await
    }
}
