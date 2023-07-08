const { AuthenticationError } = require("apollo-server-express");
const { Device, Home, Room, Setting, User } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }
      throw new AuthenticationError("Not logged in");
    },
    homeDevices: async (parent, { _id }) => {
      const home = await Home.findById(_id)
        .populate("devices")
        .populate("settings");
      return home;
    },
    roomDevices: async (parent, { _id }) => {
      const room = await Room.findById(_id).populate("devices").populate({
        path: "devices",
        populate: "settings",
      });
      return room;
    },
    homeRooms: async (parent, { _id }) => {
      const home = await Home.findById(_id)
        .populate("rooms")
        .populate("devices")
        .populate("settings");
      return home.rooms;
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    /**
     *
     * @param {*} args will contain new settings object and new device object.
     * @description this function will take care of the ID's and lookups
     * @returns device object (for re-rendering if needed or debugging)
     */
    addDevice: async (parent, args) => {
      const setting = await Setting.create(args.settings);
      delete args.settings;
      // Args.settings object is replaced with its new id
      args.settings = setting._id;
      const device = await Device.create({
        name: args.name,
        type: args.type,
        settings: args.settings,
      });

      const room = await Room.findById(args.roomId);
      room.devices.push(device._id);
      const newRoom = await room.save();
      return await newRoom;
    },

    updateDevice: async (parent, args) => {
      const device = await Device.findbyID(_id);
      const settingUpdate = await Setting.findByIdAndUpdate(
        device.settings,
        args.settings,
        {
          new: true,
        }
      );
      delete args.settings;
      const updatedDevice = await Device.findByIdAndUpdate(_id, args, {
        new: true,
      });
      return updatedDevice;
    },

    deleteDevice: async (parent, args) => {
      const { _id } = args;
      const deletedDevice = await Device.findByIdAndRemove(_id);
      return deletedDevice;
    },

    addRoom: async (parent, args) => {
      const room = await Room.create(args);
      return room;
    },

    updateRoom: async (parent, args) => {
      const { _id, ...update } = args;
      const updatedRoom = await Room.findByIdAndUpdate(_id, update, {
        new: true,
      });
      return updatedRoom;
    },

    addHome: async (parent, args) => {
      const home = await Home.create(args);
      return home;
    },
    deleteHome: async (parent, args) => {
      const { _id } = args;
      const deletedHome = await Home.findByIdAndRemove(_id);
      return deletedHome;
    },
  },
};

module.exports = resolvers;
