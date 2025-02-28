import React, { useState } from "react";
import { Input } from "../../../../../components/ui/Input"; 
import { Button } from "../../../../../components/ui/Button"; 
import { db } from "../../../../../utils/dbconfig";
import { Budgets, Expenses } from "../../../../../utils/schema";
import { toast } from "sonner";

function Addexpense({ budgetid, user , refreshdata}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const addnewexpense = async () => {
    if (!name || !amount) return;

    const result = await db.insert(Expenses).values({
      name,
      amount: parseFloat(amount),
      budgetId: budgetid,
      createdAt: new Date(),
      createdBy: user?.primaryEmailAddress?.emailAddress,
    }).returning({ insertedid: Expenses.id });

    console.log(result);

    if (result) {
      refreshdata()
      toast("New Expense Added..!");
      setName("");  
      setAmount("");
    }
  };

  

  return (
    <div className="p-5 bg-slate-100 rounded-xl border-muted border-2 cursor-pointer hover:shadow-2xl">
      <h2 className="text-black font-bold text-lg">Add Expense</h2>
      <div className="mt-3">
        <label className="text-black font-medium my-1 block">
          Expense Name:
        </label>
        <Input
          placeholder="e.g. room decor"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <label className="text-black font-medium my-1 block">
          Expense Amount:
        </label>
        <Input
          placeholder="e.g. ₹5000"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button 
        disabled={!(name && amount)} 
        onClick={addnewexpense}
        className="bg-primary text-white rounded-xl w-full p-2 mt-3"
      >
        Add New Expense
      </Button>
    </div>
  );
}

export default Addexpense;
