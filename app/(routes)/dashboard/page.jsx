"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import CardsInfo from "./_components/CardsInfo";
import { db } from "../../../utils/dbconfig";
import { getTableColumns, sql, eq, desc } from "drizzle-orm";
import { Budgets, Expenses } from "../../../utils/schema";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/Budgetitem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";

function Dashboard() {
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  // Redirect user if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/auth/sign-in"); // Redirect to sign-in if not logged in
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (user) {
      console.log("User Email:", user?.primaryEmailAddress?.emailAddress);
      getBudgetList();
    }
  }, [user]);

  const getBudgetList = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Budgets),
          totalSpend: sql`SUM(${Expenses.amount})`.mapWith(Number),
          totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .groupBy(Budgets.id)
        .orderBy(desc(Budgets.id));

      setBudgetList(result);
      getAllExpenses();
    } catch (error) {
      console.error("Error fetching budget list:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAllExpenses = async () => {
    try {
      const result = await db
        .select({
          id: Expenses.id,
          name: Expenses.name,
          amount: Expenses.amount,
          createdAt: Expenses.createdAt,
        })
        .from(Expenses)
        .where(eq(Expenses.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Expenses.id));

      console.log("Expenses Result:", result);
      setExpensesList(result);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const SkeletonCard = () => (
    <div className="p-5 border rounded-lg bg-gray-200 animate-pulse h-24"></div>
  );

  const SkeletonBudgetItem = () => (
    <div className="p-4 border rounded-lg bg-gray-200 animate-pulse h-16"></div>
  );

  return (
    <div className="p-5">
      <h2 className="font-bold text-3xl ml-5 mt-5">Hi, {user?.fullName} ✌️</h2>
      <p className="text-gray-500 ml-5">
        Smart budgeting starts here—let’s manage your money better!
      </p>

      <CardsInfo budgetList={loading ? [] : budgetList} loading={loading} />

      <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-5">
        <div className="md:col-span-2">
          {loading ? <SkeletonCard /> : <BarChartDashboard budgetList={budgetList} />}
        </div>

        <div className="grid gap-5">
          <h2 className="font-bold text-lg ml-2">Latest Budgets</h2>
          {loading
            ? Array(3).fill().map((_, index) => <SkeletonBudgetItem key={index} />)
            : budgetList.length > 0
            ? budgetList.map((budget, index) => <BudgetItem budget={budget} key={index} />)
            : <p className="text-gray-500 ml-2">No budgets found.</p>}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
