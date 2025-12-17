"use client"
import { useEffect, useRef, useState } from "react";

const Textfit = ({ children, maxFontSize = 18, minFontSize = 10 }) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const [fontSize, setFontSize] = useState(maxFontSize);

    useEffect(() => {
        const adjustFontSize = () => {
            if (!containerRef.current || !textRef.current) return;
            let currentFontSize = maxFontSize;
            textRef.current.style.fontSize = `${currentFontSize}px`;

            while (
                textRef.current.scrollWidth > containerRef.current.clientWidth &&
                currentFontSize > minFontSize
            ) {
                currentFontSize -= 1;
                textRef.current.style.fontSize = `${currentFontSize}px`;
            }
            setFontSize(currentFontSize);
        };

        const resizeObserver = new ResizeObserver(adjustFontSize);
        if (containerRef.current) resizeObserver.observe(containerRef.current);

        adjustFontSize();
        window.addEventListener("resize", adjustFontSize);
        return () => {
            window.removeEventListener("resize", adjustFontSize);
            resizeObserver.disconnect();
        };
    }, [children, maxFontSize, minFontSize]);

    return (
        <div ref={containerRef} style={{ width: "100%", display: "flex", justifyContent: "center", overflow: "hidden" }}>
            <span ref={textRef} style={{ fontSize, whiteSpace: "nowrap", lineHeight: 1 }}>
                {children}
            </span>
        </div>
    );
};

export { Textfit };