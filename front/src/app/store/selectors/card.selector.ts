import { IAppState } from "../appState";
import {createSelector} from "@ngrx/store"
import { ICardsState } from "../states/card.state";

const selectCards = (state: IAppState) => state.cards;

export const selectAllCardsInner = createSelector(
   selectCards,
   (state: ICardsState) => state.cards
);

export const selectCurrentCardInner = createSelector(
   selectCards,
   (state: ICardsState) => state.currentCard
);