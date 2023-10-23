import { getProfileData } from "@src/helpers/getProfileData";
import { NextRequest, NextResponse } from "next/server";
import User from "@models/user";
import { connectToDB } from "@utils/database";

connectToDB();

export async function GET(request) {
  //   console.log(request);
  try {
    const userId = await getProfileData(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({ message: "User Found", data: user });
  } catch (error) {
    console.log(error);
  }
}
