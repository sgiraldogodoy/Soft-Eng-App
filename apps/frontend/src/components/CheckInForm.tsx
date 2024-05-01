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
import React, { useCallback, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input.tsx";
import { Link } from "wouter";
import { trpc } from "@/utils/trpc.ts";
import { toast } from "sonner";
import { DateTime } from "luxon";

const formSchema = z.object({
  fullName: z.string(),
  dob: z.string().date(),
  documentIdNumber: z.string(),
});

interface Props {
  onOpenChange: (open: boolean) => void;
}

export default function CheckInForm({ onOpenChange }: Props) {
  const updateCheckIn = trpc.appointment.updateCheckIn.useMutation();
  const utils = trpc.useUtils();
  const form = useForm<z.input<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      dob: DateTime.now().toISODate(),
      documentIdNumber: "",
    },
  });

  const [success, setSuccess] = useState(false);

  const onSubmit = useCallback(
    //(data: z.input<typeof formSchema>) => {console.log(data);}, []);
    async (data: z.input<typeof formSchema>) => {
      const checkInToAppointment = updateCheckIn.mutateAsync(
        {
          documentId: data.documentIdNumber,
          dob: data.dob,
          name: data.fullName,
        },
        {
          onSuccess: () => {
            utils.appointment.getAll.invalidate();
            setSuccess(true);
          },
        },
      );

      toast.promise(checkInToAppointment, {
        success: (d) =>
          `Checked In to your appointment at: ${DateTime.fromJSDate(d.appointmentTime).toLocaleString(DateTime.TIME_SIMPLE)}`,
        loading: "Checking In.",
        error: "Error checking in.",
      });

      form.reset();
    },
    [updateCheckIn, utils, form],
  );

  if (success) {
    return (
      <div className="w-full">
        <p className="mx-auto text-3xl text-center">Checked In!</p>
        <Button
          onClick={() => {
            onOpenChange(false);
          }}
          className="w-full mt-10"
        >
          Go Home
        </Button>
      </div>
    );
  }

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
                <Input className="w-full" type="text" {...field} />
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
                <Input placeholder="" type="text" {...field} />
                <FormDescription>
                  Enter your driver&apos;s license, SSN or passport number
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
