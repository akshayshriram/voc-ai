import GenerateInterviewForm from "@/components/GenerateInterview";
import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.actions";
import { getInterviewsByUserId, getLatestInterviews } from "@/lib/actions/general.action";
import Image from "next/image";
import Link from "next/link";

async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewsByUserId(user?.id!),
    await getLatestInterviews({ userId: user?.id! })
  ])

  const hasPastInterviews = userInterviews?.length > 0;
  const hasUpcomingInterviews = latestInterviews?.length > 0

  return (
    <>
      <section className="card-cta flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex flex-col gap-6 w-full md:w-1/2 h-full">
          <h2>Get Interview-Ready with Your AI Voice - Practice & Feedback</h2>
          <p className="text-lg">
            Supercharge your preparation with an AI voice assistant that generates personalized mock interviews based on your role or job description.
            Practice with realistic, role-specific questions and receive instant feedback on your responses
          </p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
        <div className="flex flex-col gap-6 w-full md:w-1/2">
          <h2>Paste Your Job Description to Generate a Custom Interview</h2>
          <GenerateInterviewForm userId={user?.id!} />
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interview</h2>
        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet </p>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8 ">
        <h2>Take an Interview</h2>
        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>There are no new interviews available </p>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
