const db = require('./connection')
const { User, Home, Device, Room, Setting } = require('../models')

db.once('open', async () => {
  await User.deleteMany()
  await Setting.deleteMany();
  await Device.deleteMany();
  await Home.deleteMany();
  await Room.deleteMany();

  const users = await User.insertMany([
    {
      username: 'Pamela Washington',
      email: 'pamela@testmail.com',
      password: 'password12345',
    },
    {
      username: 'Elijah Holt',
      email: 'eholt@testmail.com',
      password: 'password12345',
    },
  ])

  const settings = await Setting.insertMany([
    {
      isOn: true,
      temperature: null,
      brightness: 100,
      color: "white",
      volume: null
    },
    {
      isOn: true,
      temperature: null,
      brightness: null,
      color: null,
      volume: 50
    },
    {
      isOn: true,
      temperature: 70,
      brightness: null,
      color: null,
      volume: null
    },
    {
      isOn: false,
      temperature: null,
      brightness: 75,
      color: "yellow",
      volume: null
    }
  ])

  const devices = await Device.insertMany([
    { 
      name: 'Overhead Lights', 
      type: 'Lights', 
      settings: settings[0]._id
    },
    { 
      name: 'Kitchen Speakers', 
      type: 'Speakers', 
      settings: settings[1]._id
    },
    { 
      name: 'Living Room #1 Thermostat', 
      type: 'Thermostat', 
      settings: settings[2]._id
    },
    { 
      name: 'Living Room #1 Lights', 
      type: 'Lights', 
      settings: settings[3]._id
    },
  ])

  const rooms = await Room.insertMany([
    {
      name: 'Kitchen #1',
      type: 'Kitchen',
      devices: [devices[0]._id, devices[1]._id],
    },
    {
      name: 'Living Room #1',
      type: 'Living Room',
      devices: [devices[2]._id, devices[3]._id],
    },
  ])

  const homes = await Home.create({
    name: "Eric, Evan, and Pablo's Estate",
    users: [users[0]._id, users[1]._id],
    rooms: [rooms[0]._id, rooms[1]._id],
    devices: [devices[0]._id, devices[1]._id, devices[2]._id, devices[3]._id],
  })

  process.exit()
})
