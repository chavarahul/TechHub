import React, { useEffect, useState } from 'react';

const TypingEffect = ({ message, speed }:any) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentCharacter = 0;

    const typeNextCharacter = () => {
      if (currentCharacter < message.length) {
        setDisplayText(prevText => prevText + message[currentCharacter]);
        currentCharacter++;
        setTimeout(typeNextCharacter, speed);
      }
    };

    typeNextCharacter();

    return () => {
    };
  }, [message, speed]);

  return <>{displayText}</>;
};

export default TypingEffect;
