import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

export const AnimatedSection = ({ children, className, direction = 'left' }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    // The '-rotate-6' and 'rotate-6' classes have been removed here
    const hiddenClasses = 
        direction === 'left' 
        ? '-translate-x-20 scale-90' 
        : 'translate-x-20 scale-90';

    return (
        <div
            ref={ref}
            className={cn(
                'transition-all duration-1000 ease-in-out',
                inView 
                    // The 'rotate-0' class has been removed here
                    ? 'opacity-100 translate-x-0 scale-100 blur-0'
                    : `opacity-0 blur-md ${hiddenClasses}`,
                className
            )}
        >
            {children}
        </div>
    );
};