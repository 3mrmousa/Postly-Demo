import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function protect(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const { pathname } = req.nextUrl;

  if (pathname === "/login" || pathname === "/register") {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET!);
    }
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}
