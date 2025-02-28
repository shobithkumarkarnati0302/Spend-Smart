import Link from "next/link";
import React from "react";

function BudgetItem({ budget }) {
  if (!budget) return null;

  const {
    id,
    icon = "📌",
    name = "Unnamed",
    totalItem = 0,
    amount = 0,
    totalSpend = 0,
  } = budget;
  const remaining = amount - totalSpend;
  const spendPercentage =
    amount > 0 ? Math.min((totalSpend / amount) * 100, 100) : 0;

  return (
    <Link href={`/dashboard/expenses/${id}`} passHref>
      <div >
        <div className="p-5  h-[170px] rounded-xl border-primary border-4 cursor-pointer hover:shadow-2xl">
          <div className="flex gap-2 items-center justify-between">
            <div className="flex gap-2 items-center">
              <h2 className="text-2xl p-2 bg-slate-100 rounded-full">{icon}</h2>
              <div>
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-sm text-gray-500">
                  Total Items: {totalItem}
                </p>
              </div>
            </div>
            <h2 className="font-bold text-primary text-lg">₹{amount}</h2>
          </div>
          <div className="mt-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs">₹{totalSpend} Spent</h2>
              <h2 className="text-xs">₹{remaining} Remaining</h2>
            </div>
            <div className="w-full bg-slate-300 h-2 rounded-full">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${spendPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
