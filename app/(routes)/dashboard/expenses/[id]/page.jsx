"use client";
import { db } from "../../../../../utils/dbconfig";
import { Budgets, Expenses } from "../../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, getTableColumns } from "drizzle-orm";
import { sql, eq, and } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import Budgetitem from "../../budgets/_components/Budgetitem";
import Addexpense from "../_components/addexpense";
import ExpenselistTable from "../_components/ExpenseListTable";
import { toast } from "sonner";
import { PenBox, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import EditBudget from "../_components/EditBudget";

function ExpensesPage({ params }) {
  const { user } = useUser();
  const [budgetinfo, setbudgetinfo] = useState(null);
  const [expenselist, setexpenselist] = useState([]);
  const router = useRouter();
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (user) {
      getBudgetInfo();
    }
  }, [user]);

  // Fetch budget info and expenses
  const getBudgetInfo = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Budgets),
          totalSpend: sql`SUM(${Expenses.amount})`.mapWith(Number),
          totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(
          and(
            eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress),
            eq(Budgets.id, params.id)
          )
        )
        .groupBy(Budgets.id);

      setbudgetinfo(result[0] || {});
      getexpenselist();
    } catch (error) {
      console.error("Error fetching budget info:", error);
    }
  };

  const getexpenselist = async () => {
    try {
      const result = await db
        .select()
        .from(Expenses)
        .where(eq(Expenses.budgetId, params.id))
        .orderBy(desc(Expenses.id));

      setexpenselist(result);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // Delete a single expense
  const handleDeleteExpense = async (expenseId) => {
    try {
      await db.delete(Expenses).where(eq(Expenses.id, expenseId));
      toast.success("Expense deleted successfully!");
      getBudgetInfo();
      getexpenselist();
    } catch (error) {
      toast.error("Failed to delete expense!");
      console.error("Error deleting expense:", error);
    }
  };

  // Delete all expenses
  const handleDeleteAllExpenses = async () => {
    if (expenselist.length === 0) {
      toast.info("No expenses to delete.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete all expenses?"
    );
    if (!confirmDelete) return;

    try {
      await db.delete(Expenses).where(eq(Expenses.budgetId, params.id));
      toast.success("All expenses deleted successfully!");
      getBudgetInfo(); // Update total spent
      getexpenselist(); // Refresh expense list
    } catch (error) {
      toast.error("Failed to delete expenses!");
      console.error("Error deleting expenses:", error);
    }
  };

  // Delete the budget along with all expenses and redirect
  const handleDeleteBudget = async () => {
    if (!budgetinfo) {
      toast.info("No budget found.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this budget and all its expenses?"
    );
    if (!confirmDelete) return;

    try {
      await db.delete(Expenses).where(eq(Expenses.budgetId, params.id));
      await db.delete(Budgets).where(eq(Budgets.id, params.id));
      toast.success("Budget and all expenses deleted successfully!");
      router.replace("/dashboard/budgets");
    } catch (error) {
      toast.error("Failed to delete budget!");
      console.error("Error deleting budget:", error);
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-xl font-bold flex justify-between items-center">
        My Expenses
        <div className="flex gap-3">
          <button
            className="flex gap-2 bg-blue-600 text-white px-3 py-2 rounded-xl items-center font-medium text-sm hover:bg-blue-900 transition-colors"
            onClick={() => setShowEditModal(true)}
            aria-label="Edit budget"
          >
            <PenBox className="w-4 h-4" /> Edit Budget
          </button>
          <button
            className="flex gap-2 bg-red-600 text-white px-3 py-2 rounded-xl items-center font-medium text-sm hover:bg-red-700 transition-colors"
            onClick={handleDeleteAllExpenses}
            aria-label="Delete all expenses"
          >
            <Trash className="w-4 h-4" /> Delete Expenses
          </button>
          <button
            className="flex gap-2 bg-black text-white px-3 py-2 rounded-xl items-center font-medium text-sm hover:bg-gray-800 transition-colors"
            onClick={handleDeleteBudget}
            aria-label="Delete budget"
          >
            <Trash className="w-4 h-4" /> Delete Budget
          </button>
        </div>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
        <Budgetitem budget={budgetinfo} />
        <Addexpense
          budgetid={params.id}
          user={user}
          refreshdata={getBudgetInfo}
        />
      </div>

      <div className="mt-10">
        <h2 className="font-bold text-lg">Latest Expenses</h2>
        <ExpenselistTable
          expenselist={expenselist}
          onDelete={handleDeleteExpense}
          refreshdata={getBudgetInfo}
        />
      </div>

      {showEditModal && (
        <EditBudget
          budget={budgetinfo}
          onClose={() => setShowEditModal(false)}
          refreshData={getBudgetInfo}
        />
      )}
    </div>
  );
}

export default ExpensesPage;
