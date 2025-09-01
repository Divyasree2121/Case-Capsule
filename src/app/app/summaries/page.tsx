'use client';

import { useState } from 'react';
import { useSummaries } from '@/hooks/use-summaries';
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
import { Info, Lock, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { SummaryDetails } from '@/components/summary-details';
import type { Summary } from '@/lib/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const SUPER_SECRET_PASSWORD = 'password';

export default function SummariesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { summaries, clearSummaries } = useSummaries();
  const [selectedSummary, setSelectedSummary] = useState<Summary | null>(null);

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

  if (selectedSummary) {
    return (
      <SummaryDetails
        summary={selectedSummary}
        onBack={() => setSelectedSummary(null)}
      />
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-headline text-4xl">Summary History</h1>
          <p className="text-muted-foreground">
            Review and manage your past summaries.
          </p>
        </div>
        {summaries.length > 0 && (
           <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2" />
                Clear History
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete all your saved summaries. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={clearSummaries}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>


      {summaries.length === 0 ? (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>No Summaries Yet</AlertTitle>
          <AlertDescription>
            Your generated summaries will appear here. Go to the dashboard to create your first one!
          </AlertDescription>
        </Alert>
      ) : (
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
              {summaries.map((summary) => (
                <TableRow
                  key={summary.id}
                  onClick={() => setSelectedSummary(summary)}
                  className="cursor-pointer"
                >
                  <TableCell className="font-medium">{summary.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        summary.type === 'Document' ? 'default' : 'secondary'
                      }
                    >
                      {summary.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(summary.date).toLocaleString()}</TableCell>
                  <TableCell className="max-w-[300px] truncate text-muted-foreground">
                    {summary.summary}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
