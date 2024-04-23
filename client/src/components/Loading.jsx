import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="h-96 rounded-lg flex items-center justify-center bg-orange-100/40 animate-pulse">
      <div className="animate-spin">
        <Loader2 size={32} />
      </div>
    </div>
  );
};

export default Loading;
