import React, { createContext, useContext } from "react";
import { useHomeReducer } from "./reducers";

const HomeContext = createContext();
const { Provider } = HomeContext;

const HomeProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useHomeReducer({
    homes: [],
    rooms: [],
    devices: [],
    settings: {},
    ... value
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useHomeContext = () => {
  return useContext(HomeContext);
};

//const DeviceProvider

export { HomeProvider, useHomeContext };
