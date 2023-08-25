import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";


interface RequestBody {
  email: string;
  body: string;
}

export async function POST(request: Request) {
  try {
    const { email, body }: RequestBody = await request.json();
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      const post = await prisma.post.create({
        data: {
          body,
          userId: user.id,
        },
      });

      return NextResponse.json(post, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if (userId) {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (user) {
        const posts = await prisma.post.findMany({
          where: { userId: user.id },
          include: { user: true, comments: true },
          orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(posts, { status: 200 });
      }
    } else {
      const posts = await prisma.post.findMany({
        include: {
          user: true,
          comments: true,
        },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(posts, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
