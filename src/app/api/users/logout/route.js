import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = NextResponse.json(
      { message: "Logout succesfull" },
      { success: true }
    );
    res.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return res;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
