import TroopModel from '../cards/troop.model';

export default class HeroModel implements TroopModel {
   public power = 4;
   public symbol = '';
   public family = -1;
   public troops: TroopModel[] = [];

   constructor(public id = 0) {}

   totalPower = () => this.troops.reduce((a, b) => a + b.power, this.power);
}
