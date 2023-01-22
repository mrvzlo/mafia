import ICard from '../cards/card.interface';
import CardModel from '../cards/card.model';
import PlayerCardModel from '../cards/player-card.model';
import Shuffle from '../shared/shuffle';
import Colors from './colors.enum';
import { GameStageType } from './game-stage.type';
import GameModel from './game.model';
import PlayerModel from './player.model';

export default class GameSetupService {
   setup(players: number): GameModel {
      const game = new GameModel();

      const baseHand = this.getPlayerHand();
      for (let i = 0; i < 6; i++) {
         const player = new PlayerModel(i);
         player.color = new Colors().get(i);
         player.giveHand(baseHand);
         game.players.push(player);
      }

      game.players = Shuffle(game.players as []).slice(0, players);

      game.neutralCards = this.getNeutralHand();
      game.stage = GameStageType.Draft;
      return game;
   }

   private getPlayerHand(): PlayerCardModel[] {
      return this.getCards()
         .filter((x) => !!x.player)
         .map((card) => new PlayerCardModel(card));
   }

   private getNeutralHand(): CardModel[] {
      return this.getCards()
         .filter((x) => !x.player)
         .map((card) => new CardModel(card));
   }

   private getCards = (): ICard[] => require('@/assets/json/cards.json');
}
