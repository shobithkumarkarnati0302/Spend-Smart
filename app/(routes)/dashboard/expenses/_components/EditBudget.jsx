import React, { useState } from "react";
import { db } from "../../../../../utils/dbconfig";
import { Budgets } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

const EditBudget = ({ budget, onClose, refreshData }) => {
  const [name, setName] = useState(budget?.name || "");
  const [amount, setAmount] = useState(budget?.amount || "");

  const handleUpdate = async () => {
    try {
      await db.update(Budgets)
        .set({ name, amount })
        .where(eq(Budgets.id, budget.id));

      toast.success("Budget updated successfully!");
      refreshData();
      onClose(); // Close the modal
    } catch (error) {
      toast.error("Failed to update budget.");
      console.error("Error updating budget:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg border-primary border-4">
        <h2 className="text-lg font-bold">Edit Budget</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mt-2"
          placeholder="Budget Name"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full mt-2"
          placeholder="Budget Amount"
        />
        <div className="flex justify-end mt-4 gap-2">
          <button onClick={onClose} className="bg-gray-500 text-white px-3 py-2 rounded-xl">Cancel</button>
          <button onClick={handleUpdate} className="bg-blue-600 text-white px-3 py-2 rounded-xl">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditBudget;
