"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "../../../../../components/ui/Button"; 
import { Input } from "../../../../../components/ui/Input"; 
import { db } from "../../../../../utils/dbconfig";
import { Budgets } from "../../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

function CreateBudget({ Refreshdata }) {
  const [emojiIcon, setEmojiIcon] = useState("☺️");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false); // State to control dialog open/close

  const { user } = useUser();

  const onCreateBudget = async () => {
    if (!name || !amount) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const result = await db
        .insert(Budgets)
        .values({
          name,
          amount: Number(amount),
          createdBy: user?.primaryEmailAddress?.emailAddress,
          icon: emojiIcon,
        })
        .returning({ insertedId: Budgets.id });

      if (result.length > 0) {
        Refreshdata();
        toast.success(`Budget created successfully!`);
        setOpen(false); // Close the dialog after successful creation
      }
    } catch (error) {
      console.error("Error creating budget:", error);
      toast.error("Failed to create budget. Please try again.");
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div
            className="bg-gray-100 border-muted border-double p-10 rounded-xl items-center flex flex-col border-2 cursor-pointer hover:shadow-2xl"
            onClick={() => setOpen(true)} // Open the dialog on click
          >
            <h2 className="text-3xl">+</h2>
            <h2>Create new Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent className="bg-white rounded-xl">
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-4">
                <div className="relative inline-block">
                  <Button
                    size="lg"
                    className="text-2xl flex items-center justify-center w-11 h-11 bg-gray-200 rounded-2xl"
                    onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                    aria-label="Choose an emoji"
                  >
                    {emojiIcon}
                  </Button>
                  {openEmojiPicker && (
                    <div className="absolute z-50 mt-2">
                      <EmojiPicker
                        onEmojiClick={(e) => {
                          setEmojiIcon(e.emoji);
                          setOpenEmojiPicker(false);
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="mt-3">
                  <label className="text-black font-medium my-2 block">
                    Budget Name:
                  </label>
                  <Input
                    placeholder="e.g. Home decor"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <label className="text-black font-medium my-1 block">
                    Budget Amount:
                  </label>
                  <Input
                    placeholder="e.g. ₹5000"
                    type="number"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <Button
                  disabled={!name || !amount}
                  onClick={onCreateBudget}
                  className="bg-primary mt-4 w-full h-11 rounded-xl"
                >
                  <h2 className="text-white">Create Budget</h2>
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
