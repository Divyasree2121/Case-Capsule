'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Logo } from '@/components/logo';

export function AuthForm() {
  const router = useRouter();

  const handleAuthAction = () => {
    // In a real application, you would handle authentication here.
    // For this mock, we'll just redirect to the app.
    router.push('/app');
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Logo className="h-16 w-16" />
      <h1 className="font-headline text-4xl text-foreground">Welcome to SummarizeIt</h1>
      <Tabs defaultValue="signin" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-signin">Email</Label>
                <Input id="email-signin" type="email" placeholder="m@example.com" autoComplete="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signin">Password</Label>
                <Input id="password-signin" type="password" autoComplete="new-password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleAuthAction}>
                Sign In
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Create a new account to start summarizing.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="email-signup">Email</Label>
                <Input id="email-signup" type="email" placeholder="m@example.com" autoComplete="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signup">Password</Label>
                <Input id="password-signup" type="password" autoComplete="new-password" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="password-confirm">Confirm Password</Label>
                <Input id="password-confirm" type="password" autoComplete="new-password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleAuthAction}>
                Create Account
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
