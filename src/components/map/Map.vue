<template>
   <div class="city" :style="`width: ${totalWidth}px; height: ${totalHeight}px; --size:${tileSize}px`">
      <div v-for="(model, index) in map.inner" :key="index" :class="'poor ' + model?.directionClass"></div>
   </div>
</template>

<script setup lang="ts">
import MapModel from './map.model';

const map = new MapModel();
map.setup();
const max = Math.max(window.innerHeight, window.innerWidth);
const tileSize = Math.min(100, (max - 30) / map.width);
const totalWidth = tileSize * map.width;
const totalHeight = tileSize * map.height;
</script>
