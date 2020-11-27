use super::FactionId;
use sqlx::{postgres::PgConnection, query_as};

#[derive(Clone, serde::Serialize, serde::Deserialize)]
#[serde(rename = "faction")]
pub struct Faction {
    faction: FactionId,
    player: Option<String>,
    points: i16,
}

impl Faction {
    pub async fn load(game: &str, conn: &mut PgConnection) -> sqlx::Result<Vec<Self>> {
        query_as!(Self, r#"SELECT faction as "faction: _", player, points FROM factions WHERE game = $1"#, game).fetch_all(conn).await
    }

    pub fn create(faction: FactionId) -> Self {
        Self {
            faction,
            player: None,
            points: 0,
        }
    }
}
