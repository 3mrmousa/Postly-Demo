import bcrypt from "bcryptjs";
import { connectDB } from "../mongodb";
import User from "@/models/user.model";
import mongoose from "mongoose";

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

export async function toggleFollow(
  currentUserId: string,
  targetUserId: string,
) {
  await connectDB();

  if (currentUserId === targetUserId) {
    throw new Error("You cannot follow yourself");
  }

  const targetUser = await User.findById(targetUserId);

  if (!targetUser) {
    throw new Error("Target User not found");
  }

  const alreadyFollowed = (targetUser.followers || []).some(
    (id: mongoose.Types.ObjectId) => id.toString() === currentUserId,
  );

  if (alreadyFollowed) {
    await User.findByIdAndUpdate(targetUserId, {
      $pull: { followers: currentUserId },
    });
    await User.findByIdAndUpdate(currentUserId, {
      $pull: { following: targetUserId },
    });
  } else {
    await User.findByIdAndUpdate(targetUserId, {
      $push: { followers: currentUserId },
    });
    await User.findByIdAndUpdate(currentUserId, {
      $push: { following: targetUserId },
    });
  }
}

export async function getUserByUsername(username: string) {
  await connectDB();

  const user = await User.findOne({ username }).lean();

  if (!user) return null;

  return {
    id: user._id.toString(),
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    followers: (user.followers || []).map((id: mongoose.Types.ObjectId) =>
      id.toString(),
    ),
    following: (user.following || []).map((id: mongoose.Types.ObjectId) =>
      id.toString(),
    ),
    followersCount: user.followers?.length || 0,
    followingCount: user.following?.length || 0,
  };
}
