export const defaultSettings = (deviceType) => {
    let settings = {
        isOn: null,
        temperature: null,
        brightness: null,
        color: null,
        volume: null
    }
    switch (deviceType){
        case "Thermostat":
            settings.isOn = true;
            settings.temperature = 70;
            return settings;
        case "Lights":
            settings.isOn = true;
            settings.brightness = 100;
            return settings;
        case "Television":
            settings.isOn = true;
            return settings;
        case "Speakers":
            settings.isOn = true;
            settings.volume = 50;
            return settings; 
    }
}