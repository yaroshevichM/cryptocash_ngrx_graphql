import Service from "../../../models/Service";
import Card from "../../../models/Card";
import Transaction from "../../../models/Transaction";

export const transactionQueries = {
  getAllTransactions: async (_, args) => {
    try {
      const transactions = await Transaction.find({$or:[{
        senderId: args.userId,
      }, {receiverId: args.userId}]});
      return transactions.map((transaction) => {
        return transaction.toObject();
      });
    } catch (error) {
      throw error;
    }
  },

  getCardTransactions: async (_, args) => {
    try {
      const transactions = await Transaction.find({$or:[{
        senderCardId: args.cardId,
      }, {receiverCardId: args.cardId}]});

      if(!transactions) {
         throw new Error("Can not find transactions in this card");
      }

      return transactions.map((transaction) => {
        return transaction.toObject();
      });
    } catch (error) {
       throw error;
    }
  },
};

export const transactionMutations = {
  createTransaction: async (_, args, context) => {
    if (!context.isAuth) {
      throw new Error("Unauthenticated");
    }
    try {
      if (args.transactionInput.type === "To another account") {
        if (!args.transactionInput.receiverCardNumber.startsWith("#")) {
          throw new Error("Card should be start from #");
        }
  
        const receiverCard: any = await Card.findOne({cardNumber: args.transactionInput.receiverCardNumber});
        const senderCard: any = await Card.findOne({_id: args.transactionInput.senderCardId});
  
        if (!receiverCard) {
          throw new Error("Receiver card with this number does not exist");
        }
  
        if (senderCard.toObject().currencyType !== receiverCard.toObject().currencyType) {
          throw new Error("Your card and the recipient's card have different currencies");
        }
  
        if (senderCard.toObject().balance < args.transactionInput.transactionAmount) {
          throw new Error("Not enough money on the card");
        }

        const transaction = new Transaction({
          senderCardId: args.transactionInput.senderCardId,
          receiverCardId: receiverCard.toObject()._id,
          receiverCardNumber: args.transactionInput.receiverCardNumber,
          senderId: senderCard.toObject().cardHolder,
          receiverId: receiverCard.toObject().cardHolder,
          name: `Transaction`,
          description: args.transactionInput.description,
          currency: args.transactionInput.currency,
          transactionAmount: args.transactionInput.transactionAmount,
          creationDate: new Date().toISOString()
        });
  
        await Card.updateOne(
          { _id: senderCard.toObject()._id },
          {
            $set: {
              balance: senderCard.toObject().balance - args.transactionInput.transactionAmount,
              spendings: senderCard.toObject().spendings + args.transactionInput.transactionAmount,
            },
          }
        );
  
        await Card.updateOne(
          { _id: receiverCard.toObject()._id },
          {
            $set: {
              balance: receiverCard.toObject().balance + args.transactionInput.transactionAmount,
              earnings: receiverCard.toObject().earnings + args.transactionInput.transactionAmount,
            },
          }
        );
  
        await transaction.save();
  
        return { ...transaction.toObject() };  
      } else {
        const senderCard: any = await Card.findOne({_id: args.transactionInput.senderCardId});
        const receiverService: any = await Service.findOne({cardNumber: args.transactionInput.receiverCardNumber});

        if (senderCard.toObject().balance < args.transactionInput.transactionAmount) {
          throw new Error("Not enough money on the card");
        }

        const transaction = new Transaction({
          senderCardId: args.transactionInput.senderCardId,
          receiverCardId: null,
          receiverCardNumber: args.transactionInput.receiverCardNumber,
          senderId: senderCard.toObject().cardHolder,
          receiverId: receiverService.toObject()._id,
          name: `Transaction`,
          description: args.transactionInput.description,
          currency: args.transactionInput.currency,
          transactionAmount: args.transactionInput.transactionAmount,
          creationDate: new Date().toISOString()
        });
  
        await Card.updateOne(
          { _id: senderCard.toObject()._id },
          {
            $set: {
              balance: senderCard.toObject().balance - args.transactionInput.transactionAmount,
              spendings: senderCard.toObject().spendings + args.transactionInput.transactionAmount,
            },
          }
        );

        await transaction.save();
  
        return { ...transaction.toObject() };  
      }
      
    } catch (error) {
      throw error;
    }
  },
};
