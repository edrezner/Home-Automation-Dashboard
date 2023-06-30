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
  }
`;

module.exports = typeDefs;
