import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";

interface RequestBody {
  currentUserId: string;
  userId: string;
}

export async function POST(request: Request) {
  try {
    const { userId, currentUserId }: RequestBody = await request.json();

    const userFollow = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userFollow) {
      throw new Error("Invalid ID");
    }

    await prisma.notification.create({
      data: {
        body: "Someone Follow you!",
        userId: userId,
      },
    });

    if (userId) {
      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          hasNotification: true,
        },
      });
    }

    let updatedFollowingIDS = [...(userFollow?.followingIds || [])];

    updatedFollowingIDS.push(currentUserId);

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        followingIds: updatedFollowingIDS,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const currentUserId = searchParams.get("currentUserId");

    if (userId) {
      const userFollow = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!userFollow) {
        throw new Error("Invalid ID");
      }

      const notificationToDelete = await prisma.notification.findFirst({
        where: {
          userId: userId,
          body: "Someone Follow you!",
        },
      });
      if (notificationToDelete) {
        await prisma.notification.delete({
          where: {
            id: notificationToDelete.id,
          },
        });
      }

      let updatedFollowingIDS = [...(userFollow?.followingIds || [])];

      updatedFollowingIDS = updatedFollowingIDS.filter(
        (i) => i != currentUserId
      );

      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          followingIds: updatedFollowingIDS,
        },
      });
      return NextResponse.json(updatedUser, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
