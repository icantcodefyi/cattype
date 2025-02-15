import { cn } from "@/lib/utils";
import { MousePointer2 } from "lucide-react";

interface FocusWarningProps {
  isVisible: boolean;
  onClick: () => void;
}

export function FocusWarning({ isVisible, onClick }: FocusWarningProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-background/80 transition-opacity duration-200 cursor-pointer",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={onClick}
    >
      <div className="text-xl font-mono text-primary animate-pulse flex items-center gap-2">
        <MousePointer2 className="inline-block" />
        Click here to focus
      </div>
    </div>
  );
}
