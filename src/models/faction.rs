#[derive(Copy, Clone, Eq, PartialEq, Debug, serde::Serialize, serde::Deserialize)]
#[serde(rename_all = "kebab-case")]
pub enum Faction {
    Marquise,
    Eyrie,
    Alliance,
    Vagabond,
    Vagabond2,
    Cult,
    Riverfolk,
    Duchy,
    Conspiracy,
    MarquiseBot,
}
