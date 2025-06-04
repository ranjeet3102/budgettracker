import { getDashboardData, getUserAccounts } from '@/actions/dashboard';
import CreateAccountDrawer from '@/components/create-account-drawer';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import React, { Suspense } from 'react';
import AccountCard from './_components/account-card';
import { getCurrentBudget } from '@/actions/budget';
import BudgetProgress from './_components/budget_progress';
import DashboardOverview from './_components/transaction-overview';


async function DashboardPage() {
  const accounts = await getUserAccounts();

  const defaultAccount = accounts.find((account) => account.isDefault);
  // const otherAccounts = accounts.filter((account) => !account.isDefault);

  let defaultBudget = null;

  if (defaultAccount) {
    defaultBudget = await getCurrentBudget(defaultAccount.id);
  }

  const transactions = await getDashboardData();

  return (
    <div className="space-y-8">
      {/*  Budget Progress for Default Account */}
      {defaultAccount && (
        // <BudgetProgress
        //   accountId={defaultAccount.id}
        //   accountName={defaultAccount.name}
        //   initialBudget={defaultBudget?.budget}
        //   currentExpenses={defaultBudget?.currentExpenses || 0}
        //   todayExpenses={defaultBudget?.todayExpenses || 0}
        // />

        <BudgetProgress
  accountId={defaultAccount.id}
  accountName={defaultAccount.name}
  initialBudget={defaultBudget?.budget||0}
  currentExpenses={defaultBudget?.currentExpenses || 0}
  todayExpenses={defaultBudget?.todayExpenses || 0}
  dynamicDailyBudget={defaultBudget?.dynamicDailyBudget || 0}
/>

      )}

      {/* Overview */}
      <Suspense fallback={"Loading Overview..."}>
        <DashboardOverview
        accounts={accounts}
        transactions={transactions || []}
      />

        </Suspense>

      {/*  Account Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
            <CardContent className="flex flex-col items-center justify-center h-full text-muted-foreground pt-5">
              <Plus className="h-10 w-10 mb-2" />
              <p className="text-sm font-medium">Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>

        {accounts.length > 0 ? (
          accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center h-40">
  <p className="text-muted-foreground text-sm">No accounts found</p>
</div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
