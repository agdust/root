import Clearing from '../../../../model/board/Clearing';
import Faction from '../../../../model/Faction';
import Client from '../../../../model/Client';
import Pieces, { Piece } from '../../../../model/Piece';
import clients from '../../../store/clients';
import { Card } from '../../../../model/Card';

export default async function * returnPiece(this: Client, piece: Piece, clearing: Clearing, remover: Faction): AsyncIterableIterator<void> {
  if (!piece.faction) { return; }

  // 1 point for destroying buildings and tokens
  if (piece.shape === 'round' || piece.shape === 'square') {
    this.game.factionData[remover]!.victoryPoints += 1;
  }

  if (Piece.equals(piece, Pieces.riverfolk.trade_post_fox)
    || Piece.equals(piece, Pieces.riverfolk.trade_post_rabbit)
    || Piece.equals(piece, Pieces.riverfolk.trade_post_mouse)
    || Piece.equals(piece, Pieces.marquise.keep)
  ) {
    // these ones get discarded
    return;
  }

  // Marquise's field hospitals
  do {
    if (!Piece.equals(piece, Pieces.marquise.warrior)) { break; }
    if (!this.game.factionData.marquise!.hasSuitableCard(clearing.suit)) { break; }

    const keepClearing = this.game.board.locate(Pieces.marquise.keep);
    if (!keepClearing) { break; }

    const marquisePlayer = this.game.playersByFaction[Faction.marquise];

    // @ts-ignore
    const { card: index } = await clients
      .get(this.game._clients[marquisePlayer.username])!
      .send('fieldHospital', { suit: clearing.suit });

    const card = this.game.factionData.marquise!.hand[index];
    if (card && Card.isSuitable(card, clearing.suit)) {
      keepClearing.addPiece(Pieces.marquise.warrior);
      return;
    }
  } while (false);

  // TODO: some special things for certain buildings

  (this.game.factionData[piece.faction] as any)[piece.name] += 1;
}
