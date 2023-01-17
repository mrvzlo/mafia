import PlayerCardModel from '../cards/player-card.model';
import ReservedCardModel from '../cards/reserved-card.model';

export default class PlayerModel {
   hand: PlayerCardModel[] = [];

   constructor(private readonly id: number) {}

   giveHand(hand: PlayerCardModel[]) {
      this.hand = hand.slice(0);
   }

   pick(id: number, stage: number) {
      const card = this.hand.find((x) => x.id === id);
      if (!card) return;
      card.pickedRound = card.pickedRound === stage ? -1 : stage;
   }

   confirmPicked(): ReservedCardModel[] {
      const reserved = this.hand.filter((x) => x.pickedRound >= 0).map((x) => new ReservedCardModel(x.id, x.pickedRound, this.id));
      this.hand.forEach((x) => {
         x.reserved = x.pickedRound >= 0;
         x.pickedRound = 0;
      });
      return reserved;
   }

   giveBack(id: number) {
      const card = this.hand.find((x) => x.reserved && x.id === id);
      if (!card) return;
      card.reserved = false;
   }
}
