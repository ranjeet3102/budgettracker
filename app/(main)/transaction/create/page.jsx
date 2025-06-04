import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";

import { getTransaction } from "@/actions/transaction";
import AddTransactionForm from "../_components/transaction-form";


export default async function AddTransactionPage({ searchParams  }) {
  const accounts = await getUserAccounts();
  const editId = searchParams?.edit;


  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  return (
    <div className="max-w-3xl mx-auto px-5">
      <div className="flex justify-center md:justify-normal mb-8">
        <h1 className="text-5xl gradient font-extrabold tracking-tighter pr-2 pb-2 text-transparent bg-clip-text ">{editId ? "Edit" : "Add"} Transaction</h1>
      </div >
        <div className=" p-6">

      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
        />
        </div>
    </div>
  );
}