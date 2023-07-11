import bedroomImage from "../assets/images/bedroom.png";
import livingRoomImage from "../assets/images/livingroom.png";
import kitchenImage from "../assets/images/kitchen.png";

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
      default: return
  }
};

export const getRoomImage = (roomType) => {
  switch (roomType) {
    case "Living Room":
      return livingRoomImage;
    case "Kitchen":
      return kitchenImage;
    case "Bedroom":
      return bedroomImage;
    default: return ""
  }
};
