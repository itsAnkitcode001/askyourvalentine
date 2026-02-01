import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import Confetti from "./Confetti";

interface ValentineCardProps {
  name: string;
  onReset: () => void;
}

const ValentineCard = ({ name, onReset }: ValentineCardProps) => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [accepted, setAccepted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const moveNoButton = () => {
    const button = noButtonRef.current;
    if (!button) return;

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const buttonRect = button.getBoundingClientRect();
    
    // Calculate safe boundaries (keep button fully visible with padding)
    const padding = 20;
    const maxX = viewportWidth - buttonRect.width - padding * 2;
    const maxY = viewportHeight - buttonRect.height - padding * 2;
    
    // Generate random position within safe bounds
    const newX = padding + Math.random() * maxX;
    const newY = padding + Math.random() * maxY;
    
    setNoButtonPosition({ x: newX, y: newY });
    setAttempts((prev) => prev + 1);
  };

  const getMessage = () => {
    if (attempts === 0) return `${name}, will you be my Valentine? 💕`;
    if (attempts < 3) return `Come on ${name}, you know you want to say yes! 💝`;
    if (attempts < 6) return `${name}, please? 🥺💖`;
    if (attempts < 10) return `I won't give up, ${name}! 💗`;
    return `${name}, there's only one right answer! 💘`;
  };

  if (accepted) {
    return (
      <>
        <Confetti />
        <div className="flex flex-col items-center justify-center gap-8 animate-bounce-in">
          <div className="relative">
            <Heart className="w-32 h-32 text-accent fill-accent animate-pulse-heart" />
          </div>
          <h1 className="font-romantic text-5xl md:text-7xl text-center text-gradient-heart">
            Yay! 🎉
          </h1>
          <p className="text-2xl md:text-3xl text-center text-foreground/80 font-medium">
            I knew you'd say yes, {name}! 💕
          </p>
          <p className="text-xl text-muted-foreground text-center max-w-md">
            You just made me the happiest person in the world! 
            Can't wait to spend Valentine's Day with you! 💝
          </p>
          <div className="flex gap-4 mt-4">
            <Button variant="romantic" size="xl" onClick={onReset}>
              Start Over
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center gap-8 min-h-[400px] w-full">
      <div className="relative">
        <Heart className="w-24 h-24 text-accent fill-accent animate-pulse-heart" />
      </div>
      
      <h1 className="font-romantic text-4xl md:text-6xl text-center text-gradient-heart animate-bounce-in">
        {getMessage()}
      </h1>

      <div className="flex flex-wrap gap-6 items-center justify-center mt-8">
        <Button
          variant="yes"
          onClick={() => setAccepted(true)}
          className="z-10"
        >
          Yes! 💖
        </Button>

        <Button
          ref={noButtonRef}
          variant="no"
          onMouseEnter={moveNoButton}
          onTouchStart={moveNoButton}
          onClick={moveNoButton}
          className="transition-all duration-150"
          style={
            attempts > 0
              ? {
                  position: "fixed",
                  left: noButtonPosition.x,
                  top: noButtonPosition.y,
                  zIndex: 50,
                }
              : undefined
          }
        >
          No 😢
        </Button>
      </div>

      {attempts > 2 && (
        <p className="text-muted-foreground text-sm animate-fade-in mt-4">
          Hint: The "No" button seems to be shy... 😉
        </p>
      )}
    </div>
  );
};

export default ValentineCard;
