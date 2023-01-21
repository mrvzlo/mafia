<template>
   <div class="grid">
      <div class="mt-auto mb-auto">
         <Map />
      </div>
      <div class="hand-container">
         <div class="hand" v-if="game.stage === gameStages.Draft">
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

@Options({
   components: {
      Map,
      Hand,
   },
})
export default class Game extends Vue {
   game = new GameModel();
   gameStages = GameStageType;

   created() {
      const service = new GameSetupService();
      this.game = service.setup(1);
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
