import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface ConfettiPiece {
  id: number;
  left: string;
  delay: number;
  duration: number;
  color: string;
  size: number;
  type: "heart" | "circle" | "square";
}

const Confetti = () => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const colors = [
      "hsl(350, 80%, 60%)",
      "hsl(0, 75%, 55%)",
      "hsl(350, 80%, 75%)",
      "hsl(40, 90%, 65%)",
      "hsl(350, 60%, 85%)",
    ];

    const newPieces: ConfettiPiece[] = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 8 + Math.random() * 16,
      type: ["heart", "circle", "square"][Math.floor(Math.random() * 3)] as "heart" | "circle" | "square",
    }));

    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: piece.left,
            top: "-20px",
            animation: `confetti-fall ${piece.duration}s linear ${piece.delay}s forwards`,
          }}
        >
          {piece.type === "heart" ? (
            <Heart
              style={{
                width: piece.size,
                height: piece.size,
                color: piece.color,
                fill: piece.color,
              }}
            />
          ) : piece.type === "circle" ? (
            <div
              className="rounded-full"
              style={{
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
              }}
            />
          ) : (
            <div
              style={{
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Confetti;
