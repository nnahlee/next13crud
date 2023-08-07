import { NextResponse } from "next/server";
import { prisma } from "../../../../../db/connect";

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } }
) {
  const id = +params.id;
  if (!id)
    return NextResponse.json({
      message: "id is required for deletion",
    });

  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      return NextResponse.json({
        message: "no user with that id found for deletion",
      });
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "successfully deleted user",
    });
  } catch (err) {
    console.log(err);
  }
}
