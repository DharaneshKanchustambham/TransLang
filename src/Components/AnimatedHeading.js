import React, { useEffect, useState } from 'react';
import "./Animate.css"; // Import CSS file for animation

function AnimatedHeading() {
  const text = 'TransLang';
  const [animatedText, setAnimatedText] = useState('');
  const [iterationCount, setIterationCount] = useState(0);
  let maxIterations = 10;
  useEffect(() => {
    let index = 0;
 
    const interval = setInterval(() => {
      setAnimatedText(animatedText => {
        const nextText = animatedText + text[index];
        index = (index + 1) % text.length;
        if (index === 0) {
          setIterationCount(prevCount => prevCount + 1);
          if (iterationCount === maxIterations - 1) {
            clearInterval(interval); // Stop the animation after reaching the maximum iterations
          }
        }
        return nextText;
      });
    }, 200);
  },);
  return (
    <h1 className="animated-heading">
      {text.split('').map((letter, index) => (
        <span key={index} style={{ animationDelay: `${index *0.1}s`,animationIterationCount: 20}}>{letter}</span>
      ))}
    </h1>
  );
}

export default AnimatedHeading;