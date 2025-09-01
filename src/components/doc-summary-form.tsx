'use client';

import { useState, useRef, useEffect } from 'react';
import { handleDocumentSummary } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SummaryDisplay } from '@/components/summary-display';
import { Loader2, UploadCloud, File, X } from 'lucide-react';
import type { SummarizeDocumentOutput } from '@/ai/flows/summarize-document-upload';
import { Skeleton } from './ui/skeleton';
import { useSummaries } from '@/hooks/use-summaries';

export function DocSummaryForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SummarizeDocumentOutput | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dataUri, setDataUri] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { addSummary } = useSummaries();

  useEffect(() => {
    if (result && selectedFile) {
        addSummary({
            id: crypto.randomUUID(),
            name: selectedFile.name,
            type: 'Document',
            date: new Date().toISOString(),
            summary: result.summary,
            wordCount: result.wordCount,
        });
    }
  }, [result, selectedFile, addSummary]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setDataUri(loadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setDataUri('');
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!dataUri) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please select a document to summarize.',
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    const response = await handleDocumentSummary(dataUri);

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
          <CardTitle>Upload Document</CardTitle>
          <CardDescription>
            Select a PDF, DOC, or TXT file to summarize.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex h-[250px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed">
                {!selectedFile ? (
                    <>
                        <UploadCloud className="h-12 w-12 text-muted-foreground" />
                        <p className="mt-4 text-muted-foreground">Drag & drop or click to upload</p>
                        <Input 
                            ref={fileInputRef}
                            id="file-upload" 
                            type="file" 
                            className="sr-only" 
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx,.txt"
                            disabled={isLoading}
                        />
                        <label htmlFor="file-upload" className="mt-2 cursor-pointer text-sm font-medium text-primary hover:underline">
                            Choose a file
                        </label>
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-2 text-center">
                        <File className="h-12 w-12 text-primary"/>
                        <p className="font-medium">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                            {(selectedFile.size / 1024).toFixed(2)} KB
                        </p>
                        <Button variant="ghost" size="icon" className="mt-2" onClick={clearFile} disabled={isLoading}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>

            <Button type="submit" disabled={isLoading || !selectedFile} className="w-full">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Summarize Document
            </Button>
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
