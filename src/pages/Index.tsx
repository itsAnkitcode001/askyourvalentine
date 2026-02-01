import { useState } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import NameInput from "@/components/NameInput";
import ValentineCard from "@/components/ValentineCard";

const Index = () => {
  const [name, setName] = useState("");
  const [step, setStep] = useState<"input" | "question">("input");

  const handleNameSubmit = (submittedName: string) => {
    setName(submittedName);
    setStep("question");
  };

  const handleReset = () => {
    setName("");
    setStep("input");
  };

  return (
    <div className="min-h-screen gradient-romantic flex items-center justify-center p-6 overflow-hidden relative">
      <FloatingHearts />
      
      <div className="w-full max-w-2xl z-10">
        {step === "input" ? (
          <NameInput onSubmit={handleNameSubmit} />
        ) : (
          <ValentineCard name={name} onReset={handleReset} />
        )}
      </div>
    </div>
  );
};

export default Index;
