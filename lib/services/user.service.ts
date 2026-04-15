import bcrypt from "bcryptjs";
import { connectDB } from "../mongodb";
import User from "@/models/user.model";

export async function loginByEmail(email: string, password: string) {
  await connectDB();
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unauthorized");
  }

  return {
    id: user._id.toString(),
    email: user.email,
    username: user.username,
  };
}

export async function loginByUsername(username: string, password: string) {
  await connectDB();
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unauthorized");
  }

  return {
    id: user._id.toString(),
    email: user.email,
    username: user.username,
  };
}

export async function register(data: {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  avatar?: string;
  cover?: string;
}) {
  await connectDB();

  const existingUser = await User.findOne({
    $or: [{ email: data.email }, { username: data.username }],
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    ...data,
    password: hashedPassword,
  });

  return {
    id: user._id.toString(),
    email: user.email,
    username: user.username,
  };
}
