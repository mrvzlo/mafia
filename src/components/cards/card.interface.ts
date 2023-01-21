import IEvent from '../events/event.interface';

export default interface ICard {
   id: number;
   isGreen: boolean;
   isRed: boolean;
   isBlue: boolean;
   events: IEvent[];
   maxEvents: number;
   player: boolean;
}
