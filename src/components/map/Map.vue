<template>
   <div class="city" :style="`width: ${totalWidth}px; height: ${totalHeight}px; --size:${tileSize}px`">
      <div v-for="(model, index) in map.inner" :key="index" :class="'poor ' + model?.directionClass"></div>
   </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MapModel from './map.model';

@Options({
   props: {},
})
export default class Map extends Vue {
   map = new MapModel();
   tileSize = 100;
   totalWidth = 0;
   totalHeight = 0;

   created() {
      this.map.setup();
      const max = Math.max(window.innerHeight, window.innerWidth);
      this.tileSize = Math.min(100, (max - 30) / this.map.width);
      this.totalWidth = this.tileSize * this.map.width;
      this.totalHeight = this.tileSize * this.map.height;
   }
}
</script>
