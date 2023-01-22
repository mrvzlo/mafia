<template>
   <div v-if="!game.mainPlayer" class="grid">
      <h2>{{ $t('choose_color') }} {{ game.mainPlayer }}</h2>
      <div class="row color-pick">
         <div
            class="card card-wide block card-button"
            v-for="(color, index) in colors"
            v-on:click="chooseColor(index)"
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
         <div class="row">
            <div class="influence">{{ game.mainPlayer.influence }}</div>
            <div class="money">{{ game.mainPlayer.money }}$</div>
            <h3>{{ $t(`family.${game.mainPlayer?.id}.don`) }} {{ $t(`family.${game.mainPlayer?.id}.name`) }}</h3>
            <div class="votes">{{ game.mainPlayer.votes }}</div>
            <div class="helpers">{{ game.mainPlayer.helpers }}</div>
         </div>
         <div class="capo">
            <div v-for="hero in game.mainPlayer?.heros" :key="hero.id" class="block">
               <div class="symbol left">{{ symbols[hero.id] }}</div>
               <div class="symbol right">{{ symbols[hero.id] }}</div>
               {{ $t(`family.${game.mainPlayer?.id}.capo[${hero.id}]`) }} {{ $t(`family.${game.mainPlayer?.id}.name`) }}
            </div>
         </div>
      </div>
      <div class="mt-auto mb-auto">
         <Map :map="game.map" />
      </div>
      <div class="hand-container">
         <div class="row" v-if="game.stage === gameStages.Draft">
            <Hand :player="game.mainPlayer" :confirmDelegate="acceptPlayerCard" />
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import GameSetupService from './core/game-setup.service';
import CardControlService from './core/card-control.service';
import { GameStageType } from './core/game-stage.type';
import Map from './map/map.vue';
import Hand from './cards/hand.vue';
import { Colors } from './core/colors.enum';
import IReservedCard from './core/models/reserved-card.interface';
import { reactive } from 'vue';

const gameService = new GameSetupService();
const game = reactive(gameService.setupGame());
const gameStages = GameStageType;
const colors = Object.values(Colors);
const symbols = ['♠', '♥', '♣', '♦'];
const cardService = new CardControlService();

const chooseColor = (index: number): void => {
   gameService.setupPlayer(game, index, 'Main');
};

const acceptPlayerCard = (cards: IReservedCard[]): void => {
   console.log(2, game.players);
   game.firstRound.push(...cards.filter((x) => x.stage === 0));
   game.secondRound.push(...cards.filter((x) => x.stage === 1));
   game.thirdRound.push(...cards.filter((x) => x.stage === 2));

   if (game.players.some((x) => !x.draftFinished && x.controlType !== 'None')) return;
   game.stage = GameStageType.ResolveFirst;
   animateResolve();
};

const animateBankrupt = (): void => {
   gameService.bankrupt(game);
};

const animateResolve = (): void => {
   const card = cardService.getCardToResolve(game);
};
</script>
