"use client";

import { FormEvent, useState } from "react";
import { Bot, Send, ShieldCheck } from "lucide-react";
import { answerFromLocalData } from "@/lib/assistant";
import type { AssistantAnswer } from "@/types/portfolio";

const starterQuestions = [
  "What version is ChiaOS?",
  "What projects has Chia built?",
  "What skills does Chia have?",
  "How can I contact Chia?",
];

export function AskChiaOS() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<AssistantAnswer>(() =>
    answerFromLocalData("who is chia")
  );

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAnswer(answerFromLocalData(question));
  }

  return (
    <section
      id="ask"
      data-system-section
      className="system-section px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="min-w-0">
          <p className="font-code text-sm uppercase text-[#00D9FF]">ask chiaos</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-[#F8FAFC] sm:text-5xl">
            Local answers from local data.
          </h2>
          <p className="mt-4 text-[#AAB4C0]">
            The assistant uses the profile, mission, skill, education, experience,
            build log, and roadmap data already inside this site.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {starterQuestions.map((starter) => (
              <button
                key={starter}
                type="button"
                onClick={() => {
                  setQuestion(starter);
                  setAnswer(answerFromLocalData(starter));
                }}
                className="rounded-full border border-white/12 bg-[#101624]/60 px-3 py-2 text-sm text-[#F8FAFC] transition hover:border-[#00D9FF]/50"
              >
                {starter}
              </button>
            ))}
          </div>
        </div>
        <div className="min-w-0 rounded-3xl border border-[#00D9FF]/24 bg-[#0B0F17]/88 p-5 shadow-2xl shadow-[rgba(0,217,255,0.12)]">
          <div className="flex items-center gap-3 border-b border-white/12 pb-4">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#00D9FF]/30 bg-[#00D9FF]/10 text-[#00D9FF]">
              <Bot className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold text-[#F8FAFC]">Ask ChiaOS</h3>
              <p className="text-sm text-[#AAB4C0]">Local profile assistant</p>
            </div>
          </div>
          <form onSubmit={onSubmit} className="mt-5 flex gap-2">
            <label htmlFor="ask-chiaos-question" className="screen-reader-only">
              Ask ChiaOS a question
            </label>
            <input
              id="ask-chiaos-question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask about projects, skills, education, or roadmap"
              className="min-w-0 flex-1 rounded-full border border-white/12 bg-[#05070B]/70 px-4 text-sm text-white outline-none transition placeholder:text-[#71717A] focus:border-[#00D9FF]/60"
            />
            <button
              type="submit"
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFD400] text-[#05070B] transition hover:bg-[#ffe766]"
              aria-label="Ask ChiaOS"
            >
              <Send className="h-4 w-4" aria-hidden />
            </button>
          </form>
          <div className="mt-5 rounded-2xl border border-white/12 bg-[#101624]/72 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-[#FFD400]">
              <ShieldCheck className="h-4 w-4" aria-hidden />
              {answer.confident ? "Matched local data" : "Insufficient local data"}
            </div>
            <p className="mt-3 text-sm leading-6 text-[#AAB4C0]">{answer.answer}</p>
            {answer.sources.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {answer.sources.map((source) => (
                  <span
                    key={source}
                    className="rounded-full border border-[#00D9FF]/22 bg-[#00D9FF]/8 px-3 py-1 text-xs text-[#B7F7FF]"
                  >
                    {source}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
