/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useId } from 'react';
import './GlassSurface.css';

const GlassSurface = ({
    children,
    width = '100%',
    height = '100%',
    borderRadius = 20,
    borderWidth = 0.07,
    brightness = 50,
    opacity = 0.93,
    blur = 11,
    displace = 0,
    backgroundOpacity = 0,
    saturation = 1,
    distortionScale = -180,
    redOffset = 0,
    greenOffset = 10,
    blueOffset = 20,
    xChannel = 'R',
    yChannel = 'G',
    mixBlendMode = 'difference',
    className = '',
    style = {}
}) => {
    const id = useId();
    const uniqueId = id.replace(/:/g, '-');
    const filterId = `glass-filter-${uniqueId}`;
    const redGradId = `red-grad-${uniqueId}`;
    const blueGradId = `blue-grad-${uniqueId}`;

    const containerRef = useRef(null);
    const feImageRef = useRef(null);
    const redChannelRef = useRef(null);
    const greenChannelRef = useRef(null);
    const blueChannelRef = useRef(null);
    const gaussianBlurRef = useRef(null);

    const generateDisplacementMap = () => {
        if (!containerRef.current) return '';

        const rect = containerRef.current.getBoundingClientRect();
        const actualWidth = rect.width || 400;
        const actualHeight = rect.height || 200;

        if (actualWidth <= 0 || actualHeight <= 0) return '';

        const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);

        const svgContent = `
      <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="rgba(0,0,0,0)"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="rgba(0,0,0,0)"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"></rect>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradId})" />
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}" />
        <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)" />
      </svg>
    `;

        return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
    };

    const updateDisplacementMap = () => {
        if (feImageRef.current && containerRef.current) {
            const map = generateDisplacementMap();
            if (map) {
                feImageRef.current.setAttribute('href', map);
            }
        }
    };

    // ResizeObserver
    useEffect(() => {
        if (!containerRef.current) return;

        // Delay first render slightly to ensure DOM is painted
        const initTimeout = setTimeout(() => {
            updateDisplacementMap();
        }, 50);

        let frameId;
        const resizeObserver = new ResizeObserver(() => {
            cancelAnimationFrame(frameId);
            frameId = requestAnimationFrame(() => {
                updateDisplacementMap();
            });
        });

        resizeObserver.observe(containerRef.current);

        return () => {
            clearTimeout(initTimeout);
            resizeObserver.disconnect();
            cancelAnimationFrame(frameId);
        };
    }, []);

    // Update when visual props change
    useEffect(() => {
        updateDisplacementMap();
    }, [width, height, borderRadius, borderWidth, brightness, opacity, blur, mixBlendMode]);

    // Filter Attribute Updates
    useEffect(() => {
        [
            { ref: redChannelRef, offset: redOffset },
            { ref: greenChannelRef, offset: greenOffset },
            { ref: blueChannelRef, offset: blueOffset }
        ].forEach(({ ref, offset }) => {
            if (ref.current) {
                ref.current.setAttribute('scale', (distortionScale + offset).toString());
                ref.current.setAttribute('xChannelSelector', xChannel);
                ref.current.setAttribute('yChannelSelector', yChannel);
            }
        });

        if (gaussianBlurRef.current) {
            gaussianBlurRef.current.setAttribute('stdDeviation', displace.toString());
        }
    }, [distortionScale, redOffset, greenOffset, blueOffset, xChannel, yChannel, displace]);

    const containerStyle = {
        ...style,
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: `${borderRadius}px`,
        backdropFilter: `url(#${filterId}) saturate(${saturation})`,
        WebkitBackdropFilter: `url(#${filterId}) saturate(${saturation})`,
        background: `rgba(255, 255, 255, ${backgroundOpacity})`,
    };

    return (
        <div
            ref={containerRef}
            className={`glass-surface ${className}`}
            style={containerStyle}
        >
            <svg className="glass-surface__filter" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
                        <feImage ref={feImageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />

                        <feDisplacementMap ref={redChannelRef} in="SourceGraphic" in2="map" id="redchannel" result="dispRed" />
                        <feColorMatrix
                            in="dispRed"
                            type="matrix"
                            values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
                            result="red"
                        />

                        <feDisplacementMap
                            ref={greenChannelRef}
                            in="SourceGraphic"
                            in2="map"
                            id="greenchannel"
                            result="dispGreen"
                        />
                        <feColorMatrix
                            in="dispGreen"
                            type="matrix"
                            values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
                            result="green"
                        />

                        <feDisplacementMap ref={blueChannelRef} in="SourceGraphic" in2="map" id="bluechannel" result="dispBlue" />
                        <feColorMatrix
                            in="dispBlue"
                            type="matrix"
                            values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
                            result="blue"
                        />

                        <feBlend in="red" in2="green" mode="screen" result="rg" />
                        <feBlend in="rg" in2="blue" mode="screen" result="output" />
                        <feGaussianBlur ref={gaussianBlurRef} in="output" stdDeviation="0.7" />
                    </filter>
                </defs>
            </svg>

            <div className="glass-surface__content">{children}</div>
        </div>
    );
};

export default GlassSurface;
