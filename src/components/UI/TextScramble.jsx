import React, { useEffect, useRef, useState } from 'react';

const TextScramble = ({ text, trigger = true, className = '', as: Tag = 'span', ...props }) => {
  const elRef = useRef(null);
  const [displayText, setDisplayText] = useState('');
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  const frameRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!trigger || hasAnimated.current) return;
    hasAnimated.current = true;

    const finalText = text;
    const length = finalText.length;
    let frame = 0;
    const totalFrames = length * 3;

    const update = () => {
      let output = '';
      for (let i = 0; i < length; i++) {
        if (finalText[i] === ' ') {
          output += ' ';
          continue;
        }

        const revealAt = i * 2;
        if (frame > revealAt + 8) {
          output += finalText[i];
        } else if (frame > revealAt) {
          output += chars[Math.floor(Math.random() * chars.length)];
        } else {
          output += ' ';
        }
      }

      setDisplayText(output);
      frame++;

      if (frame <= totalFrames + 10) {
        frameRef.current = requestAnimationFrame(update);
      } else {
        setDisplayText(finalText);
      }
    };

    // Small delay before starting
    const timer = setTimeout(() => {
      frameRef.current = requestAnimationFrame(update);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [trigger, text]);

  return (
    <Tag
      ref={elRef}
      className={className}
      style={{ fontFamily: 'var(--font-mono)', ...props.style }}
      {...props}
    >
      {displayText || (trigger ? '' : text)}
    </Tag>
  );
};

export default TextScramble;
