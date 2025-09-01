'use client';

import type { Summary } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Download, ArrowLeft } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';

interface SummaryDetailsProps {
  summary: Summary;
  onBack: () => void;
}

export function SummaryDetails({ summary, onBack }: SummaryDetailsProps) {
  const handleDownload = () => {
    const blob = new Blob([summary.summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${summary.name.split('.')[0]}_summary.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="mr-2" />
          Back to History
        </Button>
        <h1 className="font-headline text-3xl">{summary.name}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Badge variant={summary.type === 'Document' ? 'default' : 'secondary'}>
                {summary.type}
            </Badge>
            <span>{new Date(summary.date).toLocaleString()}</span>
        </div>
      </div>
      <Card className="shadow-lg flex-grow flex flex-col">
        <CardHeader>
          <CardTitle>Generated Summary</CardTitle>
          <CardDescription>
            Original word count: {summary.wordCount}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <ScrollArea className="h-[400px] lg:h-[500px] w-full rounded-md border p-4">
            <p className="text-sm leading-relaxed">{summary.summary}</p>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <Button onClick={handleDownload} className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Download Summary
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
