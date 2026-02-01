import { Heart } from "lucide-react";

const FloatingHearts = () => {
  const hearts = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`,
    duration: `${3 + Math.random() * 2}s`,
    size: 16 + Math.random() * 24,
    opacity: 0.1 + Math.random() * 0.2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="absolute text-primary fill-primary animate-float-heart"
          style={{
            left: heart.left,
            top: `${Math.random() * 100}%`,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            width: heart.size,
            height: heart.size,
            opacity: heart.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingHearts;
