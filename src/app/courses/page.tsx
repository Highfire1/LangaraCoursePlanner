export const metadata = {
  title: "Langara Course Search",
  description: "A web application to explore courses at Langara College. Search by attribute, transfer destinations, and more.",
};

import CourseBrowser from "./course-browser";
import { Suspense } from "react";
import Header from "@/components/shared/header";
import { v1IndexSubjectsResponse, v1IndexTransfersResponse, v2SearchCoursesResponse } from "@/types/Course";


export const revalidate = 3600 // revalidate every hour




export default async function Page() {

  const [transfersRes, subjectsRes, coursesRes] = await Promise.all([
    fetch('https://coursesapi.langaracs.ca/v1/index/transfer_destinations'),
    fetch('https://coursesapi.langaracs.ca/v1/index/subjects'),
    fetch('https://coursesapi.langaracs.ca/v2/search/courses?on_langara_website=true'),
  ]);

  const [transfersData, subjectsData, coursesData] : [v1IndexTransfersResponse, v1IndexSubjectsResponse, v2SearchCoursesResponse] = await Promise.all([
    transfersRes.json(),
    subjectsRes.json(),
    coursesRes.json(),
  ]);

  const transfers = transfersData.transfers;
  const subjects = subjectsData.subjects;
  const courses = coursesData.courses;
  
  return (
    <div className="w-full h-full">
      <Header title="Langara Course Search" color="#F1B5CB" />

      <div className="md:px-10">
        <Suspense fallback={<div>Loading...</div>}>
          <CourseBrowser transfers={transfers} subjects={subjects} initialCourses={courses}/>
        </Suspense>
      </div>
    </div>
  );
}