'use client';


import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SelectedCourses from './SelectedCourses';
import TimetableSections from './TimetableSections';
import Calendar from './Calendar';
import { Course, CourseInternal, CoursesResponse } from '../../types/Course';
import { SectionsResponse, Section } from '../../types/Section';

export default function Composer() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const year = searchParams.get('year') || '2025';
    const term = searchParams.get('term') || '20';

    const [selectedCourses, setSelectedCourses] = useState<CourseInternal[]>([]);
    const [currentTimetable, setCurrentTimetable] = useState<Section[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!searchParams.get('year') || !searchParams.get('term')) {
            router.replace(`/timetable?year=${year}&term=${term}`, { scroll: false });
            return;
        }

        const fetchData = async () => {
            try {
                const [coursesResponse, sectionsResponse] = await Promise.all([
                    fetch(`https://coursesapi.langaracs.ca/v1/semester/${year}/${term}/courses`),
                    fetch(`https://coursesapi.langaracs.ca/v1/semester/${year}/${term}/sections`)
                ]);

                const coursesData: CoursesResponse = await coursesResponse.json();
                const sectionsData: SectionsResponse = await sectionsResponse.json();

                coursesData.courses.forEach(course => {
                    course.sections = sectionsData.sections.filter(
                        section =>
                            section.subject === course.subject && section.course_code === course.course_code
                    );
                });

                setCourses(coursesData.courses);
            } catch (err) {
                setError('Failed to fetch data: ' + (err as Error).message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [year, term, searchParams, router]);

    if (isLoading) return <div className='w-[100vw] h-[100vh] p-4'>Loading...</div>;
    if (error) return <div className='w-[100vw] h-[100vh] p-4'>{error}</div>;

    return (

        <div className="flex gap-2 bg-gray-100 flex-grow overflow-hidden min-w-[800px]">
            <div className="w-1/4 overflow-y-auto h-full">
                <SelectedCourses
                    courses={courses}
                    selectedCourses={selectedCourses}
                    setSelectedCourses={setSelectedCourses}
                    year={year}
                    term={term}
                />
            </div>
            <div className="w-1/4 overflow-auto ">
                    <TimetableSections
                        courses={selectedCourses}
                        setCurrentTimetable={setCurrentTimetable}
                    />
            </div>
            <div className="w-2/4 h-full">
                <div className="rounded h-full p-2">
                    <Calendar currentTimetable={currentTimetable} />
                </div>
            </div>
        </div>
    );
}