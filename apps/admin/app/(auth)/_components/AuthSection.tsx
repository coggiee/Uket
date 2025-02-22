"use client";

import React from "react";
import { cn } from "@ui/lib/utils";
import { Input } from "@ui/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/ui/form";
import { Button } from "@ui/components/ui/button";

import { useLoginForm } from "@/hooks/useLoginForm";

function AuthSection() {
  const { form, onSubmit, error } = useLoginForm();

  return (
    <section className={cn("mt-12 flex grow flex-col gap-11")}>
      <main className="flex flex-col gap-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-3 w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid w-full items-center gap-1.5 md:w-full">
                    <FormLabel className="text-[#5E5E6E]">ID</FormLabel>
                    <FormControl>
                      <Input id="id" placeholder="아이디" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid w-full items-center gap-1.5 md:w-full">
                    <FormLabel className="text-[#5E5E6E]">PW</FormLabel>
                    <FormControl>
                      <Input
                        id="pw"
                        type="password"
                        placeholder="비밀번호"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <p className="h-5 text-center text-sm text-[#EF4444] sm:text-left">
                {error && <span>{error}</span>}
              </p>
              <Button
                type="submit"
                className="bg-brand hover:bg-brandHover w-full rounded-lg py-6 text-base md:min-w-80"
              >
                로그인
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </section>
  );
}

export default AuthSection;
