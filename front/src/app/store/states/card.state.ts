import { ICard } from "../../models/Card";

export interface ICardsState {
   cards: Array<ICard>,
   currentCard: ICard
}

export const initialCardsState = {
   cards: [],
   currentCard: null,
}