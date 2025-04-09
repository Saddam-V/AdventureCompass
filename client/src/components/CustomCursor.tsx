import { useEffect, useState } from "react";

interface Position {
  x: number;
  y: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseenter", onMouseEnter);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const handleLinkHoverEvents = () => {
      document.querySelectorAll("a, button, [role=button], .clickable").forEach(el => {
        el.addEventListener("mouseenter", () => setLinkHovered(true));
        el.addEventListener("mouseleave", () => setLinkHovered(false));
      });
    };

    addEventListeners();
    handleLinkHoverEvents();

    return () => {
      removeEventListeners();
    };
  }, []);

  const cursorClasses = `custom-cursor ${clicked ? "clicked" : ""} ${
    linkHovered ? "link-hovered" : ""
  } ${hidden ? "hidden" : ""}`;

  return (
    <>
      <div
        className={`custom-cursor-dot ${cursorClasses}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      <div
        className={`custom-cursor-ring ${cursorClasses}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      <style>{`
        body {
          cursor: none;
        }
        
        a, button, [role=button], .clickable {
          cursor: none;
        }
        
        .custom-cursor-dot {
          pointer-events: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 8px;
          height: 8px;
          background-color: #fff;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          z-index: 9999;
          transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
        }
        
        .custom-cursor-ring {
          pointer-events: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 40px;
          height: 40px;
          border: 2px solid rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          z-index: 9998;
          transition: width 0.2s, height 0.2s, border 0.2s, opacity 0.2s ease;
        }
        
        .custom-cursor-dot.clicked {
          transform: translate(-50%, -50%) scale(0.8);
          background-color: var(--accent);
        }
        
        .custom-cursor-ring.clicked {
          width: 32px;
          height: 32px;
          border-width: 3px;
          border-color: var(--accent);
        }
        
        .custom-cursor-dot.link-hovered {
          background-color: var(--accent);
          transform: translate(-50%, -50%) scale(1.5);
        }
        
        .custom-cursor-ring.link-hovered {
          width: 60px;
          height: 60px;
          border-color: var(--accent);
          border-width: 2px;
          opacity: 0.3;
        }
        
        .custom-cursor-dot.hidden,
        .custom-cursor-ring.hidden {
          opacity: 0;
        }
        
        @media (max-width: 768px) {
          .custom-cursor-dot,
          .custom-cursor-ring {
            display: none;
          }
          
          body {
            cursor: auto;
          }
          
          a, button, [role=button], .clickable {
            cursor: pointer;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;