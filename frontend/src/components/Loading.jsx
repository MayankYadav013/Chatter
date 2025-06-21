import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-800">
      <div className="flex flex-col gap-4 w-60">
        <div className="h-32 w-full rounded-md bg-slate-700 animate-pulse"></div>
        <div className="h-4 w-28 rounded-md bg-slate-700 animate-pulse"></div>
        <div className="h-4 w-full rounded-md bg-slate-700 animate-pulse"></div>
        <div className="h-4 w-full rounded-md bg-slate-700 animate-pulse"></div>
      </div>
    </div>
  );
}

export default Loading;
