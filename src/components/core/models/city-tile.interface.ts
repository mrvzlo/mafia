import IBuilding from './building.interface';

export default interface ICityTile extends IBuilding {
   empty?: boolean;
   family?: number;
}
