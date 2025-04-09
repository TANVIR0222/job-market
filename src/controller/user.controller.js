import userModel from "../model/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

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


// user login

export const userLogin = asyncHandler(async(req,res)=>{
  
    const {email , password} = req.body;
    console.log(email , password);
    

    if(!email){
        throw new ApiError(500, "Please  provide email ");
    }

    const user = await userModel.findOne({email})
    if(!user){
        res.status(500).json(new ApiResponse(500, error, "user not found , login now "));
    }
    

    // match user send password === data base password  
    const matchPassword =  await user.isPasswordCorrect(password) // check password  // userModel isPasswordCorrect
    if (!matchPassword) {
        res.status(401).json(new ApiResponse(401 , {} , "Password not match"));
    }


    const loginUserData = await userModel.findById(user._id);
    res
    .status(201)
    .json(new ApiResponse(201, loginUserData, "user create success "));

})