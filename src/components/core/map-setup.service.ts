import { GameStageType } from './game-stage.type';
import IBuilding from './models/building.interface';
import IGame from './models/game.interface';
import IMap from './models/map.interface';

export default class MapSetupService {
   public setup(): IMap {
      const data = this.getAll();
      const width = Math.max(...data.map((item) => item.x)) + 1;
      const height = Math.max(...data.map((item) => item.y)) + 1;

      const inner = [];
      for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) inner[x + y * height] = { x, y };

      data.forEach((item) => {
         inner[item.x + item.y * width] = item;
      });

      return { height, width, inner, initiated: false };
   }

   public update(game: IGame) {
      if (game.stage < GameStageType.Draft) game.stage++;
   }

   private getAll = (): IBuilding[] => require('@/assets/json/building.json');
}
