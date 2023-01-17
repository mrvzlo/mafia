import ICard from './card.interface';
import CardModel from './card.model';

export default class PlayerCardModel extends CardModel {
   isGreen = false;
   isRed = false;
   isBlue = false;
   maxEvents = 1;
   reserved = false;
   pickedRound = 0;

   constructor(data: ICard) {
      super(data);

      this.isBlue = data.isBlue;
      this.isGreen = data.isGreen;
      this.isRed = data.isRed;
      this.maxEvents = data.maxEvents;
   }
}
