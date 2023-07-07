import { useReducer } from 'react';
import {
    ADD_HOME,
    UPDATE_HOME,
    REMOVE_HOME,
    ADD_ROOM,
    UPDATE_ROOM,
    REMOVE_ROOM,
    ADD_DEVICE,
    UPDATE_DEVICE,
    REMOVE_DEVICE,
    UPDATE_SETTINGS
} from './actions';

export const reducer = (state, action) => {
    switch(action.type) {
        case ADD_HOME:
            return {
                ...state,
                homes: [...state.homes, action.home]
            };
        case UPDATE_HOME:
            return {
                ...state,
                homes: state.homes.map((home) => {
                    if (home._id === action._id){
                        home.name = action.name;
                        // or... action.home._id / action.home.name
                    }
                    return home;
                })
            };
        case REMOVE_HOME:
            return {
                ...state,
                homes: state.homes.filter((home) => home._id !== action._id)
            };
        case ADD_ROOM: 
            return {
                ...state,
                rooms: [... state.rooms, action.room]
            };
        case UPDATE_ROOM:
            return {
                ...state,
                rooms: state.rooms.map((room) => {
                    if (room._id === action._id){
                        room.name = action.name;
                    }
                    return home;
                })
            };
        case REMOVE_ROOM:
            return {
                ...state,
                rooms: state.rooms.filter((room) => room._id !== action._id)
            };
        case ADD_DEVICE: 
            return {
                ...state,
                devices: [...state.devices, action.device]
            };
        case UPDATE_DEVICE:
            return {
                ...state,
                devices: state.devices.map((device) => {
                    if (device._id === action._id){
                        device.name = action.name;
                    }
                    return device;
                })
            };
        case REMOVE_DEVICE:
            return {
                ...state,
                devices: state.devices.filter((device) => device._id !== action._id)
            };
        case UPDATE_SETTINGS:
            return {
                ...state,
                devices: state.devices.map((device) => {
                    if (device._id === action._id){
                        device.settings = action.settings
                    }
                    return device;
                })
            };
        default: return state;
    }
}

export function useAutomationReducer(initialState){
    return useReducer(reducer, initialState);
}
