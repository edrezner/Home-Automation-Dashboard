import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($username: String!, $email: String!, $password: String!) {
    updateUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_DEVICE = gql`
  mutation addDevice(
    $name: String!
    $type: String!
    $settings: SettingInput
    $roomId: ID!
  ) {
    addDevice(name: $name, type: $type, settings: $settings, roomId: $roomId) {
      _id
      name
      type
      settings {
        _id
        isOn
        temperature
        brightness
        color
        volume
      }
    }
  }
`;

export const UPDATE_DEVICE = gql`
  mutation updateDevice(
    $_id: ID!
    $name: String
    $type: String
    $settings: SettingInput
  ) {
    updateDevice(_id: $_id, name: $name, type: $type, settings: $settings) {
      _id
      name
      type
      settings {
        _id
        isOn
        temperature
        brightness
        color
        volume
      }
    }
  }
`;

export const DELETE_DEVICE = gql`
  mutation deleteDevice($_id: ID!) {
    deleteDevice(_id: $_id) {
      _id
      name
      type
      settings {
        _id
        isOn
        temperature
        brightness
        color
        volume
      }
    }
  }
`;

export const ADD_ROOM = gql`
  mutation addRoom($name: String!, $type: String!) {
    addRoom(name: $name, type: $type) {
      _id
      name
      type
    }
  }
`;

export const UPDATE_ROOM = gql`
  mutation updateRoom($name: String!, $type: String!) {
    updateRoom(name: $name, type: $type) {
      _id
      name
      type
    }
  }
`;

export const DELETE_ROOM = gql`
  mutation deleteRoom($_id: ID!, $homeId: ID!) {
    deleteRoom(_id: $_id, homeId: $homeId) {
      _id
      name
      type
    }
  }
`;

export const ADD_HOME = gql`
  mutation addHome($name: String!, $type: String!) {
    addHome(name: $name, type: $type) {
      _id
      name
      type
    }
  }
`;

export const DELETE_HOME = gql`
  mutation deleteHome($_id: ID!) {
    deleteHome(_id: $_id) {
      _id
      name
      type
    }
  }
`;
