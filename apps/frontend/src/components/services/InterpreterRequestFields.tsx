import { z } from "zod";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";

import { Input } from "@/components/ui/input.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx";

export const ITRequestSchema = z.object({
    type: z.literal("Interpreter"),
    issueType: z.string(),
    errorCodes: z.string(),
});

const Interpreter = () => {
    return (
        <>
            <div className="flex flex-col gap-2">
                <FormField
                    name="data.recipientName"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel></FormLabel>
                        </FormItem>
                    )}
                />
            </div>
        </>
    );
};

