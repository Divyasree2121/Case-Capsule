import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const mockSummaries = [
  {
    id: 1,
    name: "Project Proposal.docx",
    date: "2024-07-21 10:30 AM",
    snippet: "The project aims to develop a new AI-powered summarization tool...",
    type: "Document",
  },
  {
    id: 2,
    name: "Text Input",
    date: "2024-07-20 03:45 PM",
    snippet: "Artificial intelligence (AI) is intelligence demonstrated by machines...",
    type: "Text",
  },
  {
    id: 3,
    name: "Research_Paper.pdf",
    date: "2024-07-19 11:00 AM",
    snippet: "This paper presents a novel approach to natural language processing...",
    type: "Document",
  },
];

export default function SummariesPage() {
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
