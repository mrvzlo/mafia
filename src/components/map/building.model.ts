import { BuildingDirectionType } from './building-direction.type';

export default class BuildingModel {
   income = 0;
   inner = true;
   empty = false;
   directionClass = '';

   constructor(public x: number, public y: number, public force = 0, public direction = BuildingDirectionType.None) {
      this.inner = x >= 0;
      this.income = force + (this.inner ? 1 : 3);
      this.directionClass = direction === BuildingDirectionType.North ? 'n' : direction === BuildingDirectionType.South ? 's' : '';
   }
}
