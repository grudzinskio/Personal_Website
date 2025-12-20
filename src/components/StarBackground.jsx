import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import msoeSunset from "../assets/MSOE_Sunset.jpg";

gsap.registerPlugin(ScrollTrigger);

export const StarBackground = () => {
    const [stars, setStars] = useState([]);
    const [meteors, setMeteors] = useState([]);
    const backgroundRef = useRef(null);

    useEffect(() => {
        generateStars();
        generateMeteors();
        const handleResize = () => {
            generateStars();
        }
        window.addEventListener("resize", handleResize);
        
        // Fade out star background as user scrolls into video section
        if (backgroundRef.current) {
            gsap.to(backgroundRef.current, {
                opacity: 0,
                scrollTrigger: {
                    trigger: document.body,
                    start: "50vh top",
                    end: "100vh top",
                    scrub: 1,
                    invalidateOnRefresh: true
                }
            });
        }
        
        return () => {
            window.removeEventListener("resize", handleResize);
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars && trigger.vars.trigger === document.body) {
                    trigger.kill();
                }
            });
        };
    }, []);

    const generateStars = () => {
        const numberOfStars = Math.floor((window.innerHeight * window.innerHeight) / 5000);

        const newStars = [];
        for (let i = 0; i < numberOfStars; i++) {
            newStars.push({
                id: i,
                size: Math.random() * 3 + 1,
                x: Math.random() * 100,
                y: Math.random() * 100,
                opacity: Math.random() * 0.5 + 0.5,
                animationDuration: Math.random() * 4 + 2,
            });
        }

        setStars(newStars);
    };


    const generateMeteors = () => {
        const numberOfMeteors = 4;

        const newMeteors = [];
        for (let i = 0; i < numberOfMeteors; i++) {
            newMeteors.push({
                id: i,
                size: Math.random() * 2 + 1,
                x: Math.random() * 100,
                y: Math.random() * 20,
                delay: Math.random() * 15,
                animationDuration: Math.random() * 3 + 3,
            });
        }

        setMeteors(newMeteors);
    };
    
    return (
        <div ref={backgroundRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Sunset background - only visible in hero section */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                style={{
                    backgroundImage: `url(${msoeSunset})`,
                    backgroundBlendMode: 'overlay',
                    mask: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0) 100%)'
                }}
            />

            {stars.map((star) => (
                <div
                    key={star.id}
                    className="star animate-pulse-subtle"
                    style={{
                        width: star.size + "px",
                        height: star.size + "px",
                        left: star.x + "%",
                        top: star.y + "%",
                        opacity: star.opacity,
                        animationDuration: star.animationDuration + "s",
                    }} />
            ))}

            {meteors.map((meteor) => (
                <div
                    key={meteor.id}
                    className="meteor animate-meteor"
                    style={{
                        width: meteor.size * 50 + "px",
                        height: meteor.size * 2 + "px",
                        left: meteor.x + "%",
                        top: meteor.y + "%",
                        animationDelay: meteor.delay,
                        animationDuration: meteor.animationDuration + "s",
                    }} />
            ))}
        </div>);
};