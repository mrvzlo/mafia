export default class Colors {
   Red = [4, 1, 1];
   Blue = [1, 4, 1];
   Green = [1, 1, 4];
   Cyan = [1, 3, 3];
   Yellow = [3, 3, 1];
   Purple = [3, 1, 3];

   get(id: number) {
      return this.all()[id];
   }

   all() {
      return [this.Red, this.Blue, this.Green, this.Cyan, this.Yellow, this.Purple];
   }
}
