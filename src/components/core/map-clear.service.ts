import Shuffle from '../shared/shuffle';
import IBuilding from './models/building.interface';
import IMap from './models/map.interface';

export default class MapClearService {
   bankrupt(map: IMap, players: number) {
      const left = 2 + players * 4;
      const toRemove: IBuilding[] = Shuffle(this.getAll() as []).slice(left);

      toRemove.forEach((tile) => {
         const index = tile.x + tile.y * map.width;
         setTimeout(() => (map.inner[index].level = 0), 1000 * Math.random());
      });

      setTimeout(() => (map.initiated = true), 1500);
   }

   private getAll = (): IBuilding[] => require('@/assets/json/building.json');
}
