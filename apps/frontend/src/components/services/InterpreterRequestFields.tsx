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
            <div className="flex gap-2 items-center flex-1">
                <FormField
                    name="data.type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Language Required</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Language"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="French">French</SelectItem>
                                    <SelectItem value="German">German</SelectItem>
                                    <SelectItem value="Spanish">Spanish</SelectItem>
                                    <SelectItem value="Russian">Russian</SelectItem>
                                    <SelectItem value="Ukrainian">Ukrainian</SelectItem>
                                    <SelectItem value="Mandarin">Mandarin</SelectItem>
                                    <SelectItem value="Haitain">Haitian</SelectItem>
                                    <SelectItem value="Vietnamese">Vietnamese</SelectItem>
                                    <SelectItem value="Hindi">Hindi</SelectItem>
                                    <SelectItem value="Italian">Italian</SelectItem>
                                    <SelectItem value="Portuguese">Portuguese</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>What language is Required?</FormDescription>
                        </FormItem>
                    )}
                    />
                <FormField
                    name="data.dateTime"
                    render={({ field }) => (
                        <FormItem className="">
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                                <Input type="datetime-local" {...field} />
                            </FormControl>
                            <FormDescription>
                                What date does is the request needed for?
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </>
    );
};

export default Interpreter;

