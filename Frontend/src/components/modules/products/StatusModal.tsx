/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from "react";
import { changeProductStatus } from "@/services/products";

const StatusModal = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);

  const form = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const status = data.status as string;

    try {
      const res = await changeProductStatus(id, status);

      if (res.success) {
        toast.success(res.message);
        setOpen(false);
      } else {
        toast.error(res.message);
        setOpen(false);
      }
    } catch (error: any) {
      return Error(error);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={"sm"}
          className="bg-[#1575B9] hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg"
        >
          Status
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-gray-800 w-[22rem] font-madimi">
        <DialogHeader>
          <DialogTitle>Are you sure change the status?</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-5"
          >
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Change status" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-200 font-madimi">
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="sold">Sold</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              size={"sm"}
              type="submit"
              className="w-full bg-black text-white hover:bg-black/80 hover:cursor-pointer"
            >
              Update
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default StatusModal;
