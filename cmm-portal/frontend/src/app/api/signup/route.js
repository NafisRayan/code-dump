import { connect } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user";

export async function POST(req, res) {
  try {
    const { email, password, name } = await req.json();
    const defaultRole = "user";

    if (!email || !password || !name) {
      return NextResponse.json(
        {
          message: "Email, name and password are required",
        },
        {
          status: 400,
        }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await connect();

    const user = await User.findOne({
      email,
    });
    if (user) {
      return NextResponse.json(
        {
          message: "User already exists",
        },
        {
          status: 400,
        }
      );
    }

    const newUser = {
      role: defaultRole,
      name,
      email,
      password: hashedPassword,
    };

    await User.create(newUser);

    return NextResponse.json(
      {
        message: "Signup successful - Please login to continue",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
