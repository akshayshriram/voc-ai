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
  const { jobDescription } = await request.json();
  return Response.json(
    {
      success: true,
      data: jobDescription,
    },
    {
      status: 200,
    }
  );
}
