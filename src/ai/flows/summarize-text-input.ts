'use server';
/**
 * @fileOverview Text summarization flow that takes text input and returns an AI-powered summary with a word count.
 *
 * - summarizeTextInput - A function that handles the text summarization process.
 * - SummarizeTextInputInput - The input type for the summarizeTextInput function.
 * - SummarizeTextInputOutput - The return type for the summarizeTextInput function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTextInputInputSchema = z.object({
  text: z.string().describe('The text to summarize.'),
});
export type SummarizeTextInputInput = z.infer<typeof SummarizeTextInputInputSchema>;

const SummarizeTextInputOutputSchema = z.object({
  summary: z.string().describe('The AI-powered summary of the text.'),
  wordCount: z.number().describe('The word count of the original text.'),
});
export type SummarizeTextInputOutput = z.infer<typeof SummarizeTextInputOutputSchema>;

export async function summarizeTextInput(input: SummarizeTextInputInput): Promise<SummarizeTextInputOutput> {
  return summarizeTextInputFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeTextInputPrompt',
  input: {schema: SummarizeTextInputInputSchema},
  output: {schema: z.object({ summary: z.string() })},
  prompt: `Your task is to provide a concise summary of the text provided.
Your output must be a JSON object with a single key "summary" containing the summary.

Text: {{{text}}}`,
});

const summarizeTextInputFlow = ai.defineFlow(
  {
    name: 'summarizeTextInputFlow',
    inputSchema: SummarizeTextInputInputSchema,
    outputSchema: SummarizeTextInputOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    const wordCount = input.text.trim().split(/\s+/).length;
    return {
      summary: output!.summary,
      wordCount: wordCount,
    };
  }
);
