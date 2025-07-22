import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

export async function GET() {
  return Response.json(
    {
      success: true,
      data: "Generate Interview for JD",
    },
    {
      status: 200,
    }
  );
}

export async function POST(request: Request) {
  const { jobDescription, userId } = await request.json();
  try {
    const { text: result } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `
        Carefully read and analyze the entire job description provided below. Identify the most important responsibilities, requirements, and context for the role. Based on your deep understanding of the job description, generate up to 5 interview questions that are highly relevant and tailored to this specific position. Also extract the following information as a JSON object:
        {
          "role": "<job title or position>",
          "level": "<seniority level: junior, mid-level, or senior>",
          "type": "<interview type: behavioral, technical, or mixed>",
          "techstack": ["<technology1>", "<technology2>", ...],
          "questions": ["Question 1", "Question 2", ..., "Question 5"]
        }
        - "role" should be the main job title or position.
        - "level" should be inferred from the JD (junior, mid-level, or senior).
        - "type" should be inferred from the JD (behavioral, technical, or mixed).
        - "techstack" should be an array of technologies, frameworks, or tools mentioned.
        - "questions" should be up to 5 highly relevant interview questions for this role.
        Please return only the JSON object, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.

        Job Description:
        """
        ${jobDescription}
        """
      `,
    });

    let jsonString = result.trim();
    // Remove code block markers if present
    if (jsonString.startsWith("```")) {
      jsonString = jsonString
        .replace(/^```[a-zA-Z]*\n?/, "")
        .replace(/```$/, "");
    }
    const { role, level, type, techstack, questions } = JSON.parse(jsonString);

    const interview = {
      role,
      level,
      type,
      techstack,
      questions,
      userId: userId,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("interviews").add(interview);

    return Response.json({ success: true, interview }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
