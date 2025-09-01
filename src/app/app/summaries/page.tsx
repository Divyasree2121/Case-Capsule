'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const mockSummaries = [
  {
    id: 1,
    name: 'Project Proposal.docx',
    date: '2024-07-21 10:30 AM',
    snippet: 'The project aims to develop a new AI-powered summarization tool...',
    type: 'Document',
  },
  {
    id: 2,
    name: 'Text Input',
    date: '2024-07-20 03:45 PM',
    snippet: 'Artificial intelligence (AI) is intelligence demonstrated by machines...',
    type: 'Text',
  },
  {
    id: 3,
    name: 'Research_Paper.pdf',
    date: '2024-07-19 11:00 AM',
    snippet: 'This paper presents a novel approach to natural language processing...',
    type: 'Document',
  },
];

const SUPER_SECRET_PASSWORD = 'password';

export default function SummariesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SUPER_SECRET_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
        <div className="flex h-full items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lock /> Secure Area
                    </CardTitle>
                    <CardDescription>
                        Please enter the password to view the summary history.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter password..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                            {error && <p className="text-sm text-destructive">{error}</p>}
                        </div>
                        <Button type="submit" className="w-full">
                            Unlock History
                        </Button>
                    </form>
                    <p className="mt-4 text-center text-xs text-muted-foreground">
                        (Hint: the password is `password`)
                    </p>
                </CardContent>
            </Card>
        </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-4xl">Summary History</h1>
        <p className="text-muted-foreground">
          Review and manage your past summaries.
        </p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Feature Demonstration</AlertTitle>
        <AlertDescription>
          This is a mock-up of the summary history page. In a full application,
          your summaries would be securely saved and listed here.
        </AlertDescription>
      </Alert>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Summary Snippet</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockSummaries.map((summary) => (
              <TableRow key={summary.id}>
                <TableCell className="font-medium">{summary.name}</TableCell>
                <TableCell>
                  <Badge variant={summary.type === 'Document' ? 'default' : 'secondary'}>
                    {summary.type}
                  </Badge>
                </TableCell>
                <TableCell>{summary.date}</TableCell>
                <TableCell className="text-muted-foreground">{summary.snippet}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
