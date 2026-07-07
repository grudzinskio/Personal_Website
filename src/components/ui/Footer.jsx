import { Link } from "react-router-dom";
import { ArrowUpRight, Github, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import ogLogo from "../../assets/OG_New_logo.png";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
];

const socials = [
    { label: "GitHub", href: "https://github.com/grudzinskio", Icon: Github },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/grudzinskioliver/", Icon: Linkedin },
    { label: "Instagram", href: "https://www.instagram.com/olivergrud/", Icon: Instagram },
];

export const Footer = () => {
    return (
        <footer className="px-3 pb-4 sm:px-5 sm:pb-5">
            <div className="content-shell mx-auto overflow-hidden rounded-[2rem] bg-[#111214] px-6 py-10 text-white sm:px-10 sm:py-14">
                {/* Top: headline + CTA */}
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                        Let&rsquo;s build something.
                    </h2>
                    <Link
                        to="/contact"
                        className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-white shadow-[0_12px_28px_-10px_rgba(245,179,66,0.6)] transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#e0a233]"
                    >
                        Hire me
                        <ArrowUpRight className="size-4" />
                    </Link>
                </div>

                <hr className="my-10 border-white/10" />

                {/* Columns */}
                <div className="grid gap-10 md:grid-cols-[1.7fr_1fr_1.2fr]">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3">
                            <img src={ogLogo} alt="Oliver Grudzinski" className="h-9 w-auto" />
                            <span className="text-lg font-semibold tracking-[-0.01em]">Oliver Grudzinski</span>
                        </div>
                        <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
                            Building intelligent systems and the full-stack products that put them to
                            work. Data pipelines, ML, and clean software, based near Milwaukee.
                        </p>
                        <div className="mt-6 flex items-center gap-3">
                            {socials.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={social.label}
                                    className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-colors hover:border-accent/50 hover:text-accent"
                                >
                                    <social.Icon className="size-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Navigation</p>
                        <ul className="mt-5 space-y-3">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-sm text-white/60 transition-colors hover:text-white"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Contact</p>
                        <ul className="mt-5 space-y-3 text-sm text-white/60">
                            <li>
                                <a
                                    href="mailto:grudzinskioliver@gmail.com"
                                    className="inline-flex items-center gap-2 transition-colors hover:text-white"
                                >
                                    <Mail className="size-4 shrink-0 text-white/40" />
                                    grudzinskioliver@gmail.com
                                </a>
                            </li>
                            <li className="inline-flex items-center gap-2">
                                <MapPin className="size-4 shrink-0 text-white/40" />
                                Greater Milwaukee Area, WI
                            </li>
                            <li>
                                <a
                                    href="https://github.com/grudzinskio"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 transition-colors hover:text-white"
                                >
                                    <Github className="size-4 shrink-0 text-white/40" />
                                    github.com/grudzinskio
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr className="my-10 border-white/10" />

                {/* Bottom bar */}
                <div className="flex flex-col gap-3 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
                    <p>&copy; {new Date().getFullYear()} Oliver Grudzinski. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <Link to="/contact" className="transition-colors hover:text-white/80">Contact</Link>
                        <span className="text-white/20">|</span>
                        <Link to="/projects" className="transition-colors hover:text-white/80">Projects</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
