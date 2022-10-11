const UserModel = require("../../model/userModel");
const UserDetailsModel = require("../../model/userDetailsModel");


const findMyDetailsController = async (req, res) => {
  try {
    const jwtUser = await UserModel.findUserByEmail(req.jwtData.email);

    const details = await UserDetailsModel.findMyDetails({
      createdBy: jwtUser[0].id,
    });
    res.send(details);
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

const FindDetailsByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const details = await UserDetailsModel.deleteMyDetailsById(id);
    res.json(details);
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};


module.exports = {
  findMyDetailsController,
  FindDetailsByIdController,
};