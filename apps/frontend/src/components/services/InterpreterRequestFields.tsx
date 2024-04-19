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

const Interpreter = () => {
    return (
        <>
            <div className="flex flex-col gap-2">
                <FormField
                    name="data.recipientName"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Recipient</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>Who shall receive the service.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </>
    );
};

