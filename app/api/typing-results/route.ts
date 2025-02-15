import { NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      snippetId,
      language,
      wpm,
      raw,
      accuracy,
      time,
      characters,
      testType,
    } = body;

    const result = await prisma.typingResult.create({
      data: {
        userId: session.user.id,
        snippetId,
        language,
        wpm,
        raw,
        accuracy,
        time,
        characters,
        testType,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error saving typing result:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const language = searchParams.get("language");
  const snippetId = searchParams.get("snippetId");
  const limit = parseInt(searchParams.get("limit") || "100");

  try {
    const where: Prisma.TypingResultWhereInput = {};
    if (language) where.language = language;
    if (snippetId) where.snippetId = snippetId;

    const results = await prisma.typingResult.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        wpm: "desc",
      },
      take: limit,
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching typing results:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
