import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getProfileData = (request) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    return decodedToken.id;
  } catch (error) {
    return error;
  }
};
