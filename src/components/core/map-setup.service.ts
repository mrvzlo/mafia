import IBuilding from './models/building.interface';
import IMap from './models/map.interface';

export default class MapSetupService {
   public setup(): IMap {
      const data = this.getAll();
      const width = Math.max(...data.map((item) => item.x)) + 1;
      const height = Math.max(...data.map((item) => item.y)) + 1;

      const inner = [];
      for (let i = 0; i < height; i++) for (let j = 0; j < height; j++) inner[i + j * width] = { x: i, y: j };

      data.forEach((item) => {
         inner[item.x + item.y * width] = item;
      });

      return { height, width, inner };
   }

   private getAll = (): IBuilding[] => require('@/assets/json/building.json');
}
