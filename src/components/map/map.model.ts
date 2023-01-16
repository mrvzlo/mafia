import IBuilding from './building.interface';
import BuildingModel from './building.model';

export default class MapModel {
   width = 0;
   height = 0;
   inner: BuildingModel[] = [];

   outerWidth = 0;
   outerHeight = 0;
   outer: BuildingModel[] = [];

   public setup() {
      const data = this.getAll().map((item) => new BuildingModel(item.x, item.y, item.level, item.dir));
      const unsorted = data.filter((x) => x.inner);
      this.outer = data.filter((x) => !x.inner);
      this.width = Math.max(...unsorted.map((item) => item.x)) + 1;
      this.height = Math.max(...unsorted.map((item) => item.y)) + 1;
      this.outerWidth = Math.max(...this.outer.map((item) => -item.x));
      this.outerHeight = Math.max(...this.outer.map((item) => item.y)) + 1;

      this.inner = [];
      for (let i = 0; i < this.height; i++) for (let j = 0; j < this.height; j++) this.inner[i + j * this.width] = new BuildingModel(i, j);

      unsorted.forEach((item) => {
         this.inner[item.x + item.y * this.width] = item;
      });
   }

   public getAll = (): IBuilding[] => require('@/assets/json/building.json');
}
