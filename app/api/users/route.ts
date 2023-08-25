import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}
