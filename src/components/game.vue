<template>
   <div v-if="!game.mainPlayer" class="grid">
      <h2>{{ $t('choose_color') }}</h2>
      <div class="row color-pick">
         <div
            class="card card-wide block card-button"
            v-for="(color, index) in colors"
            v-on:click="chooseColor(color)"
            :key="index"
            :style="`--core-r:${color[0]};--core-g:${color[1]};--core-b:${color[2]};`"
         >
            {{ $t(`family.${index}.don`) }} {{ $t(`family.${index}.name`) }}
         </div>
      </div>
   </div>
   <div
      v-else
      class="grid"
      :style="`--core-r:${game.mainPlayer?.color[0]};--core-g:${game.mainPlayer?.color[1]};--core-b:${game.mainPlayer?.color[2]};`"
   >
      <div class="stats">
         <h3>{{ $t(`family.${game.mainPlayer?.id}.don`) }} {{ $t(`family.${game.mainPlayer?.id}.name`) }}</h3>
         <div class="capo">
            <div v-for="hero in game.mainPlayer?.heros" :key="hero.id" class="block">
               <div class="symbol left">{{ symbols[hero.id] }}</div>
               <div class="symbol right">{{ symbols[hero.id] }}</div>
               {{ $t(`family.${game.mainPlayer?.id}.capo[${hero.id}]`) }} {{ $t(`family.${game.mainPlayer?.id}.name`) }}
            </div>
         </div>
      </div>
      <div class="mt-auto mb-auto">
         <Map />
      </div>
      <div class="hand-container">
         <div class="row" v-if="game.stage === gameStages.Draft">
            <Hand :player="game.mainPlayer" :confirmDelegate="acceptPlayerCard" />
         </div>
      </div>
   </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import GameSetupService from './core/game-setup.service';
import { GameStageType } from './core/game-stage.type';
import GameModel from './core/game.model';
import Map from './map/map.vue';
import Hand from './cards/hand.vue';
import ReservedCardModel from './cards/reserved-card.model';
import Colors from './core/colors.enum';

@Options({
   components: {
      Map,
      Hand,
   },
})
export default class Game extends Vue {
   game = new GameModel();
   gameStages = GameStageType;
   colors = new Colors().all();
   symbols = ['♠', '♥', '♣', '♦'];

   created() {
      const service = new GameSetupService();
      this.game = service.setup(1);
   }

   chooseColor(color: number[]) {
      this.game.players[0].color = color;
      this.game.setPlayer(0);
   }

   acceptPlayerCard(cards: ReservedCardModel[]) {
      this.game.firstRound.push(...cards.filter((x) => x.round === 0));
      this.game.secondRound.push(...cards.filter((x) => x.round === 1));
      this.game.thirdRound.push(...cards.filter((x) => x.round === 2));

      if (this.game.players.some((x) => !x.draftFinished)) return;
      this.game.stage = GameStageType.Resolve;
   }
}
</script>
