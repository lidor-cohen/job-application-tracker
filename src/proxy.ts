import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/auth";

export default async function proxy(request: NextRequest) {
  const session = await getSession();

  const protectedPathsForUsers = ["/sign-in", "/sign-up"];
  const isProtectedForUser = protectedPathsForUsers.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  if (isProtectedForUser && session?.user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
