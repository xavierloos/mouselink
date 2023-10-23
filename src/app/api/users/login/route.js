import { connectToDB } from "@utils/database";
import User from "@models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = async (request) => {
  try {
    await connectToDB();
    const reqBody = await request.json();

    const { email, password } = reqBody;

    //Check if user exist
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    //Check for correct password
    const validPass = await bcryptjs.compare(password, user.password);

    if (!validPass) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    //Create token
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "1hr",
    });

    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
    // const newUser = new User({
    //   username,
    //   f_name,
    //   email,
    //   password: hashedPasswd,
    //   image: "",
    // });
    // const savedUser = await newUser.save();

    // return NextResponse.json({
    //   message: "User created successfully",
    //   success: true,
    //   savedUser,
    // });
  } catch (error) {
    console.log(error);
  }
};
