import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";

interface RequestBody {
  currentUserId: string;
  body: string;
  postId: string;
}

export async function POST(request: Request) {
  try {
    const { currentUserId, body, postId }: RequestBody = await request.json();

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUserId,
        postId,
      },
    });

    const postLiked = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (postLiked) {
      await prisma.notification.create({
        data: {
          body: "Someone Comment your tweet!",
          userId: postLiked.userId,
        },
      });

      if (postLiked.userId) {
        const updatedUser = await prisma.user.update({
          where: {
            id: postLiked.userId,
          },
          data: {
            hasNotification: true,
          },
        });
      }
    }

    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
