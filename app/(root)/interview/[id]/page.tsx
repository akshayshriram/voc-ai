import React from "react";
import { getInterviewById } from "@/lib/actions/general.action";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getRandomInterviewCover } from "@/lib/utils";
import DisplayTechIcons from "@/components/DisplayTechIcons";
import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.actions";
const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const interview = await getInterviewById(id);

  const user = await getCurrentUser();
  ;
  if (!interview) redirect('/')

  return (
    <>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row fap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4">
            <Image src={getRandomInterviewCover()} alt="Cover image" width={40} height={40} className="rounded-full object-cover size-[40px]" />
            <h3 className="capitalize">{interview.role} Interview</h3>

          </div>
          <DisplayTechIcons techStack={interview.techstack} />
        </div>
        <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize">{interview.type}</p>
      </div>
      <Agent userName={user?.name || ''} type="interview" interviewId={id} userId={user?.id} questions={interview.questions} />
    </>
  );
};

export default page;
