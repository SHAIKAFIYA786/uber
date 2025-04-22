const captainModel = require("../models/captain.model");

module.exports.createCaptain = async ({ fullname, email, password, vehicle }) => {
  const { firstname, lastname } = fullname || {};
  const { color, plate, capacity, typevehicle } = vehicle || {};

  // ✅ Validate all fields
  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !typevehicle
  ) {
    throw new Error("All fields are required");
  }

  // ✅ Create new captain
  const captain = await captainModel.create({
    fullname: {
      firstname,
      lastname
    },
    email,
    password,
    vehicle: {
      color,
      plate,
      capacity,
      typevehicle
    }
  });

  return captain;
};

 