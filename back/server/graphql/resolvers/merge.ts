import User from "../../models/User";
import Card from "../../models/Card";

export const findUserById = async (userId: string) => {
  console.log(userId);
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw error;
  }
};

export const findCardsById = async (cardsId) => {
  console.log(cardsId);
  try {
    const cards = await Card.find({ _id: { $in: [cardsId] } });
    return cards;
  } catch (error) {
    throw error;
  }
};

export const findUserCards = async (userId) => {
  console.log(userId);
  try {
    const cards = await Card.find({ cardHolder: userId });
    return cards;
  } catch (error) {
    throw error;
  }
};

export const getExchangedRates = () => {
  return [
    {
      type: "BTC",
      name: "Bitcoin",
      USD: 39100.7,
    },

    {
      type: "ETH",
      name: "Ethereum",
      USD: 1623.72,
    },

    {
      type: "LTC",
      name: "Litecoin",
      USD: 152.36,
    },

    {
      type: "EOS",
      name: "EOS",
      USD: 3.355,
    },

    {
      type: "REP",
      name: "Augur",
      USD: 22.98,
    },

    {
      type: "IOT",
      name: "Iota",
      USD: 0.56,
    },
  ];
};
