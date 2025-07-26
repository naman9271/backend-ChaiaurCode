import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/users.model.js';
import { uploadOnCloudinary } from '../services/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  //check if user already exist: username,email
  //check for images ,check for avatar
  // upload it to cloudinary
  // create a userObject, create entry in db
  //remove password and refreshToken from response
  // check for user creation
  // return res

  const { fullName, email, username, password } = req.body;

  //validation

  // if(fullName=="" || email=="" || username=="" || password==""){
  //     throw new ApiError(400, "All fields are required")
  // }

  if ([fullName, email, username, password].some((field) => field?.trim() === '')) {
    throw new ApiError(400, 'All fields are requried');
  }
  //checking if user already exists

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, 'User already exists');
  }

  // checking files

  //middleware upload give access
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(409, 'Avatar is required');
  }

  // upload to cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(409, 'Avatar is required');
  }

  // create a userObject in DB

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || '',
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select('-password -refreshToken');

  if (!createdUser) {
    throw new ApiError(500, 'Something went wrong while registering the user');
  }

  return res.status(201).json(new ApiResponse(200, createdUser, 'User Registered Successfully'));
});

export { registerUser };
