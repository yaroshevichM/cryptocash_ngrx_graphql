import Card from "../../../models/Card";
import { findUserById } from "../merge";

export const cardQueries = {
  userCards: async (_, args) => {
    try {
      const cards = await Card.find({ cardHolder: args.userId });
      if (cards) {
        cards.map((card) => {
          console.log(card)
        });
      }
      return cards
    } catch (error) {
      throw error;
    }
  },

  cardById: async (_, args) => {
    try {

      const card = await Card.findById(args.cardId);
      return card.toObject();

    } catch (error) {
       throw error;
    }
  },
};

export const cardsMutations = {
  createCard: async (_, args, context) => {
    if (!context.isAuth) {
      throw new Error("Unauthenticated");
    }
    try {

      const user: any = await findUserById(args.cardInput.cardHolderId);

      if(!user) {
         throw new Error("User with such id does not exist");
      }

      const card = new Card({
        name: args.cardInput.name,
        currencyType: args.cardInput.currencyType,
        cardType: args.cardInput.cardType,
        cardNumber: `#${Math.floor(100000 + Math.random() * 900000)}`, 
        balance: 100,
        expirationDate: new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toISOString(),
        cardHolder: args.cardInput.cardHolderId,
        creationDate: new Date().toISOString()
      });

      const savedCard: any = await card.save();

      return savedCard.toObject();
    } catch (error) {
      throw error;
    }
  },

  deleteCard: async (_, { cardId }, context) => {
    if (!context.isAuth) {
      throw new Error("Unauthenticated");
    }
    try {
      await Card.deleteOne({_id: cardId});
      return {
        message: "Successfully deleted"
      }
    } catch (error) {
      throw error;
    }
  },
};
