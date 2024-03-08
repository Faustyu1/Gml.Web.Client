"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, enumValues } from "@/shared/lib/utils";
import { Icons } from "@/shared/ui/icons";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreateProfileFormSchemaType,
  createProfileSchema,
  GameLoaderOption,
  GameLoaderType,
} from "@/shared/api/contracts";
import { useCreateProfile } from "@/shared/hooks/useProfiles";

interface CreateProfileFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CreateProfileForm = ({ className, ...props }: CreateProfileFormProps) => {
  const { mutateAsync, isPending } = useCreateProfile();

  const form = useForm<CreateProfileFormSchemaType>({
    resolver: zodResolver(createProfileSchema),
  });

  const onSubmit: SubmitHandler<CreateProfileFormSchemaType> = async (
    data: CreateProfileFormSchemaType,
  ) => {
    await mutateAsync(data);
  };

  return (
    <div className={cn("grid gap-4", className)} {...props}>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormItem>
            <FormLabel>Иконка сервера</FormLabel>
            <FormControl>
              <Input placeholder="Выберите иконку сервера" {...form.register("iconBase64")} />
            </FormControl>
            {form.formState.errors.iconBase64 && (
              <FormMessage>{form.formState.errors.iconBase64.message}</FormMessage>
            )}
          </FormItem>

          <FormItem>
            <FormLabel>Введите название сервера</FormLabel>
            <FormControl>
              <Input placeholder="Введите название сервера" {...form.register("name")} />
            </FormControl>
            {form.formState.errors.name && (
              <FormMessage>{form.formState.errors.name.message}</FormMessage>
            )}
          </FormItem>

          <FormItem>
            <FormLabel>Введите описание сервера</FormLabel>
            <FormControl>
              <Textarea placeholder="Введите описание сервера" {...form.register("description")} />
            </FormControl>
            {form.formState.errors.description && (
              <FormMessage>{form.formState.errors.description.message}</FormMessage>
            )}
          </FormItem>

          <div className="flex gap-x-4">
            <Controller
              name="version"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Выберите версию игры</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите игровой загрузчик" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1.5.2">1.5.2</SelectItem>
                        <SelectItem value="1.6.4">1.6.4</SelectItem>
                        <SelectItem value="1.7.10">1.7.10</SelectItem>
                        <SelectItem value="1.12.2">1.12.2</SelectItem>
                        <SelectItem value="1.19.4">1.19.4</SelectItem>
                        <SelectItem value="1.20.1">1.20.1</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {form.formState.errors.version && (
                    <FormMessage>{form.formState.errors.version.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            <Controller
              name="gameLoader"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Выберите игровой загрузчик</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите игровой загрузчик" />
                      </SelectTrigger>
                      <SelectContent>
                        {enumValues(GameLoaderType).map(([loader, value]) => (
                          <SelectItem key={loader} value={String(value)}>
                            {GameLoaderOption[loader as keyof typeof GameLoaderOption]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {form.formState.errors.gameLoader && (
                    <FormMessage>{form.formState.errors.gameLoader.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>

          <Button disabled={isPending}>
            {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Создать профиль
          </Button>
        </form>
      </Form>
    </div>
  );
};
