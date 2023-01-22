import { ControlType } from '../control.type';
import IHero from './hero.interface';
import PlayerCardModel from './player-card.interface';

export default interface IPlayer {
   id: number;
   hand: PlayerCardModel[];
   left: number[];
   draftFinished: boolean;
   color: string;
   heros: IHero[];
   controlType: ControlType;

   money?: number;
   influence?: number;
   votes?: number;
   helpers?: number;
}
