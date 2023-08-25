import bcrypt from "bcrypt";
import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";

interface RequestBody {
  email: string;
  username: string;
  name: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const { email, username, name, password }: RequestBody =
      await request.json();

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma?.user.create({
      data: {
        email,
        username,
        hashedPassword,
        name,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
