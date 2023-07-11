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
    home(_id: $id) {
      _id
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

export const QUERY_ROOM = gql`
  query room($id: ID!) {
    room(_id: $id) {
      _id
      home {
        _id
        name
      }
      name
      type
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

export const QUERY_HOME_ROOMS = gql`
  query home($id: ID!) {
    home(_id: $id) {
      _id
      rooms {
        _id
        name
        type
      }
    }
  }
`;
