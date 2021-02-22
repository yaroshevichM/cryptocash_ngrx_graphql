import User from "../../../models/User";
import bcrypt from "bcryptjs";
import { findUserById, findUserCards, getExchangedRates } from "../merge";

function getUSDRate(card) {
  return getExchangedRates().filter(
    (ratePairElement) => ratePairElement.type === card.currencyType
  )[0].USD;
}

export const userQueries = {
  user: (_, { id }) => {
    return User.findById(id)
      .then((user: any) => {
        console.log(user);
        return {
          ...user.toObject(),
          password: null,
        };
      })
      .catch((err) => {
        throw err;
      });
  },

  getUserBalance: async (_, { userId }) => {
    const userCards = await findUserCards(userId);
    const responseObject = {
      generalInUSD: 0,
      currencyList: [
        {
          type: "BTC",
          isCard: false,
          balance: 0,
        },

        {
          type: "ETH",
          isCard: false,
          balance: 0,
        },

        {
          type: "LTC",
          isCard: false,
          balance: 0,
        },

        {
          type: "EOS",
          isCard: false,
          balance: 0,
        },

        {
          type: "REP",
          isCard: false,
          balance: 0,
        },

        {
          type: "IOT",
          isCard: false,
          balance: 0,
        },
      ],
    };
    userCards.forEach((card: any) => {
      responseObject.currencyList.filter(
        (currencyBalance) => currencyBalance.type === card.currencyType
      )[0]["balance"] += card.balance;

      responseObject.currencyList.filter(
        (currencyBalance) => currencyBalance.type === card.currencyType
      )[0]["isCard"] = true;

      responseObject.generalInUSD += +(card.balance * getUSDRate(card)).toFixed(1);
    });

    return responseObject;
  },
};

export const userMutations = {
  createUser: async (_, args) => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });

      if (existingUser) {
        throw new Error("User with such email already exist");
      }

      console.log(args.userInput.password);

      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        firstName: args.userInput.firstName,
        email: args.userInput.email,
        lastName: args.userInput.lastName,
        password: hashedPassword,
        accountType: "Standard",
        phonenumber: args.userInput.phonenumber,
        birthDate: args.userInput.birthDate,
        creationDate: new Date().toISOString(),
      });

      await user.save();

      return { message: "User successfully created!" };
    } catch (error) {
      throw error;
    }
  },

  changeUser: async (_, args, context) => {
    if (!context.isAuth) {
      throw new Error("Unauthenticated");
    }
    try {
      const user: any = await findUserById(args.changeUserInput._id);

      if (!user) {
        throw new Error("User with such id does not exist");
      }

      const changedUser = await User.updateOne(
        { _id: args.changeUserInput._id },
        {
          $set: {
            phonenumber: args.changeUserInput.phonenumber,
            email: args.changeUserInput.email,
            accountType: args.changeUserInput.accountType,
          },
        }
      );

      console.log(changedUser);

      const userAfterChange: any = await findUserById(args.changeUserInput._id);

      return userAfterChange.toObject();
    } catch (error) {
      throw error;
    }
  },
};
