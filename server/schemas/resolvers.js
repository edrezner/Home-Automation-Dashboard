const { AuthenticationError } = require("apollo-server-express");
const { Device, Home, Room, Setting, User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id).populate("homes");
      }
      throw new AuthenticationError("Not logged in");
    },
    // homeDevices: async (parent, { _id }) => {
    //   const home = await Home.findById(_id).populate({
    //     path: "devices",
    //     // populate: "settings",
    //     populate: {
    //       path: "settings",
    //     },
    //   });
    //   console.log(home.devices);
    //   return home.devices;
    // },
    room: async (parent, { _id }) => {
      const room = await Room.findById(_id)
        .populate({
          path: "devices",
          populate: "settings",
          // populate: {
          //   path: "settings"
          // }
        })
        .populate("home");
      // const room = await Room.findById(_id).populate("devices","settings",);
      // console.log(room.devices)
      return room;
    },
    home: async (parent, { _id }) => {
      const home = await Home.findById(_id)
        .populate("rooms")
        .populate({
          path: "devices",
          // populate: "settings",
          populate: {
            path: "settings",
          },
        });
      return home;
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

      const room = await Room.findByIdAndUpdate(
        args.roomId,
        { $addToSet: { devices: device._id } },
        { runValidators: true, new: true }
      ).populate("devices");
      return room;
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
      const home = await Home.findByIdAndUpdate(
        args.home,
        {
          $push: { rooms: room._id },
        },
        {
          new: true,
        }
      );
      return room;
    },

    updateRoom: async (parent, args) => {
      const { _id, ...update } = args;
      const updatedRoom = await Room.findByIdAndUpdate(_id, update, {
        new: true,
      });
      return updatedRoom;
    },

    deleteRoom: async (parent, args) => {
      const { _id, homeId } = args;
      const deletedRoom = await Room.findByIdAndRemove(_id);
      const home = await Home.findOneAndUpdate(
        { _id: homeId },
        {
          $pull: { rooms: _id },
        },
        { new: true }
      );
      return deletedRoom;
    },

    addHome: async (parent, args, context) => {
      const home = await Home.create(args);
      const user = await User.findByIdAndUpdate(
        context.user._id,
        {
          $push: { homes: home._id },
        },
        {
          new: true,
        }
      );
      return user;
    },
    deleteHome: async (parent, args) => {
      const { _id } = args;
      const deletedHome = await Home.findByIdAndRemove(_id);
      return deletedHome;
    },
  },
};

module.exports = resolvers;
