import CardModel from '../cards/card.model';
import ReservedCardModel from '../cards/reserved-card.model';
import { GameStageType } from './game-stage.type';
import PlayerModel from './player.model';

export default class GameModel {
   stage = GameStageType.None;
   round = 0;
   resolveState = 0;
   players: PlayerModel[] = [];

   firstRound: ReservedCardModel[] = [];
   secondRound: ReservedCardModel[] = [];
   thirdRound: ReservedCardModel[] = [];

   reservedGreen: ReservedCardModel[] = [];
   reservedRed: ReservedCardModel[] = [];
   reservedBlue: ReservedCardModel[] = [];

   neutralCards: CardModel[] = [];

   mainPlayer?: PlayerModel;

   setPlayer(id: number) {
      this.mainPlayer = this.players[id];
   }
}
