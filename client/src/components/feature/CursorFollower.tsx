import { useState, useEffect, useRef } from "react";

export default function CursorFollower() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  useEffect(() => {
    const animateRing = () => {
      setRingPosition((prev) => {
        const dx = cursorPosition.x - prev.x;
        const dy = cursorPosition.y - prev.y;

        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });

      animationFrameRef.current = requestAnimationFrame(animateRing);
    };

    animationFrameRef.current = requestAnimationFrame(animateRing);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [cursorPosition]);

  return (
    <>
      {isVisible && (
        <>
          {/* Cursor Dot */}
          <div
            className="fixed pointer-events-none z-[9999]"
            style={{
              left: `${cursorPosition.x}px`,
              top: `${cursorPosition.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: "#df6420" }}
            ></div>
          </div>

          {/* Following Ring */}
          <div
            className="fixed pointer-events-none z-[9999]"
            style={{
              left: `${ringPosition.x}px`,
              top: `${ringPosition.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="w-8 h-8 border-2 rounded-full"
              style={{ borderColor: "#df6420" }}
            ></div>
          </div>
        </>
      )}
    </>
  );
}
