export const metadata = {
  title: "Langara Course Planning Tools",
  description: "A web application to search and explore Langara College course offerings.",
};

import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full">

      <Header title="Langara College Course Planning Tools" color="#F15A22" hideForm/>

      <div className="px-4 py-6 flex flex-col gap-4">

        <div className="p-4 bg-blue-100 rounded-lg border-4 border-blue-400">
          <strong>Welcome to v3 of the Langara Course Planner!</strong>
            <p>Introducing many new features such as an improved timetable generator, and a course and section search.</p>
            <p>As always, please report bugs or feedback, or leave a testimonial at our <Link href={"https://forms.gle/CYKP7xsp2an6gNEK9"} className="text-blue-800 hover:text-blue-600 underline">feedback form!</Link></p>
            <p>If you find this page useful, share it with your friends to help them save time with course planning!</p>
        </div>

        <p>This is a free website that helps you effectively plan and look for courses at Langara College. Check out the <Link href="/about" className="text-blue-800 hover:text-blue-600 underline">about page</Link> for more information.</p>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/planner" className="block">
            <div className="bg-[#BDEDBD] p-6 h-64 flex flex-col items-center justify-center text-center rounded-lg hover:brightness-[0.8] transition-all">
              <h2 className="text-xl font-bold mb-2">Course Planner</h2>
              <p className="text-sm max-w-[300px]">Plan your courses for a semester using the original visual course planner.</p>
            </div>
          </Link>

          <Link href="/timetable" className="block">
            <div className="bg-[#b38cb3] p-6 h-64 flex flex-col items-center justify-center text-center rounded-lg hover:brightness-[0.8] transition-all">
              <h2 className="text-xl font-bold mb-2">Timetable Generator (BETA)</h2>
              <p className="text-sm max-w-[300px]">Explore all possible combinations of a list of selected courses.</p>
            </div>
          </Link>

          <Link href="/courses" className="block">
            <div className="bg-[#F1B5CB] p-6 h-64 flex flex-col items-center justify-center text-center rounded-lg hover:brightness-[0.8] transition-all">
              <h2 className="text-xl font-bold mb-2">Course Search</h2>
              <p className="text-sm max-w-[300px]">Explore every single course at Langara. Search by attribute, transfer destinations, and more.</p>
            </div>
          </Link>

          <Link href="/sections" className="block">
            <div className="bg-[#FEB95F] p-6 h-64 flex flex-col items-center justify-center text-center rounded-lg hover:brightness-[0.8] transition-all">
              <h2 className="text-xl font-bold mb-2">Course Offerings</h2>
              <p className="text-sm max-w-[300px]">Explore every single course offering at Langara. View historical data of previous sections, and filter by waitlist, open seats, or on other parameters.</p>
            </div>
          </Link>
        </div>

        <br></br>
        <div className="p-2 border-black border-2 rounded"> 
          <h3>Testimonials:</h3>
          <div className="py-2 px-4 italic text-gray-600 flex flex-col gap-2">
            <span>&quot;better than sliced bread&quot; - anonymous</span>
            <span>&quot;The Langara Course Planner is a fantastic kit of software that is better than SFU&apos;s. It is up, its running, its FOSS, it&apos;s Boss!&quot; - J. Marcato</span>
          </div>
        </div>
      </div>

      <Footer></Footer>

    </div>
  );
}
