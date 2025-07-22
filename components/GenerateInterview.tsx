"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormField as ShadcnFormField } from "@/components/ui/form";
import FormField from "@/components/FormField";
import { useState } from "react";

const generateInterviewSchema = z.object({
    jobDescription: z.string().min(10, "Job description must be at least 5-10 sentences. For accuracy input Role, Type, level, techstack,number of questions"),
});

const GenerateInterviewForm = () => {
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof generateInterviewSchema>>({
        resolver: zodResolver(generateInterviewSchema),
        defaultValues: {
            jobDescription: "",
        },
    });

    async function onSubmit(values: z.infer<typeof generateInterviewSchema>) {
        setLoading(true);
        // Handle your submit logic here (e.g., send to API)
        alert("Generating interview for: " + values.jobDescription);
        setLoading(false);
        form.reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="jobDescription"
                    label=""
                    as="textarea"
                    placeholder="Enter the job description below, and we'll instantly generate a tailored interview for you."
                    className="input min-h-[100px] w-full"
                    disabled={loading}
                />
                <Button type="submit" disabled={loading} className="btn-primary max-sm:w-full">
                    {loading ? "Generating..." : "Generate Interview"}
                </Button>
            </form>
        </Form>
    );
};

export default GenerateInterviewForm;
