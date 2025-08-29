'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Download } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface SummaryDisplayProps {
  summary: string;
  wordCount: number;
}

export function SummaryDisplay({ summary, wordCount }: SummaryDisplayProps) {

  const handleDownload = () => {
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'summary.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="shadow-lg lg:h-full flex flex-col">
      <CardHeader>
        <CardTitle>Generated Summary</CardTitle>
        <CardDescription>
          Original word count: {wordCount}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ScrollArea className="h-[250px] lg:h-[400px] w-full rounded-md border p-4">
            <p className="text-sm leading-relaxed">{summary}</p>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Button onClick={handleDownload} className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download Summary
        </Button>
      </CardFooter>
    </Card>
  );
}
