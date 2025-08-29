import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextSummaryForm } from "@/components/text-summary-form";
import { DocSummaryForm } from "@/components/doc-summary-form";
import { BookText, FileText } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-4xl">Dashboard</h1>
        <p className="text-muted-foreground">
          Generate summaries from text or documents.
        </p>
      </div>

      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="text">
            <BookText className="mr-2" />
            From Text
          </TabsTrigger>
          <TabsTrigger value="document">
            <FileText className="mr-2" />
            From Document
          </TabsTrigger>
        </TabsList>
        <TabsContent value="text" className="mt-6">
          <TextSummaryForm />
        </TabsContent>
        <TabsContent value="document" className="mt-6">
          <DocSummaryForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
