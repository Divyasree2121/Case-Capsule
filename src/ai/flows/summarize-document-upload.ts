'use server';
/**
 * @fileOverview Document summarization flow using Genkit.
 *
 * - summarizeDocument - A function that accepts a document and returns a summary.
 * - SummarizeDocumentInput - The input type for the summarizeDocument function.
 * - SummarizeDocumentOutput - The return type for the summarizeDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { TextLoader } from "langchain/document_loaders/fs/text";

const SummarizeDocumentInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      "A document (PDF, DOC, or TXT) as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SummarizeDocumentInput = z.infer<typeof SummarizeDocumentInputSchema>;

const SummarizeDocumentOutputSchema = z.object({
  summary: z.string().describe('The AI-generated summary of the document.'),
  wordCount: z.number().describe('The word count of the original document.'),
});
export type SummarizeDocumentOutput = z.infer<typeof SummarizeDocumentOutputSchema>;

async function getDocumentContent(documentDataUri: string): Promise<string> {
  const parts = documentDataUri.split(',');
  const mimeType = parts[0].split(':')[1].split(';')[0];
  const base64Data = parts[1];
  const buffer = Buffer.from(base64Data, 'base64');
  const blob = new Blob([buffer]);

  let loader;
  switch (mimeType) {
    case 'application/pdf':
      loader = new PDFLoader(blob);
      break;
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      loader = new DocxLoader(blob);
      break;
    case 'text/plain':
      loader = new TextLoader(blob);
      break;
    default:
      throw new Error(`Unsupported MIME type: ${mimeType}`);
  }
  const docs = await loader.load();
  return docs.map((doc) => doc.pageContent).join('\n');
}

export async function summarizeDocument(input: SummarizeDocumentInput): Promise<SummarizeDocumentOutput> {
  return summarizeDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeDocumentPrompt',
  input: {schema: z.object({
      documentDataUri: SummarizeDocumentInputSchema.shape.documentDataUri,
      documentContent: z.string(),
  })},
  output: {schema: z.object({ summary: SummarizeDocumentOutputSchema.shape.summary })},
  prompt: `You are a world-class summarization expert.

  Summarize the following document.
  Document: {{{documentContent}}}
  `,
});

const summarizeDocumentFlow = ai.defineFlow(
  {
    name: 'summarizeDocumentFlow',
    inputSchema: SummarizeDocumentInputSchema,
    outputSchema: SummarizeDocumentOutputSchema,
  },
  async input => {
    const documentContent = await getDocumentContent(input.documentDataUri);
    const {output} = await prompt({
      ...input,
      documentContent,
    });

    // Count words in the original document content
    const wordCount = documentContent.trim().split(/\s+/).length;

    return {
      summary: output!.summary,
      wordCount,
    };
  }
);
