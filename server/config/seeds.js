const db = require("./connection");
const { User, Product, Category } = require("../models");

db.once("open", async () => {
  await User.deleteMany();

  await User.create({
    username: "Pamela Washington",
    email: "pamela@testmail.com",
    password: "password12345",
  });

  await User.create({
    username: "Elijah Holt",
    email: "eholt@testmail.com",
    password: "password12345",
  });

  console.log("users seeded");

  process.exit();
});
