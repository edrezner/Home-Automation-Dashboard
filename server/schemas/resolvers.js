const { AuthenticationError } = require('apollo-server-express');
const { Device, Home, Room, Setting, User } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    user: async () => {
        return await User.find();
    },
    homeDevices: async (parent, {_id}) => {
      const devices = await Home.findById(_id).populate('devices');
      return devices;
    },
    roomDevices: async (parent, {_id}) => {
      const devices = await Room.findById(_id).populate('devices');
      return devices;
    },
    homeRooms: async (parent, {_id}) => {
      const rooms = await Home.findById(_id).populate('rooms');
      return rooms;
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
