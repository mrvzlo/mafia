import { BuildingDirectionType } from '../../map/building-direction.type';

export default interface IBuilding {
   x: number;
   y: number;
   level?: number;
   dir?: BuildingDirectionType;
}
