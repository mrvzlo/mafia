import IPlayer from './models/player.interface';
import IReservedCard from './models/reserved-card.interface';

export default class PlayerDraftService {
   constructor(private player: IPlayer) {}

   pick(id: number, stage: number) {
      const card = this.player.hand.find((x) => x.id === id);
      if (!card || card.reserved) return;
      if (card.pickedStage !== stage && this.player.left[stage] <= 0) return;
      card.pickedStage = card.pickedStage === stage ? -1 : stage;
      this.recalcLeft();
   }

   recalcLeft() {
      for (let i = 0; i < 3; i++) this.player.left[i] = 2 - this.player.hand.filter((x) => x.pickedStage === i).length;
   }

   confirmPicked(): IReservedCard[] {
      const reserved = this.player.hand
         .filter((x) => x.pickedStage !== undefined)
         .map((x) => ({ cardId: x.id, stage: x.pickedStage!, playerId: this.player.id }));
      this.player.hand.forEach((card) => {
         card.reserved ||= card.pickedStage !== undefined;
         card.pickedStage = undefined;
      });
      this.recalcLeft();
      this.player.draftFinished = true;
      return reserved;
   }

   giveBack(id: number) {
      const card = this.player.hand.find((x) => x.reserved && x.id === id);
      if (!card) return;
      card.reserved = false;
   }
}
