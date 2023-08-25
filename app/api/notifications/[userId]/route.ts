import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params: { userId } }: { params: { userId: string } }
) {
  try {
    const notification = await prisma.notification.findMany({
      where: {
        userId: userId.toString(),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

await prisma.user.update({
    where:{
        id:userId
    },
    data:{
        hasNotification:false
    }
})


    return NextResponse.json(notification, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}
