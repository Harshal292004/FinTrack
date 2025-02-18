"use client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
const AddExpenseButton = () => {
  const router = useRouter();
  return (
    <Plus
      className="w-16 h-16 fixed bottom-5 right-5 rounded-full bg-black text-white p-2 hover:bg-slate-500 transition-all"
      onClick={() => {
        router.push("/expenses/add");
      }}
    ></Plus>
  );
};

export default AddExpenseButton;
