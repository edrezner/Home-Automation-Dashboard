const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
  }

  type Device {
    _id: ID
    name: String
    type: String
    settings: Setting
  }

  type Home {
    _id: ID
    name: String
    users: [User]
    rooms: [Room]
    devices: [Device]
  }

  type Room {
    _id: ID
    name: String
    type: String
    home: Home
    devices: [Device]
  }

  type: Setting {
    _id: ID
    isOn: Boolean
    temperature: Int
    brightness: Int
    color: String
    valume: Int
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
    addDevice(name: String!, type: String!, settings: SettingInput): Device
    updateDevice(_id: ID!, name: String, type: String, settings: SettingInput): Device
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
