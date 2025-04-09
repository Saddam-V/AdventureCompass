import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { insertMessageSchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const formSchema = insertMessageSchema.extend({
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const messageMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      return apiRequest("POST", "/api/messages", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. I'll get back to you soon.",
        variant: "default",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    messageMutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="block font-montserrat text-sm">Your Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your name"
                  className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 focus:outline-none focus:border-accent transition-colors text-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="block font-montserrat text-sm">Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 focus:outline-none focus:border-accent transition-colors text-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="block font-montserrat text-sm">Subject</FormLabel>
              <FormControl>
                <Input
                  placeholder="What is this regarding?"
                  className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 focus:outline-none focus:border-accent transition-colors text-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="block font-montserrat text-sm">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your message..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 focus:outline-none focus:border-accent transition-colors text-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-6 bg-accent hover:bg-opacity-90 text-white font-montserrat tracking-wide transition-all duration-300 transform hover:-translate-y-1 rounded"
        >
          {isSubmitting ? "Sending Message..." : "Send Message"}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
