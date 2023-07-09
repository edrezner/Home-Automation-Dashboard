import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user {
    user {
      _id
      username
      email
      homes {
        _id
        name
      }
    }
  }
`;

export const QUERY_HOME_DEVICES = gql`
  query homeDevices($id: ID!) {
    homeDevices(_id: $id) {
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

export const QUERY_ROOM_DEVICES = gql`
  query roomDevices($id: ID!){
    roomDevices(_id: $id){
      _id
      name
      type
      settings{
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

export const QUERY_HOME_ROOMS = gql`
  query homeRooms ($id: ID!){
    homeRooms(_id: $id){
      _id
      name
      type
      home {
        _id
        name
      }
      devices {
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
  }
`;