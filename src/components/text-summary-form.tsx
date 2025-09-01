'use client';

import { useState, useEffect } from 'react';
import { handleTextSummary } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { SummaryDisplay } from '@/components/summary-display';
import { Loader2 } from 'lucide-react';
import type { SummarizeTextInputOutput } from '@/ai/flows/summarize-text-input';
import { Skeleton } from './ui/skeleton';
import { useSummaries } from '@/hooks/use-summaries';

export function TextSummaryForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SummarizeTextInputOutput | null>(null);
  const { toast } = useToast();
  const { addSummary } = useSummaries();

  useEffect(() => {
    if (result) {
        addSummary({
            id: crypto.randomUUID(),
            name: 'Text Input',
            type: 'Text',
            date: new Date().toISOString(),
            summary: result.summary,
            wordCount: result.wordCount,
        });
    }
  }, [result, addSummary]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const text = formData.get('text') as string;

    const response = await handleTextSummary(text);

    if (response.error) {
      setError(response.error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: response.error,
      });
    } else {
      setResult(response.data);
    }

    setIsLoading(false);
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Enter Text</CardTitle>
          <CardDescription>
            Paste your text below to generate a summary.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full gap-4">
              <Textarea
                name="text"
                placeholder="Type or paste your text here."
                className="min-h-[250px] lg:min-h-[400px]"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Summarize Text
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <div>
        {isLoading && (
          <Card className="shadow-lg">
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        )}
        {result && !isLoading && <SummaryDisplay summary={result.summary} wordCount={result.wordCount} />}
      </div>
    </div>
  );
}
