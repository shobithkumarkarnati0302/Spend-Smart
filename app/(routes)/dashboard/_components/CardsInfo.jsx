import { PiggyBank, Receipt, Wallet } from 'lucide-react';
import React, { useEffect, useState } from 'react';

function CardsInfo({ budgetList }) {
  const [totalBudget, setTotalBudget] = useState(null);
  const [totalSpend, setTotalSpend] = useState(null);
  const [totalBudgets, setTotalBudgets] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (budgetList && budgetList.length > 0) {
      calculateCardInfo();
      setLoading(false); // Stop loading when data is available
    }
  }, [budgetList]);

  const calculateCardInfo = () => {
    let totalBudget_ = 0;
    let totalSpend_ = 0;

    budgetList.forEach((element) => {
      totalBudget_ += Number(element.amount);
      totalSpend_ += Number(element.totalSpend || 0);
    });

    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
    setTotalBudgets(budgetList.length);
  };

  const renderSkeletonCard = () => (
    <div className="p-7 border-4 rounded-xl flex justify-between items-center animate-pulse bg-gray-200">
      <div>
        <div className="h-4 w-24 bg-gray-300 rounded-md mb-2"></div> {/* Title */}
        <div className="h-6 w-32 bg-gray-400 rounded-md"></div> {/* Amount */}
      </div>
      <div className="h-12 w-12 bg-gray-300 rounded-full"></div> {/* Icon */}
    </div>
  );

  return (
    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {loading ? renderSkeletonCard() : (
        <div className="p-7 border-primary border-4 rounded-xl flex justify-between items-center hover:shadow-2xl">
          <div>
            <h2 className="text-sm">Total Budget</h2>
            <h2 className="font-bold text-2xl">₹{totalBudget.toLocaleString()}</h2>
          </div>
          <PiggyBank className="bg-primary text-white h-12 w-12 rounded-full p-2" />
        </div>
      )}

      {loading ? renderSkeletonCard() : (
        <div className="p-7 border-primary border-4 rounded-xl flex justify-between items-center hover:shadow-2xl">
          <div>
            <h2 className="text-sm">Total Spend</h2>
            <h2 className="font-bold text-2xl">₹{totalSpend.toLocaleString()}</h2>
          </div>
          <Receipt className="bg-primary text-white h-12 w-12 rounded-full p-2" />
        </div>
      )}


      {loading ? renderSkeletonCard() : (
        <div className="p-7 border-primary border-4 rounded-xl flex justify-between items-center hover:shadow-2xl">
          <div>
            <h2 className="text-sm">No. Of Budgets</h2>
            <h2 className="font-bold text-2xl">{totalBudgets}</h2>
          </div>
          <Wallet className="bg-primary text-white h-12 w-12 rounded-full p-2" />
        </div>
      )}
    </div>
  );
}

export default CardsInfo;
