import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Background } from "../components/Background";
import { Navbar } from "../components/Navbar";

export const NotFound = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen text-foreground overflow-x-hidden flex flex-col"
        >
            <Background />
            <Navbar />

            <main className="flex-1 flex items-center justify-center px-4">
                <div className="text-center max-w-2xl">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <h1 className="text-9xl md:text-[12rem] font-bold text-gradient-animated mb-4">
                            404
                        </h1>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Page Not Found
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            The page you're looking for doesn't exist or has been moved.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link
                            to="/"
                            className="cosmic-button inline-flex items-center justify-center gap-2 group"
                        >
                            <Home className="w-5 h-5" />
                            Go Home
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="button-glass inline-flex items-center justify-center gap-2 group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            Go Back
                        </button>
                    </motion.div>
                </div>
            </main>
        </motion.div>
    );
};

export default NotFound;
