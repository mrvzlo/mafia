<template>
   <div class="w-100" v-if="!player.draftFinished">
      <div v-if="isHandFull()" class="confirm-btn" v-on:click="confirm()">✔️</div>
      <div v-else class="fs-20">{{ $t('pick_cards') }}</div>
   </div>
   <div v-for="(card, index) in player.hand" :key="index" :class="'card block ' + (card.reserved ? 'reserved' : '')">
      <h3>{{ $t(`card_names.${card.id}`) }}</h3>

      <template v-if="!card.reserved && !player.draftFinished">
         <div class="desc" v-html="$t(`card_descriptions.${card.id}`)"></div>

         <div v-for="i in 3" :key="i">
            <div
               :class="'stage stage-' + i + (card.pickedStage === i - 1 ? ' active' : '') + (player.left[i - 1] > 0 ? '' : ' disabled')"
               v-on:click="pick(card.id, i - 1)"
            >
               {{ i }}
            </div>
         </div>
      </template>
   </div>
</template>

<script setup lang="ts">
import IPlayer from '../core/models/player.interface';
import ReservedCardModel from '../core/models/reserved-card.interface';
import PlayerDraftService from '../core/player-draft.service';
import { defineProps } from 'vue';

const props = defineProps<{
   player: IPlayer;
   confirmDelegate: (cards: ReservedCardModel[]) => void;
}>();

const service = new PlayerDraftService(props.player);
service.recalcLeft();

const pick = (id: number, stage: number) => {
   service.pick(id, stage);
};

const confirm = () => {
   const confirmed = service.confirmPicked();
   props.confirmDelegate(confirmed);
};

const isHandFull = (): boolean => {
   return props.player.left.every((x) => x === 0) || props.player.hand.every((x) => x.reserved || x.pickedStage !== undefined);
};
</script>
