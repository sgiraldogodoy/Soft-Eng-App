import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useForm } from "react-hook-form";
import React, { useCallback } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input.tsx";
import { Link } from "wouter";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  dob: z.string().pipe(
    z.coerce.date().max(new Date(), {
      message: "Date must be in the past.",
    }),
  ),
  documentIdNumber: z.string(),
});

interface Props {
  onOpenChange: (open: boolean) => void;
}

export default function CheckInForm({ onOpenChange }: Props) {
  const form = useForm<z.input<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = useCallback((data: z.input<typeof formSchema>) => {
    console.log(data);
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-between items-center gap-8"
      >
        <div className="w-full flex flex-col gap-8 items-stretch">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col h-full justify-between flex-1">
                <FormLabel>Full Name</FormLabel>
                <Input
                  className="w-full"
                  placeholder="John Appleseed"
                  type="text"
                  {...field}
                />
                <FormDescription>Enter your full legal name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col h-full justify-between flex-1">
                <FormLabel>Date of Birth</FormLabel>
                <Input type="date" {...field} />
                <FormDescription>Enter your date of birth</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="documentIdNumber"
            render={({ field }) => (
              <FormItem className="flex flex-col h-full justify-between flex-1">
                <FormLabel>ID Number</FormLabel>
                <Input placeholder="123456789" type="text" {...field} />
                <FormDescription>
                  Enter your driver&apos;s license or passport number
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex gap-5">
          <Button
            asChild
            className="flex-1 w-full"
            variant="secondary"
            onClick={() => {
              onOpenChange(false);
            }}
          >
            <Link to="/">Back</Link>
          </Button>
          <Button className="flex-1 w-full" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}