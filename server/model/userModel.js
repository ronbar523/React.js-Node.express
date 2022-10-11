const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  biz: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
  premium: {
    type: Boolean,
    default: false,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  randomSecureNumber: {
    type: String,
  },
  dateSecureNumber: {
    type: Date,
  },
});

const User = mongoose.model('users', userSchema);

const createUser = (userName, email, password, createdAt, isAdmin, biz, block, premium, verify) => {
    const newUser = new User({
      userName, 
      email,
      password,
      createdAt,
      isAdmin,
      biz, 
      block, 
      premium, 
      verify
    });
    return newUser.save();
};

const findUserByEmail = (email) =>{
  return User.find({email: email});
};

const findUserByUserName = (userName) => {
  return User.find({ userName: userName });
};

const findUserById = (id) => {
  return User.findById(id)
};

const findAllUser = () => {
  return User.find().select(["-password", "-__v"]);
};


const blockUser = (id, {block}) => {
  return User.findByIdAndUpdate(
    id,
    {
      $set: { block: block},
    },
    { new: true }
  )
}

const verifyUser = (email, {verify} ) => {
  return User.updateOne({ email }, {verify: verify});
};

const becomeBizUser = (email, { biz }) => {
  return User.updateOne({ email }, { biz: biz });
};

const becomePremiumUser = (id, { premium }) => {
  return User.findByIdAndUpdate(
    id,
    {
      $set: { premium: premium },
    },
    { new: true }
  );
};

const changeEmailUser = async (id, email) => {
  return await new Promise((success, failure) => {
    try {
      User.findOneAndUpdate({ id: id }, { email: email })
        .then((response) => {
          console.log(response);
        })
        .catch((e) => console.log(e));
      success("Successfully changed email");
    } catch (e) {
      failure(e);
    }
  });
};

const updatePassword = (email, password) => {
  return User.updateOne(
    {email},
    {password, randomSecureNumber: null, dateSecureNumber: null}
  )
}


const updateUserPassword = async (id, password) => {
  return await new Promise((success, failure) => {
    try {
      User.findOneAndUpdate({ id: id }, { password: password })
        .then((response) => {
          console.log(response);
        })
        .catch((e) => console.log(e));
      success("Successfully changed password");
    } catch (e) {
      failure(e);
    }
  });
};


const updateRecoveryParams = (email,randomSecureNumber, dateSecureNumber) => {
  return User.updateOne({email}, {randomSecureNumber, dateSecureNumber})
};

const deleteUser = (id) => {
  return User.findByIdAndDelete(id);
};

const deleteMyUser = (id) => {
  return User.findByIdAndDelete(id);
};
 
const findOnlyVerifyUsers = (verify) => {
  const filter = verify ? { verify } : {};
  return User.find(filter);
};

const findOnlyBlockUsers = (block) => {
  const filter = block ? { block } : {};
  return User.find(filter);
};


module.exports = {
  createUser,
  findUserByEmail,
  findUserByUserName,
  verifyUser,
  findUserById,
  deleteUser,
  deleteMyUser,
  findAllUser,
  blockUser,
  findOnlyVerifyUsers,
  findOnlyBlockUsers,
  becomeBizUser,
  becomePremiumUser,
  changeEmailUser,
  updateRecoveryParams,
  updatePassword,
  updateUserPassword,
};