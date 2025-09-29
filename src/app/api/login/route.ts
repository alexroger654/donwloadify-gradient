import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { Admin } from "@/lib/models/Admin";


const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ message: "Missing credentials" }, { status: 400 });
    }

    await mongoose.connect(process.env.MONGO_URI || "");

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
    }

       // Plain text password comparison
       if (password !== admin.password) {
        return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
      }
  


    const token = jwt.sign({ id: admin._id, username: admin.username }, JWT_SECRET, {
      expiresIn: "1d",
    });

    return NextResponse.json({ token });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
