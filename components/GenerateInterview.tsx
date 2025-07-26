"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormField as ShadcnFormField } from "@/components/ui/form";
import FormField from "@/components/FormField";
import { useEffect, useState } from "react";
import axios from 'axios'
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from '@tanstack/react-query';

const generateInterviewSchema = z.object({
    jobDescription: z
        .string()
        .min(50, "Enter at least 50 wrods content with role, type, level, tech stack.")
        .refine(
            (val) => val.trim().split(/\s+/).length >= 50,
            { message: "Enter at least 50 wrods content with role, type, level, tech stack." }
        ),
});

interface GenerateInterviewForm {
    userId?: string;
}

const GenerateInterviewForm = ({ userId }: GenerateInterviewForm) => {

    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof generateInterviewSchema>>({
        resolver: zodResolver(generateInterviewSchema),
        defaultValues: {
            jobDescription: "",
        },
    });
    const { errors } = form.formState;

    async function onSubmit(values: z.infer<typeof generateInterviewSchema>) {
        setLoading(true);
        // Handle your submit logic here (e.g., send to API)
        try {
            const { jobDescription } = values
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jd/generate`, { jobDescription, userId })

            toast.success("Interview Generated Successfully using Job Description!")

            // Invalidate both interview queries to refresh the data
            queryClient.invalidateQueries({ queryKey: ['interviews', userId] });
            queryClient.invalidateQueries({ queryKey: ['latest-interviews', userId] });

            form.reset();
            redirect('/')

        } catch (error) {
            setLoading(false);
            console.error("ERROR while generating interview using JD:", error)
        }
    }
    // Show toast on validation error
    useEffect(() => {
        if (errors.jobDescription) {
            toast.error(errors.jobDescription.message);
        }
    }, [errors.jobDescription]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
