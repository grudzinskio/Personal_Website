import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { StarBackground } from "../components/StarBackground";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { cn } from "@/lib/utils";
import { LetterCollision } from "../components/LetterCollision";
import { ProjectsSection } from "../components/ProjectsSection";

export const Home = () => {
    const studentSectionRef = useRef(null);
    const [studentVisible, setStudentVisible] = useState(false);

    // Intersection Observer for student section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setStudentVisible(true);
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (studentSectionRef.current) {
            observer.observe(studentSectionRef.current);
        }

        return () => {
            if (studentSectionRef.current) {
                observer.unobserve(studentSectionRef.current);
            }
        };
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <StarBackground />
            <Navbar />
            <main>
                {/* Section 1: Letter Explosion Name */}
                <section className="relative px-4">
                    <LetterCollision />
                </section>

                {/* Section 2: Student Intro */}
                <section
                    ref={studentSectionRef}
                    className="relative min-h-screen flex items-center justify-center px-4"
                >
                    <div className="container max-w-4xl mx-auto text-center">
                        <p
                            className={cn(
                                "text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight transition-all duration-1000",
                                studentVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-10"
                            )}
                        >
                            I am a student at{" "}
                            <span className="text-primary font-bold">MSOE</span>
                        </p>
                    </div>
                </section>

                {/* Section 3: Featured Projects */}
                <ProjectsSection />
            </main>
            <Footer />
        </div>
    );
};
