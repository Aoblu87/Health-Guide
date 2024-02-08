import { RefObject, useEffect, useLayoutEffect } from "react";

const useAutoScrollToBottom = <T extends HTMLElement>(
  ref: RefObject<T>,
  dependencies: any[]
) => {
  // Immediate scroll to the bottom whenever dependencies change
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [ref, dependencies]);

  // Conditional scroll based on user's position
  useEffect(() => {
    const scrollToEnd = () => {
      if (ref.current) {
        const { scrollTop, scrollHeight, clientHeight } = ref.current;
        // Check if the user is near the bottom
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 100;

        if (isAtBottom) {
          ref.current.scrollTop = scrollHeight;
        }
      }
    };

    // Delay the scroll until the next paint cycle
    const animationFrameId = requestAnimationFrame(scrollToEnd);

    // Cancel the animation frame when the component unmounts or before the effect is re-executed
    return () => cancelAnimationFrame(animationFrameId);
  }, [ref, dependencies]);
};

export default useAutoScrollToBottom;
