import { NextRequest, NextResponse } from "next/server";
import { getFeedbackByInterviewId } from "@/lib/actions/general.action";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const interviewId = searchParams.get("interviewId");
  const userId = searchParams.get("userId");

  if (!interviewId || !userId) {
    return NextResponse.json(
      { error: "interviewId and userId are required" },
      { status: 400 }
    );
  }

  try {
    const feedback = await getFeedbackByInterviewId({ interviewId, userId });
    return NextResponse.json(feedback);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return NextResponse.json(
      { error: "Failed to fetch feedback" },
      { status: 500 }
    );
  }
}
