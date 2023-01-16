<template>
   <div class="city" :style="`width: ${totalWidth}px; height: ${totalHeight}px`">
      <div v-for="model in map.inner" v-bind:key="model" :class="'poor ' + model?.directionClass" :style="'--size:' + tileSize + 'px'"></div>
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
   tileSize = Math.min(100, window.innerWidth / 10);
   totalWidth = 0;
   totalHeight = 0;

   created() {
      this.map.setup();
      this.totalWidth = this.tileSize * this.map.width;
      this.totalHeight = this.tileSize * this.map.height;
      console.log(this.map);
   }
}
</script>
