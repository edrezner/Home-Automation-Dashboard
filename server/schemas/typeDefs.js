const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    homes: [Home]
  }

  type Home {
    _id: ID
    name: String
    user: User
    rooms: [Room]
    devices: [Device]
  }

  type Room {
    _id: ID
    name: String
    type: String
    home: Home
    devices: [ID]
  }

  type Device {
    _id: ID
    name: String
    type: String
    settings: Setting
  }

  type Setting {
    _id: ID
    isOn: Boolean
    temperature: Int
    brightness: Int
    color: String
    volume: Int
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    homeDevices(_id: ID): [Device]
    roomDevices(_id: ID): [Device]
    homeRooms(_id: ID): [Room]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String!, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addDevice(
      name: String!
      type: String!
      settings: SettingInput
      roomId: ID
    ): Room
    updateDevice(
      _id: ID!
      name: String
      type: String
      settings: SettingInput
    ): Device
    deleteDevice(_id: ID!): Device
    addRoom(name: String!, type: String!): Room
    updateRoom(name: String!, type: String!): Room
    deleteRoom(_id: ID!): Room
    addHome(name: String!, type: String!): Home
    deleteHome(_id: ID!): Home
  }

  input SettingInput {
    isOn: Boolean
    temperature: Int
    brightness: Int
    color: String
    volume: Int
  }
`;

module.exports = typeDefs;
