import { connectToDB } from "@utils/database";
import User from "@models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export const POST = async (request) => {
  try {
    await connectToDB();
    const reqBody = await request.json();

    const { username, f_name, email, password } = reqBody;

    //Check if user exist
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exist" },
        { status: 400 }
      );
    }
    //Encript password
    const salt = await bcryptjs.genSalt(10);
    const hashedPasswd = await bcryptjs.hash(password, salt);

    //Create new user
    const newUser = new User({
      username,
      f_name,
      email,
      password: hashedPasswd,
      image: "",
    });
    const savedUser = await newUser.save();

    console.log("User created");

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error) {
    console.log(error);
  }
};
