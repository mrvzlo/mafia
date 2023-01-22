import CardModel from '../cards/card.model';
import ReservedCardModel from '../cards/reserved-card.model';
import Shuffle from '../shared/shuffle';
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

   addNeutralCards() {
      this.neutralCards = Shuffle(this.neutralCards as []);
      this.firstRound.push(new ReservedCardModel(0, 0));
      this.firstRound.push(new ReservedCardModel(1, 0));
      this.secondRound.push(new ReservedCardModel(2, 1));
      this.secondRound.push(new ReservedCardModel(3, 1));
      this.thirdRound.push(new ReservedCardModel(4, 2));
      this.thirdRound.push(new ReservedCardModel(5, 2));
   }
}
