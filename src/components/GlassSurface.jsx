import React from 'react';

const GlassSurface = ({
    children,
    width,
    height,
    borderRadius = 32,
    className = '',
    displace = 0.5,
    distortionScale = 40,
    redOffset = 0,
    greenOffset = 0,
    blueOffset = 0,
    brightness = 105,
    opacity = 0.95,
    mixBlendMode = 'normal'
}) => {
    const filterId = React.useId();

    return (
        <div
            className={`relative group ${className}`}
            style={{
                width: width || 'auto',
                height: height || 'auto',
                borderRadius: `${borderRadius}px`,
                opacity: opacity,
                mixBlendMode: mixBlendMode,
                backdropFilter: `blur(20px) saturate(180%) brightness(${brightness}%)`,
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                boxShadow: `
          0 4px 24px -1px rgba(0, 0, 0, 0.1),
          0 8px 32px 0 rgba(31, 38, 135, 0.15),
          inset 0 0 20px 0 rgba(255, 255, 255, 0.1)
        `,
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
        >
            {/* Liquid Distortion Filter */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <filter id={filterId}>
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency={displace / 50}
                        numOctaves="2"
                        result="noise"
                    >
                        <animate attributeName="baseFrequency" values={`${displace / 50};${displace / 40};${displace / 50}`} dur="10s" repeatCount="indefinite" />
                    </feTurbulence>
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale={distortionScale}
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>
            </svg>

            {/* Surface Shine Layer */}
            <div
                className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
                style={{ borderRadius: `${borderRadius}px` }}
            >
                <div
                    className="absolute inset-[-100%] transition-transform duration-1000 group-hover:duration-500"
                    style={{
                        background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.3) 45%, rgba(255,255,255,0.1) 50%, transparent 55%)',
                        backgroundSize: '200% 200%',
                        animation: 'surface-shine 6s infinite ease-in-out'
                    }}
                />
            </div>

            <div className="w-full h-full relative z-10 flex items-center justify-center">
                {children}
            </div>

            <style>{`
        @keyframes surface-shine {
          0% { transform: translateX(-100%) translateY(-100%); }
          50% { transform: translateX(100%) translateY(100%); }
          100% { transform: translateX(-100%) translateY(-100%); }
        }
      `}</style>
        </div>
    );
};

export default GlassSurface;
