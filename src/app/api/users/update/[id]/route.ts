import { NextResponse } from "next/server";
import { prisma } from "../../../../../../db/connect";

interface Payload {
  email: string;
  name: string;
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: number } }
) {
  const id = +params.id;

  if (!id) {
    return NextResponse.json({
      message: `please provide id to update`,
    });
  }

  try {
    const data = (await req.json()) as Payload;
    const { name, email } = data;

    const userExists = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      return NextResponse.json({
        message: `no user exists with id of ${id}`,
      });
    }

    if (!name || !email) {
      return NextResponse.json({
        message: `please provide both name and email fields`,
      });
    }

    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
      },
    });

    return NextResponse.json({
      message: `successfully updated user with id of ${id}`,
      updatedUser: updateUser,
    });
  } catch (err) {
    console.log(err);
  }
}
