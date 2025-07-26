import { NextRequest, NextResponse } from "next/server";
import { getLatestInterviews } from "@/lib/actions/general.action";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  try {
    const interviews = await getLatestInterviews({ userId });
    return NextResponse.json(interviews || []);
  } catch (error) {
    console.error("Error fetching latest interviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch latest interviews" },
      { status: 500 }
    );
  }
}
