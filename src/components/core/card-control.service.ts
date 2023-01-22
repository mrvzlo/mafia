import Shuffle from '../shared/shuffle';
import { GameStageType } from './game-stage.type';
import IGame from './models/game.interface';
import ReservedCardModel from './models/reserved-card.interface';

export default class CardControlService {
   addNeutralCards(game: IGame) {
      game.neutralCards = Shuffle(game.neutralCards as []);
      game.firstRound.push({ cardId: 0, stage: 0 });
      game.firstRound.push({ cardId: 1, stage: 0 });
      game.firstRound.push({ cardId: 2, stage: 1 });
      game.firstRound.push({ cardId: 3, stage: 1 });
      game.firstRound.push({ cardId: 4, stage: 2 });
      game.firstRound.push({ cardId: 5, stage: 2 });
   }

   getCardToResolve(game: IGame): ReservedCardModel | null {
      if (game.stage === GameStageType.ResolveFirst) return game.firstRound[0];
      if (game.stage === GameStageType.ResolveSecond) return game.secondRound[0];
      if (game.stage === GameStageType.ResolveThird) return game.thirdRound[0];
      return null;
   }
}
