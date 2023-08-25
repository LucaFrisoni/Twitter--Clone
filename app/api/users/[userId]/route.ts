import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params: { userId } }: { params: { userId: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId.toString(),
      },
    });

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId.toString(),
        },
      },
    });

    return NextResponse.json({ user, followersCount }, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}
