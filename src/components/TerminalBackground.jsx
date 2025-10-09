import { useState, useEffect } from "react";

const commands = [
    { command: "whoami", output: "oliver@portfolio" },
    { command: "pwd", output: "/home/oliver/portfolio" },
    { command: "ls -la", output: "drwxr-xr-x 5 oliver oliver 4096 Oct  9 2024 .\ndrwxr-xr-x 3 oliver oliver 4096 Oct  8 2024 ..\n-rw-r--r-- 1 oliver oliver 2847 Oct  9 2024 about.md\n-rw-r--r-- 1 oliver oliver 1205 Oct  9 2024 contact.info\ndrwxr-xr-x 2 oliver oliver 4096 Oct  9 2024 projects\n-rw-r--r-- 1 oliver oliver 3421 Oct  9 2024 skills.json" },
    { command: "cat about.md", output: "# Oliver Grudzinski\nComputer Science Student @ MSOE\nFull Stack Developer Intern @ TESCH Global\nPassionate about AI/ML and Web Development" },
    { command: "grep -r 'skills' .", output: "./skills.json:Python, Java, React, AI/ML\n./projects/ai-cpa/README.md:Skills: LangChain, PydanticAI" },
    { command: "git status", output: "On branch main\nYour branch is up to date with 'origin/main'.\nnothing to commit, working tree clean" },
    { command: "python --version", output: "Python 3.11.4" },
    { command: "node --version", output: "v20.9.0" },
    { command: "echo $SHELL", output: "/bin/bash" },
    { command: "uname -a", output: "Linux portfolio 6.1.0 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux" }
];

export const TerminalBackground = () => {
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
                }, 80 + Math.random() * 40); // Variable typing speed
                return () => clearTimeout(timeout);
            } else {
                // Finished typing command
                setTimeout(() => {
                    setIsTyping(false);
                    setShowOutput(true);
                }, 800);
            }
        } else if (showOutput) {
            // Show output for a while then move to next command
            const timeout = setTimeout(() => {
                // Move to next command
                setCurrentCommandIndex((prev) => (prev + 1) % commands.length);
                setCurrentText("");
                setIsTyping(true);
                setShowOutput(false);
            }, 3000);
            
            return () => clearTimeout(timeout);
        }
    }, [currentText, isTyping, showOutput, currentCommandIndex]);

    return (
        <div className="w-full max-w-md mx-auto mb-6">
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
                
                {/* Terminal content - compact 2 lines */}
                <div className="p-3 font-mono text-xs leading-relaxed">
                    {/* Current typing line */}
                    <div className="text-green-400/90 mb-1">
                        <span className="text-gray-300/70">$ </span>
                        {currentText}
                        <span className="animate-pulse ml-0.5 bg-green-400/80 w-1.5 h-3 inline-block"></span>
                    </div>
                    
                    {/* Current output - truncated for compact display */}
                    {showOutput && (
                        <div className="text-gray-300/70 text-xs animate-fade-in">
                            {commands[currentCommandIndex].output.split('\n')[0]}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};