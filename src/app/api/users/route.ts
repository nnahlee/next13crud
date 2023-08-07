import { NextResponse } from "next/server";
import { prisma } from "../../../../db/connect";

export async function GET() {
  try {
    const users = await prisma.user.findMany({});

    return NextResponse.json(users);
  } catch (err) {
    console.log(err);
  }
}
