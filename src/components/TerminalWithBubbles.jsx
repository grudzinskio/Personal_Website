import { useState, useEffect } from "react";
import profPortrait from "../assets/Prof_Port.jpg";

const commands = [
    { command: "whoami", output: "oliver@portfolio" },
    { command: "pwd", output: "/home/oliver/portfolio" },
    { command: "ls -la", output: "drwxr-xr-x 5 oliver oliver 4096 Oct  9 2024 ." },
    { command: "cat about.md", output: "# Oliver Grudzinski - CS Student @ MSOE" },
    { command: "grep -r 'skills' .", output: "Python, Java, React, AI/ML" },
    { command: "git status", output: "On branch main - nothing to commit" },
    { command: "python --version", output: "Python 3.11.4" },
    { command: "node --version", output: "v20.9.0" }
];

export const TerminalWithPortrait = () => {
    const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const [showOutput, setShowOutput] = useState(false);

    useEffect(() => {
        const currentCommand = commands[currentCommandIndex];
        
        if (isTyping) {
            const targetText = currentCommand.command;
            if (currentText.length < targetText.length) {
                const timeout = setTimeout(() => {
                    setCurrentText(targetText.slice(0, currentText.length + 1));
                }, 80 + Math.random() * 40);
                return () => clearTimeout(timeout);
            } else {
                setTimeout(() => {
                    setIsTyping(false);
                    setShowOutput(true);
                }, 800);
            }
        } else if (showOutput) {
            const timeout = setTimeout(() => {
                setCurrentCommandIndex((prev) => (prev + 1) % commands.length);
                setCurrentText("");
                setIsTyping(true);
                setShowOutput(false);
            }, 3000);
            
            return () => clearTimeout(timeout);
        }
    }, [currentText, isTyping, showOutput, currentCommandIndex]);

    return (
        <div className="flex flex-col items-center space-y-8">
            {/* Terminal above */}
            <div className="w-full max-w-md mx-auto">
                <div className="bg-gray-900/30 backdrop-blur-md rounded-lg border border-gray-700/40 shadow-xl overflow-hidden">
                    {/* Terminal header */}
                    <div className="bg-gray-800/50 px-3 py-1.5 flex items-center gap-2 border-b border-gray-700/40">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                        </div>
                        <div className="text-gray-300/70 text-xs ml-2">oliver@portfolio</div>
                    </div>
                    
                    {/* Terminal content */}
                    <div className="p-3 font-mono text-xs leading-relaxed">
                        {/* Current typing line */}
                        <div className="text-green-400/90 mb-1">
                            <span className="text-gray-300/70">$ </span>
                            {currentText}
                            <span className="animate-pulse ml-0.5 bg-green-400/80 w-1.5 h-3 inline-block"></span>
                        </div>
                        
                        {/* Current output */}
                        {showOutput && (
                            <div className="text-gray-300/70 text-xs animate-fade-in">
                                {commands[currentCommandIndex].output.split('\n')[0]}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Portrait and Text Layout */}
            <div className="flex items-center justify-center gap-4 md:gap-6 lg:gap-8">
                {/* Portrait bubble on the left */}
                <div
                    className="group w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden shadow-lg border border-primary/40 backdrop-blur-sm flex-shrink-0"
                    style={{ animation: 'float 7s ease-in-out infinite', animationDelay: '0.2s' }}
                >
                    <img
                        src={profPortrait}
                        alt="Professional portrait of Oliver"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-primary/10 mix-blend-overlay" />
                </div>

                {/* Text content - single line */}
                <div className="text-left min-w-0 flex-1">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight whitespace-nowrap">
                        <span className="opacity-0 animate-fade-in">Hello, I'm </span>
                        <span className="text-primary opacity-0 animate-fade-in-delay-1">
                            Oliver
                        </span>
                        <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2">
                            Grudzinski
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    );
};