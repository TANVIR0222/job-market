import userModel from "../model/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// user register
export const userRegister = async (req, res) => {
  try {
    // send all data front end
    const { name, email, password, authId, role } = req.body;

    // check all data not empty
    if (
      [name, email, password, authId, role].some(
        (field) => field?.trim() === ""
      )
    ) {
      throw new ApiError(400, "Please fill in all fields");
    }

    // check user all ready create same id or not
    const existingUser = await userModel.findOne({ $or: [{ email }] });
    if (existingUser) {
      throw new ApiError(404, "Email all ready exists");
    }

    // send user data database and create new use
    const user = await userModel.create({
      name,
      email,
      password,
      authId,
      role,
    });

    // check user create or not and get info user and hidden password
    const createUser = await userModel.findById(user._id).select("-password");
    if (!createUser) {
      throw new ApiError(500, "Some thing went wrong while register user");
    }

    // send all user data frontend
    res
      .status(201)
      .json(new ApiResponse(201, createUser, "user create success "));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, error, "user create fail "));
  }
};
