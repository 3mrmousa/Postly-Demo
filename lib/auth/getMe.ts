import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/user.model";
import { connectDB } from "@/lib/mongodb";

export async function getMe() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    await connectDB();
    return await User.findById(decoded.userId).lean();
  } catch {
    return null;
  }
}
