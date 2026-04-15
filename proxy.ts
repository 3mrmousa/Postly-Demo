import { NextRequest } from "next/server";
import { protect } from "./middlewares/protect.middleware";

export function proxy(req: NextRequest) {
  return protect(req);
}

export const config = {
  matcher: ["/create-post", "/profile", "/settings"],
};