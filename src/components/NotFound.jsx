import React from "react";
import { Link } from "react-router-dom";
import TrendLoopLogo from "./TrendLoopLogo";
import GridPattern from "./ui/GridPattern";

function NotFound() {
  return (
    <main className="relative min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Accent backdrop */}
      <GridPattern squares={[[3, 2], [24, 10]]} className="opacity-30" />
      <div className="absolute inset-0 -z-0">
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-2xl bg-accent/10 blur-2xl" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-2xl bg-orange-500/10 blur-2xl" />
      </div>

      {/* Content card */}
      <div className="relative z-10 w-full max-w-xl text-center">
        <div className="mb-8 flex justify-center">
          <TrendLoopLogo />
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground bg-card/60 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-orange-500" />
          ERROR 404
        </div>

        <h1 className="mt-4 text-5xl sm:text-6xl font-semibold tracking-tight">
          <span className="bg-gradient-orange bg-clip-text text-transparent">Page not found</span>
        </h1>
        <p className="mt-4 text-muted-foreground">
          The page you’re looking for doesn’t exist or was moved.
        </p>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium shadow-lg shadow-orange-500/20 hover:opacity-90 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
