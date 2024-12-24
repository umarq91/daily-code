import { useState } from "react";
import TitleButtons from "../component/TitleButtons";
import ExpenseModal from "../component/modals/ExpenseModal";
import { useAppContext } from "../context/AppContextProvider";

type Props = {};

function Dashboard({}: Props) {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const { expenses, totalBalance } = useAppContext();

  return (
    <div className="min-h-screen pt-20 ">
      <div className="max-w-5xl mx-auto gap-20 flex flex-col ">
        <div className="border-2 border-black flex justify-center items-center col-span-2 py-10 text-5xl ">
          {" "}
          Total Amount : {totalBalance}
        </div>
        <div className="grid grid-cols-2  w-full gap-10">
          <TitleButtons onClick={() => setIsExpenseModalOpen(true)}>
            {" "}
            Add Expense
          </TitleButtons>

          <TitleButtons> Add Income</TitleButtons>
          <TitleButtons> Categories</TitleButtons>
          <TitleButtons> Expenses </TitleButtons>
        </div>
      </div>

      <ExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
      />
    </div>
  );
}

export default Dashboard;
