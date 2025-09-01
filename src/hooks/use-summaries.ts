'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Summary } from '@/lib/types';

const STORAGE_KEY = 'summaryHistory';

export function useSummaries() {
  const [summaries, setSummaries] = useState<Summary[]>([]);

  useEffect(() => {
    try {
      const savedSummaries = localStorage.getItem(STORAGE_KEY);
      if (savedSummaries) {
        setSummaries(JSON.parse(savedSummaries));
      }
    } catch (error) {
      console.error("Failed to load summaries from local storage", error);
    }
  }, []);

  const addSummary = useCallback((summary: Summary) => {
    try {
      const newSummaries = [summary, ...summaries];
      setSummaries(newSummaries);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSummaries));
    } catch (error) {
        console.error("Failed to save summary to local storage", error);
    }
  }, [summaries]);

  const clearSummaries = useCallback(() => {
    try {
        setSummaries([]);
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error("Failed to clear summaries from local storage", error);
    }
  }, []);

  return { summaries, addSummary, clearSummaries };
}
