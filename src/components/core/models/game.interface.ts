import { GameStageType } from '../game-stage.type';
import ICard from './card.interface';
import IPlayer from './player.interface';
import ReservedCardModel from './reserved-card.interface';

export default interface IGame {
   stage: GameStageType;
   round: number;
   players: IPlayer[];

   firstRound: ReservedCardModel[];
   secondRound: ReservedCardModel[];
   thirdRound: ReservedCardModel[];

   reservedGreen: ReservedCardModel[];
   reservedRed: ReservedCardModel[];
   reservedBlue: ReservedCardModel[];

   neutralCards: ICard[];

   mainPlayer?: IPlayer;
}
