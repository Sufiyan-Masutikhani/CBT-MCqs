"use client"

import axios from "axios";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
    Form,
    FormField,
    FormControl,
    FormDescription,
    FormLabel,
    FormMessage,
    FormItem
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required."
    }),
});

const CreatePage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            title: ""
        },
    });

    const {isSubmitting, isValid} = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) =>{
        try
        {
            const response = await axios.post("/api/course", values);
            router.push('/teacher/courses/${response.data.id}');

        }catch{
            toast.error("Something went wrong.");
        }
    }

    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
                <h1 className="text-2xl font-bold">
                    Name Your Course
                </h1>
                <p>
                    what would like to call your course? don&apos;t be afraid to be creative!
                </p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} 
                        className="space-y-8 mt-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Course Title</FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled={isSubmitting}
                                            placeholder="e.g '8th Sem'"
                                            {...field}
                                        />
                                     </FormControl>
                                     <FormDescription>
                                         What would you like to teach in your course?
                                     </FormDescription>
                                     <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div>
                            <Link href="/">
                                <Button 
                                    type="button" 
                                    variant="ghost"
                                >
                                    Cancel
                                </Button>
                            </Link>
                            <Button 
                                type="submit" 
                                disabled={!isValid || isSubmitting}
                            >
                                Countinue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
 

export default CreatePage;