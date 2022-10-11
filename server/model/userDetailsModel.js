const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
});

const UserDetails = mongoose.model("usersDetails", userDetailsSchema);

const createUserDetails = (
    firstName,
    lastName,
    phone,
    country,
    state,
    city,
    address,
    zipCode,
    createdBy,
) => {
    const NewUserDetails = new UserDetails({
       firstName,
       lastName,
       phone,
       country,
       state,
       city,
       address,
       zipCode,
       createdBy
    })
    return NewUserDetails.save();
}

const deleteMyDetailsById = (id) => {
    return UserDetails.findByIdAndDelete(id)
}

const findById = (id) => {
    return UserDetails.findById(id)
}

const findMyDetails = (createdBy) => {
  return UserDetails.find(createdBy);
};

const deleteAllMyDetails = (createdBy) => {
  return UserDetails.remove({ createdBy });
};

const updateUserDetailsById = (id, {firstName, lastName, phone, country, state, city, address }) => {
  return UserDetails.findByIdAndUpdate(id, {
    $set: {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      country: country,
      state: state,
      city: city,
      address: address
    }
  })
}

module.exports = {
  updateUserDetailsById,
  createUserDetails,
  deleteMyDetailsById,
  findMyDetails,
  findById,
  deleteAllMyDetails,
};