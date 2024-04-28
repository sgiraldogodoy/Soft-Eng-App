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
import { trpc } from "@/utils/trpc.ts";
import { toast } from "sonner";

const formSchema = z.object({
  fullName: z.string(),
  dob: z.string().date(),
  documentIdNumber: z.string(),
});

interface Props {
  onOpenChange: (open: boolean) => void;
}

export default function CheckInForm({ onOpenChange }: Props) {
  const appointmentQuery = trpc.appointment.getByCheckIn;
  const checkIn = trpc.appointment.updateOne.useMutation();
  const utils = trpc.useUtils();
  const form = useForm<z.input<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = useCallback(
    async (data: z.input<typeof formSchema>) => {
      const appointments = await appointmentQuery.useQuery({
        documentId: data.documentIdNumber,
        dob: data.dob,
        name: data.fullName,
      });

      const today = new Date();
      if (appointments.data) {
        const appointment = appointments.data.filter((appointment) => {
          return (
            new Date(appointment.appointmentTime) >= today &&
            !appointment.checkedIn
          );
        });
        if (appointment.length > 1) {
          //get earliest appointment
          appointment.sort(
            (a, b) =>
              new Date(a.appointmentTime).getTime() -
              new Date(b.appointmentTime).getTime(),
          );
          const appointmentId = appointment[0].id;
          const checkInToAppointment = checkIn.mutateAsync(
            {
              id: appointmentId,
              data: {
                checkedIn: true,
              },
            },
            {
              onSuccess: () => {
                utils.appointment.getAll.invalidate();
              },
            },
          );

          toast.promise(checkInToAppointment, {
            success: "Successfully saved to the database.",
            loading: "Saving patient request to the database.",
            error: "Error saving to database.",
          });

          try {
            await checkInToAppointment;
            form.reset();
          } catch {
            console.error("Error :(");
          }
        } else {
          console.error("No appointments found.");
        }
      }

      console.log(data);
    },
    [appointmentQuery, checkIn, utils, form],
  );

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
