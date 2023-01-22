import ITroop from './troop.interface';

export default interface IHero extends ITroop {
   troops: ITroop[];
}
