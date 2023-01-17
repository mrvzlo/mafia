import IEvent from '../events/event.interface';
import ICard from './card.interface';

export default class CardModel {
   id = 0;
   events: IEvent[] = [];

   constructor(data: ICard) {
      this.id = data.id;
      this.events = data.events;
   }
}
