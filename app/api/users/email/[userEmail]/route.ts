import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params: { userEmail } }: { params: { userEmail: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}
