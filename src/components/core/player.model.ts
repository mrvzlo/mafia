import PlayerCardModel from '../cards/player-card.model';
import ReservedCardModel from '../cards/reserved-card.model';

export default class PlayerModel {
   hand: PlayerCardModel[] = [];
   left: number[] = [];
   draftFinished = false;

   constructor(private readonly id: number) {}

   giveHand(hand: PlayerCardModel[]) {
      this.hand = hand.slice(0);
      this.recalcLeft();
   }

   pick(id: number, stage: number) {
      const card = this.hand.find((x) => x.id === id);
      if (!card || card.reserved) return;
      if (card.pickedRound !== stage && this.left[stage] <= 0) return;
      card.pickedRound = card.pickedRound === stage ? -1 : stage;
      this.recalcLeft();
   }

   private recalcLeft() {
      for (let i = 0; i < 3; i++) this.left[i] = 2 - this.hand.filter((x) => x.pickedRound === i).length;
   }

   confirmPicked(): ReservedCardModel[] {
      const reserved = this.hand.filter((x) => x.pickedRound >= 0).map((x) => new ReservedCardModel(x.id, x.pickedRound, this.id));
      this.hand.forEach((card) => {
         card.reserved ||= card.pickedRound >= 0;
         card.pickedRound = -1;
      });
      this.recalcLeft();
      this.draftFinished = true;
      return reserved;
   }

   giveBack(id: number) {
      const card = this.hand.find((x) => x.reserved && x.id === id);
      if (!card) return;
      card.reserved = false;
   }
}
