"use client";
import React, { useEffect, useState } from "react";
import Createbudget from "./Createbudget";
import { getTableColumns, sql, eq, groupBy, desc } from "drizzle-orm";
import { Budgets, Expenses } from "../../../../../utils/schema";
import Budgetitem from "./Budgetitem";
import { db } from "../../../../../utils/dbconfig";
import { useUser } from "@clerk/nextjs";


function Budgetlist() {
  const [budgetList, setBudgetList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) getBudgetList();
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
    } catch (error) {
      console.error("Error fetching budget list:", error);
    }
  };

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* ✅ Pass getBudgetList correctly to refresh data */}
        <Createbudget Refreshdata={getBudgetList} />
        
        {budgetList.length > 0 ? (
          budgetList.map((budget, index) => <Budgetitem key={index} budget={budget} />)
        ) : (
          [1, 2, 3, 4, 5].map((_, index) => (
            <div key={index} className="p-5 w-full h-[150px] bg-slate-100 rounded-xl animate-pulse"></div>
          ))
        )}
      </div>
    </div>
  );
}

export default Budgetlist;
