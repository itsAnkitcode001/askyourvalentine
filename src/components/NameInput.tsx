import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Heart } from "lucide-react";

interface NameInputProps {
  onSubmit: (name: string) => void;
}

const NameInput = ({ onSubmit }: NameInputProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 animate-fade-in">
      <div className="relative">
        <Heart className="w-20 h-20 text-accent fill-accent animate-pulse-heart" />
      </div>
      
      <h1 className="font-romantic text-5xl md:text-7xl text-center text-gradient-heart">
        I have something to ask...
      </h1>
      
      <p className="text-lg md:text-xl text-muted-foreground text-center max-w-md">
        But first, I need to know who I'm asking! 💕
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
        <Input
          type="text"
          placeholder="Enter her name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-center text-lg h-14 rounded-full border-2 border-primary/30 focus:border-primary bg-card shadow-romantic placeholder:text-muted-foreground/50"
        />
        <Button
          type="submit"
          variant="romantic"
          size="xl"
          disabled={!name.trim()}
          className="rounded-full"
        >
          Continue 💝
        </Button>
      </form>
    </div>
  );
};

export default NameInput;
