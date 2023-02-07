const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {
        users: async () => {
            return await User.find({});
        },
        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
        },
    },

    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!profile) {
                throw new AuthenticationError('No profile with this email found!');
            }

            const correctPw = await profile.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }

            const token = signToken(user);
            return { token, profile };
        },
        saveBook: async (parent, { userId, book }) => {
            return User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { savedBooks: book } },
                { new: true }
            );
        },
        removeBook: async (parent, { userId, book }) => {
            return User.findOneAndUpdate(
                { _id: userId },
                { $pull: { savedBooks: book } },
                { new: true }
            );
        }
    },
};

module.exports = resolvers;