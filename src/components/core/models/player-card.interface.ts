import ICard from '@/components/core/models/card.interface';

export default interface IPlayerCardModel extends ICard {
   reserved: boolean;
   pickedStage?: number;
}
