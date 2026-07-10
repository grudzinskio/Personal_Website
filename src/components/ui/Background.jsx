import { ImageBackground } from './backgrounds/ImageBackground';
import { LegibilityOverlay } from './backgrounds/LegibilityOverlay';

/**
 * Background — the original high-resolution gradient image, plus the shared
 * LegibilityOverlay so text stays readable and the amber accent identity
 * carries across the site. Every page keeps calling <Background /> unchanged.
 */
export const Background = () => {
    return (
        <>
            <ImageBackground />
            <LegibilityOverlay />
        </>
    );
};

export default Background;
