import { ECardActions, CardAction } from '../actions/card.actions';
import { initialCardsState } from '../states/card.state';

export const cardReducer = (state = initialCardsState, action: CardAction) => {
  switch (action.type) {
    case ECardActions.ALL_CARDS_COMPLETED:
      return { ...state, cards: action.payload };
    case ECardActions.CREATE_CARD_COMPLETED:
      return { ...state, cards: [...state.cards, action.payload] };
    case ECardActions.DELETE_CARD_COMPLETED:
      return {
        ...state,
        cards: [...state.cards.filter((card) => card._id !== action.payload)],
      };
    case ECardActions.CURRENT_CARD_COMPLETED:
      return {
        ...state,
        currentCard: action.payload,
      };
    default:
      return { ...state };
  }
};
