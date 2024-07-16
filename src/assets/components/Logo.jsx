import React, { useState, useEffect } from 'react';
import Svg1 from './logo/LogoSVG1';
import Svg2 from './logo/LogoSVG2';
import Svg3 from './logo/LogoSVG3';
import Svg4 from './logo/LogoSVG4';

const Logo = () => {
    const [activeSvg, setActiveSvg] = useState(0);
    const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
    const svgComponents = [<Svg1 />, <Svg2 />, <Svg3 />, <Svg4 />];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSvg((prev) => {
                let nextIndex = prev + direction;
                if (nextIndex >= svgComponents.length) {
                    nextIndex = svgComponents.length - 2;
                    setDirection(-1);
                } else if (nextIndex < 0) {
                    nextIndex = 1;
                    setDirection(1);
                }
                return nextIndex;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [direction, svgComponents.length]);

    return (
        <div className='logo'>
            {svgComponents.map((SvgComponent, index) => (
                <div
                    key={index}
                    style={{
                        display: index === activeSvg ? 'block' : 'none',
                        transition: 'opacity 0.5s',
                        opacity: index === activeSvg ? 1 : 0,
                    }}
                >
                    {SvgComponent}
                </div>
            ))}
        </div>
    );
};

export default Logo;