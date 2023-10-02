const { AuthenticationError } = require('apollo-server-express')
const { User } = require('../models/User')
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },

    Mutation: {
      addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);

        return { token, profile };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError('No profile with this email found!');
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError('Incorrect password!');
        }

        const token = signToken(user);
        return { token, user };
      },

      saveBook: async (parent, { newBook }, context) => {
 
        if (context.user) {
          return User.findOneAndUpdate(
            { _id: userId },
            {
              $addToSet: { savedBooks: newBook },
            },
            {
              new: true,
              runValidators: true,
            }
          );
        }

        throw new AuthenticationError('You need to be logged in!');
      },

      deleteBook: async (parent, { bookId }, context) => {
        if (context.user) {
          return User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: bookId } },
            { new: true }
          );
        }
        throw new AuthenticationError('You need to be logged in!');
      },
    },
  }
};

module.exports = resolvers;