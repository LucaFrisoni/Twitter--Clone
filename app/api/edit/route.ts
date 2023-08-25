import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";

interface RequestBody {
  email: string;
  name?: string;
  username?: string;
  bio?: string;
  coverImage?: string;
  profileImage?: string;
}

export async function PATCH(request: Request) {
  const { email, username, ...updateFields }: RequestBody =
    await request.json();

  try {
    if (username) {
      const lookSamePerson = await prisma.user.findFirst({
        where: { username, email },
      });
      if (lookSamePerson) {
        const updatedUser = await prisma.user.update({
          where: { email }, // Buscar por el email proporcionado
          data: { ...updateFields }, // Actualizar los campos proporcionados
        });
        return new Response(JSON.stringify(updatedUser), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        const lookUniqueUserName = await prisma.user.findFirst({
          where: { username },
        });
        if (lookUniqueUserName) {
          return NextResponse.json("Username Already Exist", { status: 400 });
        }
        const updatedUser = await prisma.user.update({
          where: { email }, // Buscar por el email proporcionado
          data: { username, ...updateFields }, // Actualizar los campos proporcionados
        });
        return new Response(JSON.stringify(updatedUser), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    }
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
