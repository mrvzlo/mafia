<style lang="scss">
@import '@/assets/css/main.scss';
</style>

<template>
   <Map />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Map from './components/map/Map.vue';

@Options({
   components: {
      Map,
   },
})
export default class App extends Vue {}
</script>
