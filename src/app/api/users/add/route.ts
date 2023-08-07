import { NextResponse } from "next/server";
import { prisma } from "../../../../../db/connect";

interface Payload {
  email: string;
  name: string;
}

export async function POST(req: Request) {
  const data = (await req.json()) as Payload;

  const { email, name } = data;

  if (!email || !name) {
    return NextResponse.json({
      message: `please add both email and name fields`,
    });
  }

  try {
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return NextResponse.json({
        message: `user already exists with email of ${email}`,
      });
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
      },
    });

    return NextResponse.json({
      message: "added user",
      newUser,
    });
  } catch (err) {
    console.log(err);
  }
}
