"use client";

import { Recipe } from "@/data/recipes";
import { useState, useEffect, useCallback } from "react";

interface Props {
  recipe: Recipe;
  onExit: () => void;
}

export default function CookingMode({ recipe, onExit }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [servingMultiplier, setServingMultiplier] = useState(1);

  const step = recipe.steps[currentStep];
  const totalSteps = recipe.steps.length;

  useEffect(() => {
    if (!timerRunning || timerSeconds === null || timerSeconds <= 0) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev === null || prev <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const startTimer = useCallback(() => {
    if (step.timer) {
      setTimerSeconds(step.timer);
      setTimerRunning(true);
    }
  }, [step.timer]);

  const goToStep = (idx: number) => {
    setCurrentStep(idx);
    setTimerSeconds(null);
    setTimerRunning(false);
  };

  return (
    <div className="min-h-screen bg-stone-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-stone-900/95 backdrop-blur border-b border-stone-700">
        <div className="mx-auto max-w-2xl px-4 py-3 flex items-center justify-between">
          <button
            onClick={onExit}
            className="text-sm text-stone-400 hover:text-white transition cursor-pointer"
          >
            &larr; Exit Cooking Mode
          </button>
          <span className="text-sm text-stone-400">
            {recipe.image} {recipe.name}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-6">
        {/* Serving adjuster */}
        <div className="mb-6 flex items-center justify-center gap-4">
          <span className="text-sm text-stone-400">Servings:</span>
          <button
            onClick={() => setServingMultiplier(Math.max(0.5, servingMultiplier - 0.5))}
            className="h-8 w-8 rounded-full bg-stone-700 hover:bg-stone-600 text-lg cursor-pointer"
          >
            -
          </button>
          <span className="text-lg font-bold text-amber-400">
            {recipe.servings * servingMultiplier}
          </span>
          <button
            onClick={() => setServingMultiplier(servingMultiplier + 0.5)}
            className="h-8 w-8 rounded-full bg-stone-700 hover:bg-stone-600 text-lg cursor-pointer"
          >
            +
          </button>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex gap-1">
            {recipe.steps.map((_, i) => (
              <button
                key={i}
                onClick={() => goToStep(i)}
                className={`h-1.5 flex-1 rounded-full transition cursor-pointer ${
                  i <= currentStep ? "bg-amber-500" : "bg-stone-700"
                }`}
              />
            ))}
          </div>
          <p className="mt-2 text-center text-sm text-stone-500">
            Step {currentStep + 1} of {totalSteps}
          </p>
        </div>

        {/* Current step */}
        <div className="rounded-2xl bg-stone-800 p-8 text-center">
          <p className="text-xl leading-relaxed font-medium">
            {step.instruction}
          </p>

          {/* Timer */}
          {step.timer && (
            <div className="mt-6">
              {timerSeconds !== null && timerSeconds >= 0 ? (
                <div>
                  <div
                    className={`text-5xl font-mono font-bold ${
                      timerSeconds === 0 ? "text-green-400 animate-pulse" : "text-amber-400"
                    }`}
                  >
                    {timerSeconds === 0 ? "Done!" : formatTime(timerSeconds)}
                  </div>
                  <div className="mt-3 flex justify-center gap-3">
                    {timerSeconds > 0 && (
                      <button
                        onClick={() => setTimerRunning(!timerRunning)}
                        className="rounded-full bg-amber-600 px-5 py-2 text-sm font-semibold hover:bg-amber-500 transition cursor-pointer"
                      >
                        {timerRunning ? "Pause" : "Resume"}
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setTimerSeconds(null);
                        setTimerRunning(false);
                      }}
                      className="rounded-full bg-stone-700 px-5 py-2 text-sm hover:bg-stone-600 transition cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={startTimer}
                  className="rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold hover:bg-amber-500 transition cursor-pointer"
                >
                  Start Timer ({formatTime(step.timer)})
                </button>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => goToStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="rounded-xl bg-stone-800 px-6 py-3 text-sm font-semibold hover:bg-stone-700 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            Previous
          </button>
          {currentStep < totalSteps - 1 ? (
            <button
              onClick={() => goToStep(currentStep + 1)}
              className="rounded-xl bg-amber-600 px-6 py-3 text-sm font-semibold hover:bg-amber-500 transition cursor-pointer"
            >
              Next Step &rarr;
            </button>
          ) : (
            <button
              onClick={onExit}
              className="rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold hover:bg-green-500 transition cursor-pointer"
            >
              Done Cooking!
            </button>
          )}
        </div>

        {/* Ingredient reference */}
        <details className="mt-8">
          <summary className="cursor-pointer text-sm text-stone-400 hover:text-stone-300 transition">
            View ingredients ({servingMultiplier !== 1 ? "adjusted" : "original"})
          </summary>
          <ul className="mt-3 space-y-1">
            {recipe.ingredients.map((ing) => (
              <li
                key={ing.name}
                className={`text-sm ${
                  ing.optional ? "text-stone-500 italic" : "text-stone-300"
                }`}
              >
                {ing.amount}
                {servingMultiplier !== 1 ? ` (×${servingMultiplier})` : ""} — {ing.name}
                {ing.optional ? " (optional)" : ""}
              </li>
            ))}
          </ul>
        </details>

        {/* All steps overview */}
        <details className="mt-4 mb-12">
          <summary className="cursor-pointer text-sm text-stone-400 hover:text-stone-300 transition">
            View all steps
          </summary>
          <ol className="mt-3 space-y-3">
            {recipe.steps.map((s, i) => (
              <li
                key={i}
                className={`text-sm cursor-pointer p-2 rounded-lg transition ${
                  i === currentStep
                    ? "bg-amber-900/30 text-amber-300 font-medium"
                    : i < currentStep
                    ? "text-stone-500 line-through"
                    : "text-stone-400"
                }`}
                onClick={() => goToStep(i)}
              >
                <span className="font-mono text-xs mr-2">{i + 1}.</span>
                {s.instruction}
                {s.timer && (
                  <span className="ml-2 text-xs text-stone-500">
                    ({formatTime(s.timer)})
                  </span>
                )}
              </li>
            ))}
          </ol>
        </details>
      </div>
    </div>
  );
}
