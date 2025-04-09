import { useEffect, useState, useCallback, useRef } from "react";

interface Position {
  x: number;
  y: number;
}

interface MagneticTarget {
  element: Element;
  rect: DOMRect;
  center: { x: number; y: number };
}

const CustomCursor = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<Element | null>(null);
  const [cursorText, setCursorText] = useState("");
  const [isStuck, setIsStuck] = useState(false);
  const magneticTargets = useRef<MagneticTarget[]>([]);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  // For smooth animations
  const positionRef = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  const animateDotPosition = useCallback(() => {
    if (!dotRef.current || !ringRef.current) return;
    
    // Calculate the distance between current cursor position and target
    const dx = positionRef.current.x - parseFloat(dotRef.current.style.left || '0');
    const dy = positionRef.current.y - parseFloat(dotRef.current.style.top || '0');
    
    // Dot moves faster (more responsive) than ring
    dotRef.current.style.left = `${parseFloat(dotRef.current.style.left || '0') + dx * 0.2}px`;
    dotRef.current.style.top = `${parseFloat(dotRef.current.style.top || '0') + dy * 0.2}px`;
    
    ringRef.current.style.left = `${parseFloat(ringRef.current.style.left || '0') + dx * 0.1}px`;
    ringRef.current.style.top = `${parseFloat(ringRef.current.style.top || '0') + dy * 0.1}px`;
    
    requestRef.current = requestAnimationFrame(animateDotPosition);
  }, []);

  const startAnimation = useCallback(() => {
    if (requestRef.current === null) {
      requestRef.current = requestAnimationFrame(animateDotPosition);
    }
  }, [animateDotPosition]);

  const stopAnimation = useCallback(() => {
    if (requestRef.current !== null) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
  }, []);

  const checkMagneticTargets = useCallback((mouseX: number, mouseY: number) => {
    if (isStuck) return;

    for (const target of magneticTargets.current) {
      const { rect, element, center } = target;
      
      // Check if cursor is within magnetic range (slightly larger than the element itself)
      const magneticRange = 40; // pixels
      if (
        mouseX >= rect.left - magneticRange &&
        mouseX <= rect.right + magneticRange &&
        mouseY >= rect.top - magneticRange &&
        mouseY <= rect.bottom + magneticRange
      ) {
        // Calculate magnetic pull strength based on distance from center
        const distX = mouseX - center.x;
        const distY = mouseY - center.y;
        const distance = Math.sqrt(distX * distX + distY * distY);
        const pull = 1 - Math.min(1, distance / (magneticRange * 2));
        
        // Apply magnetic pull to cursor position
        const pullX = center.x + distX * pull;
        const pullY = center.y + distY * pull;
        
        setPosition({ x: pullX, y: pullY });
        positionRef.current = { x: pullX, y: pullY };
        
        if (!linkHovered) {
          setLinkHovered(true);
          setHoveredElement(element);
          
          // Get any data-cursor-text attribute
          const text = element.getAttribute('data-cursor-text');
          if (text) setCursorText(text);
        }
        
        return;
      }
    }
    
    if (linkHovered && !hoveredElement?.matches(':hover')) {
      setLinkHovered(false);
      setHoveredElement(null);
      setCursorText("");
    }
  }, [linkHovered, isStuck, hoveredElement]);

  const onMouseMove = useCallback((e: MouseEvent) => {
    // Update the position reference for animation
    positionRef.current = { x: e.clientX, y: e.clientY };
    
    // For non-animated properties we can set state directly
    if (!isStuck) {
      setPosition({ x: e.clientX, y: e.clientY });
      checkMagneticTargets(e.clientX, e.clientY);
    }
  }, [checkMagneticTargets, isStuck]);

  const onMouseDown = useCallback(() => {
    setClicked(true);
    // Slight shrinking effect
    if (dotRef.current) {
      dotRef.current.style.transform = 'translate(-50%, -50%) scale(0.8)';
    }
  }, []);

  const onMouseUp = useCallback(() => {
    setClicked(false);
    // Return to normal size
    if (dotRef.current) {
      dotRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  }, []);

  const setupMagneticElements = useCallback(() => {
    // The elements that should have magnetic pull
    const allMagneticElements = document.querySelectorAll('a, button, [role=button], .clickable, .magnetic');
    
    magneticTargets.current = Array.from(allMagneticElements).map(element => {
      const rect = element.getBoundingClientRect();
      return {
        element,
        rect,
        center: {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        }
      };
    });
  }, []);

  useEffect(() => {
    // Initial setup and event listeners
    const onMouseEnter = () => setHidden(false);
    const onMouseLeave = () => setHidden(true);
    
    // Set up magnetic elements, update on scroll and resize
    setupMagneticElements();
    
    const refreshMagneticElements = () => {
      requestAnimationFrame(setupMagneticElements);
    };
    
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchstart", () => {
      // For devices with both touch and mouse support
      if (window.matchMedia('(max-width: 768px)').matches) {
        setHidden(true); // Hide cursor on touch-enabled mobile devices
      }
    });
    window.addEventListener("scroll", refreshMagneticElements);
    window.addEventListener("resize", refreshMagneticElements);
    
    // Set initial cursor position
    if (dotRef.current && ringRef.current) {
      dotRef.current.style.left = '0px';
      dotRef.current.style.top = '0px';
      ringRef.current.style.left = '0px';
      ringRef.current.style.top = '0px';
    }
    
    // Start animation loop
    startAnimation();
    
    // Custom cursor effect for hoverable elements
    const handleLinkHoverEvents = () => {
      document.querySelectorAll("a, button, [role=button], .clickable").forEach(el => {
        el.addEventListener("mouseenter", () => {
          setLinkHovered(true);
          setHoveredElement(el);
          const text = el.getAttribute('data-cursor-text');
          if (text) setCursorText(text);
        });
        
        el.addEventListener("mouseleave", () => {
          setLinkHovered(false);
          setHoveredElement(null);
          setCursorText("");
        });
      });
    };
    
    handleLinkHoverEvents();
    
    // Cleanup all event listeners
    return () => {
      stopAnimation();
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchstart", () => {
        if (window.matchMedia('(max-width: 768px)').matches) {
          setHidden(true);
        }
      });
      window.removeEventListener("scroll", refreshMagneticElements);
      window.removeEventListener("resize", refreshMagneticElements);
    };
  }, [onMouseMove, onMouseDown, onMouseUp, setupMagneticElements, startAnimation, stopAnimation]);

  const cursorClasses = `custom-cursor ${clicked ? "clicked" : ""} ${
    linkHovered ? "link-hovered" : ""
  } ${hidden ? "hidden" : ""}`;

  return (
    <>
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${cursorClasses}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${cursorClasses}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        {cursorText && (
          <div className="custom-cursor-text">{cursorText}</div>
        )}
      </div>
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
        
        .custom-cursor-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          white-space: nowrap;
          font-size: 12px;
          font-weight: bold;
          color: white;
          background-color: var(--accent);
          padding: 4px 8px;
          border-radius: 4px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .custom-cursor-ring.link-hovered .custom-cursor-text {
          opacity: 1;
          margin-top: -40px; /* Position above the cursor */
        }
        
        @media (max-width: 768px) {
          .custom-cursor-dot,
          .custom-cursor-ring {
            display: none;
          }
          
          body {
            cursor: auto;
          }
          
          a, button, [role=button], .clickable, .magnetic {
            cursor: pointer;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* Remove default mobile tap highlight */
            position: relative; /* For positioning the tooltip */
          }
          
          /* Add tap effect for interactive elements on mobile */
          a:active, button:active, [role=button]:active, .clickable:active, .magnetic:active {
            transform: scale(0.97);
            transition: transform 0.2s ease-in-out;
          }
          
          /* Show touch-specific action hints for mobile */
          [data-cursor-text]::before {
            content: attr(data-cursor-text);
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%) translateY(5px);
            background-color: var(--accent);
            color: white;
            font-size: 12px;
            padding: 4px 8px;
            border-radius: 4px;
            opacity: 0;
            pointer-events: none;
            white-space: nowrap;
            transition: opacity 0.3s ease, transform 0.3s ease;
            z-index: 1000;
          }
          
          [data-cursor-text]:active::before {
            opacity: 1;
            transform: translateX(-50%) translateY(-8px);
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;