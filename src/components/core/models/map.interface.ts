import ICityTile from './city-tile.interface';

export default interface IMap {
   width: number;
   height: number;
   inner: ICityTile[];
   initiated: boolean;
}
