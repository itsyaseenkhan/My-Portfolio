import React from "react";
import { Button } from "@/components/ui/button";

function SpecialLoadingButton({ content, width }) {
  return (
    <Button
      disabled
      type="button"
      className={`relative flex items-center justify-center gap-2 overflow-hidden ${width ? width : "w-full"} px-6 py-2`}
    >
      <span className="flex items-center gap-2">
        {content}
        <span className="flex space-x-1">
          <span className="h-1.5 w-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0s]"></span>
          <span className="h-1.5 w-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.15s]"></span>
          <span className="h-1.5 w-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.3s]"></span>
        </span>
      </span>
    </Button>
  );
}

export default SpecialLoadingButton;
