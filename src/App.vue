<style lang="scss">
@import '@/assets/css/main.scss';
</style>

<template>
   <Game />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Game from './components/game.vue';

@Options({
   components: {
      Game,
   },
})
export default class App extends Vue {}
</script>
