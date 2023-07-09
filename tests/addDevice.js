const { Setting, Device, Room } = require("../server/models");
const db = require("../server/config/connection");

async function tester() {
  db.once("open", async () => {
    /* Think of this as the useMutation data you're passing in */
    const args = {
      settings: {
        isOn: true,
        brightness: 20,
        color: "red",
      },
      device: {
        name: "Phillips Hue Lights",
        type: "smartLight",
      },
      roomId: "64a603874704e61b9ecea7d1",
    };

    const returned = await addDevice({}, args);
    console.log(
      "Behavioral test: Expect object returned to be room with new device ID added"
    );
    console.log(returned);
    console.log(
      "Behavioral test: Expect new device and settings created. Expect that device refers to settings. Expect that room referes to new device."
    );
  });
}

async function addDevice(parent, args) {
  const setting = await Setting.create(args.settings);
  delete args.settings;
  // Args.settings object is replaced with its new id
  args.settings = setting._id;
  const device = await Device.create({
    name: args.device.name,
    type: args.device.type,
    settings: args.settings,
  });

  const room = await Room.findById(args.roomId);
  room.devices.push(device._id);
  const newRoom = await room.save();
  return await newRoom;
}

tester();
