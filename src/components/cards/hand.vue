<template>
   <div class="w-100" v-if="!player.draftFinished">
      <div v-if="isHandFull()" class="confirm-btn" v-on:click="confirm()">✔️</div>
      <div v-else>{{ $t('pick_cards') }}</div>
   </div>
   <div v-for="(card, index) in player.hand" :key="index" :class="'card ' + (card.reserved ? 'reserved' : '')">
      <h3>{{ $t(`card_names.${card.id}`) }}</h3>

      <template v-if="!card.reserved && !player.draftFinished">
         <div class="desc" v-html="$t(`card_descriptions.${card.id}`)"></div>

         <div v-for="i in 3" :key="i">
            <div
               :class="'stage stage-' + i + (card.pickedRound === i - 1 ? ' active' : '') + (player.left[i - 1] > 0 ? '' : ' disabled')"
               v-on:click="pick(card.id, i - 1)"
            >
               {{ i }}
            </div>
         </div>
      </template>
   </div>
</template>

<script lang="ts">
import { prop, Vue } from 'vue-class-component';
import PlayerModel from '../core/player.model';
import ReservedCardModel from './reserved-card.model';

class Props {
   player: PlayerModel = prop({ required: true });
   confirmDelegate: (cards: ReservedCardModel[]) => void = prop({ required: true });
}

export default class Hand extends Vue.with(Props) {
   pick(id: number, stage: number) {
      this.player.pick(id, stage);
   }

   confirm() {
      const confirmed = this.player.confirmPicked();
      this.confirmDelegate(confirmed);
   }

   isHandFull(): boolean {
      return this.player.left.every((x) => x === 0) || this.player.hand.every((x) => x.reserved || x.pickedRound >= 0);
   }
}
</script>
