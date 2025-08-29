'use server';

import { summarizeTextInput, SummarizeTextInputOutput } from '@/ai/flows/summarize-text-input';
import { summarizeDocument, SummarizeDocumentOutput } from '@/ai/flows/summarize-document-upload';

type ActionResponse<T> = {
  data: T | null;
  error: string | null;
};

export async function handleTextSummary(
  text: string
): Promise<ActionResponse<SummarizeTextInputOutput>> {
  if (!text || text.trim().length === 0) {
    return { data: null, error: 'Text cannot be empty.' };
  }
  try {
    const result = await summarizeTextInput({ text });
    return { data: result, error: null };
  } catch (e) {
    console.error(e);
    return { data: null, error: 'Failed to generate summary. Please try again.' };
  }
}

export async function handleDocumentSummary(
  documentDataUri: string
): Promise<ActionResponse<SummarizeDocumentOutput>> {
  if (!documentDataUri) {
    return { data: null, error: 'No document provided.' };
  }
  try {
    const result = await summarizeDocument({ documentDataUri });
    return { data: result, error: null };
  } catch (e) {
    console.error(e);
    return { data: null, error: 'Failed to process document. Please ensure it is a valid PDF, DOC, or TXT file.' };
  }
}
