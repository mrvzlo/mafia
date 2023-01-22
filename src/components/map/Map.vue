<template>
   <div class="city" :style="`width: ${totalWidth}px; height: ${totalHeight}px; --size:${tileSize}px`">
      <div
         v-for="(model, index) in game.map.inner"
         :key="index"
         :class="getClass(model)"
         :style="`--core-r:${getColor(model?.family)[0]};--core-g:${getColor(model?.family)[1]};--core-b:${getColor(model?.family)[2]};`"
         v-on:click="pickTile(index)"
      >
         <svg xmlns="http://www.w3.org/2000/svg" v-if="model?.level !== undefined" viewBox="0 0 64 64">
            <rect fill="#aaa" class="light" stroke="#111" y="10" x="2" width="60" height="36" rx="2" />
            <rect fill="#777" class="dark" stroke="#111" y="10" x="2" width="60" height="16" rx="2" />
            <rect fill="#ffa" stroke="#111" y="34" x="10" width="6" height="6" />
            <rect fill="#ffa" stroke="#111" y="34" x="16" width="6" height="6" />
            <rect fill="#ffa" stroke="#111" y="34" x="48" width="6" height="6" />
            <rect fill="#ffa" stroke="#111" y="34" x="42" width="6" height="6" />
            <rect fill="#777" class="dark" stroke="#111" y="32" x="28" width="8" height="14" />
            <rect fill="none" stroke="#111" x="30" y="39" width="0.5" height="0.5" />
         </svg>
         <template v-if="model && model.level && model.level > 0">
            <div class="money small">{{ model.level + (model.y === 0 ? 3 : 1) }}$</div>
            <div class="strength small">{{ model.level * 2 }}</div>
         </template>
         <div class="strength small" v-if="model && model.level === 0 && model.family !== undefined">4</div>
      </div>
      <div class="message block" v-if="game.stage < stages.Draft">
         <div v-if="!game.map.initiated">{{ $t('bankrupt') }}</div>
         <div v-else-if="game.stage === stages.HomePlacement">
            {{ $t('choose_home') }}
         </div>
      </div>
      <div v-if="game.stage === stages.HomePlacement && !canPlaceHome" class="confirm-btn" v-on:click="confirmHome()">✔️</div>
   </div>
</template>

<script setup lang="ts">
import ICityTile from '../core/models/city-tile.interface';
import { defineProps } from 'vue';
import MapClearService from '../core/map-clear.service';
import IGame from '../core/models/game.interface';
import { GameStageType } from '../core/game-stage.type';
import MapSetupService from '../core/map-setup.service';

const props = defineProps<{ game: IGame }>();

const max = Math.max(window.innerHeight, window.innerWidth);
const tileSize = Math.min(100, (max - 30) / props.game.map.width);
const totalWidth = tileSize * props.game.map.width;
const totalHeight = tileSize * props.game.map.height;
const stages = GameStageType;
const clearService = new MapClearService();
const setupService = new MapSetupService();
let canPlaceHome = false;

const getClass = (tile: ICityTile) => {
   if (!tile || tile.level === undefined) return 'tile';
   const direction = 'tile n';
   const status = tile?.level === 0 && !tile.family ? ' empty' : '';
   const family = tile.family !== undefined ? ' family' : '';
   return direction + status + family;
};

const pickTile = (index: number) => {
   if (props.game.stage === GameStageType.None) return;
   const tile = props.game.map.inner[index];
   if (tile.level === undefined) return;
   const family = props.game.mainPlayer?.id;
   if (props.game.stage === GameStageType.HomePlacement) {
      return pickHome(tile, family!);
   }
};

const pickHome = (tile: ICityTile, family: number) => {
   if (tile.y === 0 || tile.level !== 0) return;
   if (tile.family === family) {
      canPlaceHome = true;
      tile.family = undefined;
      return;
   }
   if (!canPlaceHome) return;
   tile.family = family;
   canPlaceHome = false;
};

const getColor = (family?: number): string => {
   if (family === undefined) return '';
   return props.game.players[family].color;
};

const confirmHome = () => {
   canPlaceHome = false;
   setupService.update(props.game);
};

if (!props.game.map.initiated) {
   setTimeout(() => {
      const players = props.game.players.reduce((a, b) => a + (b.controlType === 'None' ? 0 : 1), 0);
      clearService.bankrupt(props.game.map, players);
      setupService.update(props.game);
      canPlaceHome = true;
   }, 1000);
}
</script>
