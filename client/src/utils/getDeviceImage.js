export const getDeviceImage = (deviceType) => {
  switch (deviceType) {
    case "Thermostat":
      return "./src/assets/images/thermostat.png";
    case "Lights":
      return "./src/assets/images/lights.png";
    case "Television":
      return "./src/assets/images/television.png";
    case "Speakers":
      return "./src/assets/images/speakers.png";
  }
};
