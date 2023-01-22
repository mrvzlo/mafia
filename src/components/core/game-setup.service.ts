import ICard from './models/card.interface';
import PlayerCardModel from './models/player-card.interface';
import { ControlType } from './control.type';
import { GameStageType } from './game-stage.type';
import IGame from './models/game.interface';
import { Colors } from './colors.enum';
import MapSetupService from './map-setup.service';
import Shuffle from '../shared/shuffle';

export default class GameSetupService {
   setupGame(): IGame {
      const service = new MapSetupService();
      const game: IGame = {
         stage: GameStageType.None,
         firstRound: [],
         secondRound: [],
         thirdRound: [],
         neutralCards: this.getNeutralHand(),
         players: [],
         reservedBlue: [],
         reservedGreen: [],
         reservedRed: [],
         round: 0,
         map: service.setup(),
      };

      for (let i = 0; i < 6; i++)
         game.players.push({ id: i, color: Object.values(Colors)[i], controlType: 'None', draftFinished: false, hand: [], heros: [], left: [] });

      return game;
   }

   setupPlayer(game: IGame, index: number, control: ControlType) {
      const player = game.players[index];
      player.money = 15;
      player.influence = 0;
      player.votes = 0;
      player.helpers = 0;
      player.heros = [
         { id: 0, power: 4, troops: [] },
         { id: 1, power: 4, troops: [] },
         { id: 2, power: 4, troops: [] },
         { id: 3, power: 4, troops: [] },
      ];
      player.hand = this.getPlayerHand();
      player.controlType = control;
      if (control === 'Main') game.mainPlayer = player;
   }

   private getPlayerHand(): PlayerCardModel[] {
      return this.getCards()
         .filter((x) => !!x.player)
         .map((card) => ({ ...card, reserved: false }));
   }

   private getNeutralHand(): ICard[] {
      return this.getCards().filter((x) => !x.player);
   }

   private getCards = (): ICard[] => require('@/assets/json/cards.json');
}
