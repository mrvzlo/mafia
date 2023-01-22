<template>
   <div class="city" :style="`width: ${totalWidth}px; height: ${totalHeight}px; --size:${tileSize}px`">
      <div v-for="(model, index) in map.inner" :key="index" :class="'poor ' + getDirection(model)">
         <template v-if="model && model.level && model.level > 0">
            <div class="money small">{{ model.level + (model.y === 0 ? 3 : 1) }}$</div>
            <div class="strength small">{{ model.level * 2 }}</div>
         </template>
      </div>
   </div>
</template>

<script setup lang="ts">
import ICityTile from '../core/models/city-tile.interface';
import IMap from '../core/models/map.interface';
import { defineProps } from 'vue';

const props = defineProps<{
   map: IMap;
}>();

const max = Math.max(window.innerHeight, window.innerWidth);
const tileSize = Math.min(100, (max - 30) / props.map.width);
const totalWidth = tileSize * props.map.width;
const totalHeight = tileSize * props.map.height;

const getDirection = (tile: ICityTile) => {
   if (!tile || tile.level === undefined) return '';
   return 'n';
};
</script>
