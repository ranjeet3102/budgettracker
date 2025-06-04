
// // "use client";

// // import { useState, useEffect } from "react";
// // import { Pencil, Check, X } from "lucide-react";
// // import useFetch from "@/hooks/use-fetch";
// // import { toast } from "sonner";

// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import { Progress } from "@/components/ui/progress";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { updateBudget } from "@/actions/budget";
// // import { cn } from "@/lib/utils";

// //  function BudgetProgress({ initialBudget, currentExpenses }) {
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [newBudget, setNewBudget] = useState(
// //     initialBudget?.amount?.toString() || ""
// //   );

// //   const {
// //     loading: isLoading,
// //     fn: updateBudgetFn,
// //     data: updatedBudget,
// //     error,
// //   } = useFetch(updateBudget);

// //   const percentUsed = initialBudget
// //     ? (currentExpenses / initialBudget.amount) * 100
// //     : 0;

// //   const handleUpdateBudget = async () => {
// //     const amount = parseFloat(newBudget);

// //     if (isNaN(amount) || amount <= 0) {
// //       toast.error("Please enter a valid amount");
// //       return;
// //     }

// //     await updateBudgetFn(amount);
// //   };

// //   const handleCancel = () => {
// //     setNewBudget(initialBudget?.amount?.toString() || "");
// //     setIsEditing(false);
// //   };

// //   useEffect(() => {
// //     if (updatedBudget?.success) {
// //       setIsEditing(false);
// //       toast.success("Budget updated successfully");
// //     }
// //   }, [updatedBudget]);

// //   useEffect(() => {
// //     if (error) {
// //       toast.error(error.message || "Failed to update budget");
// //     }
// //   }, [error]);

// //   return (
// //     <Card>
// //       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //         <div className="flex-1">
// //           <CardTitle className="text-sm font-medium">
// //             Monthly Budget (Default Account)
// //           </CardTitle>
// //           <div className="flex items-center gap-2 mt-1">
// //             {isEditing ? (
// //               <div className="flex items-center gap-2">
// //                 <Input
// //                   type="number"
// //                   value={newBudget}
// //                   onChange={(e) => setNewBudget(e.target.value)}
// //                   className="w-32"
// //                   placeholder="Enter amount"
// //                   autoFocus
// //                   disabled={isLoading}
// //                 />
// //                 <Button
// //                   variant="ghost"
// //                   size="icon"
// //                   onClick={handleUpdateBudget}
// //                   disabled={isLoading}
// //                 >
// //                   <Check className="h-4 w-4 text-green-500" />
// //                 </Button>
// //                 <Button
// //                   variant="ghost"
// //                   size="icon"
// //                   onClick={handleCancel}
// //                   disabled={isLoading}
// //                 >
// //                   <X className="h-4 w-4 text-red-500" />
// //                 </Button>
// //               </div>
// //             ) : (
// //               <>
// //                 <CardDescription>
// //                   {initialBudget
// //                     ? `$${currentExpenses.toFixed(
// //                         2
// //                       )} of $${initialBudget.amount.toFixed(2)} spent`
// //                     : "No budget set"}
// //                 </CardDescription>
// //                 <Button
// //                   variant="ghost"
// //                   size="icon"
// //                   onClick={() => setIsEditing(true)}
// //                   className="h-6 w-6"
// //                 >
// //                   <Pencil className="h-3 w-3" />
// //                 </Button>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </CardHeader>
// //       <CardContent>
// //         {initialBudget && (
// //           <div className="space-y-2">
         
// //          <Progress
// //         value={percentUsed}
// //          extraStyles={`${
// //          percentUsed >= 90 ? "bg-red-500" :
// //          percentUsed >= 75 ? "bg-yellow-500" :
// //              "!bg-green-500"
// //             }`} />
// //               {/* <Progress
// //              value={percentUsed}
// //             className={`${
// //            percentUsed >= 90
// //            ? "bg-red-500"
// //              : percentUsed >= 75
// //               ? "bg-yellow-500"
// //              : "bg-green-500"
// //               }`}
// //                 /> */}
// //             <p className="text-xs text-muted-foreground text-right">
// //               {percentUsed.toFixed(1)}% used
// //             </p>
// //           </div>
// //         )}
// //       </CardContent>
// //     </Card>
// //   );
// // }
// // export default BudgetProgress;

// // "use client";

// // import { useState, useEffect } from "react";
// // import { Pencil, Check, X } from "lucide-react";
// // import useFetch from "@/hooks/use-fetch";
// // import { toast } from "sonner";

// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import { Progress } from "@/components/ui/progress";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { updateBudget } from "@/actions/budget";

// // function BudgetProgress({ accountId, accountName, initialBudget, currentExpenses, todayExpenses }) {
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [newBudget, setNewBudget] = useState(initialBudget?.amount?.toString() || "");

// //   const [isEditingDaily, setIsEditingDaily] = useState(false);
// //   const [newDailyBudget, setNewDailyBudget] = useState(initialBudget?.daily?.toString() || "");

// //   const {
// //     loading: isLoading,
// //     fn: updateBudgetFn,
// //     data: updatedBudget,
// //     error,
// //   } = useFetch((amount) => updateBudget(accountId, amount)); //  use accountId

// //   const percentMonthly = initialBudget?.amount
// //     ? (currentExpenses / initialBudget.amount) * 100
// //     : 0;

// //   const dailyLimit = initialBudget?.daily || 0;
// //   const percentDaily = dailyLimit
// //     ? (todayExpenses / dailyLimit) * 100
// //     : 0;

// //   const handleUpdateBudget = async () => {
// //     const amount = parseFloat(newBudget);
// //     if (isNaN(amount) || amount <= 0) {
// //       toast.error("Please enter a valid monthly amount");
// //       return;
// //     }
// //     await updateBudgetFn(amount);
// //   };

// //   const handleUpdateDailyBudget = async () => {
// //     const dailyAmount = parseFloat(newDailyBudget);
// //     if (isNaN(dailyAmount) || dailyAmount <= 0) {
// //       toast.error("Please enter a valid daily amount");
// //       return;
// //     }
// //     const daysInMonth = new Date(
// //       new Date().getFullYear(),
// //       new Date().getMonth() + 1,
// //       0
// //     ).getDate();
// //     const monthlyAmount = dailyAmount * daysInMonth;
// //     await updateBudgetFn(monthlyAmount);
// //   };

// //   const handleCancel = () => {
// //     setNewBudget(initialBudget?.amount?.toString() || "");
// //     setIsEditing(false);
// //   };

// //   const handleCancelDaily = () => {
// //     setNewDailyBudget(initialBudget?.daily?.toString() || "");
// //     setIsEditingDaily(false);
// //   };

// //   useEffect(() => {
// //     if (updatedBudget?.success) {
// //       setIsEditing(false);
// //       setIsEditingDaily(false);
// //       toast.success("Budget updated successfully");
// //     }
// //   }, [updatedBudget]);

// //   useEffect(() => {
// //     if (error) {
// //       toast.error(error.message || "Failed to update budget");
// //     }
// //   }, [error]);

// //   return (
// //     <Card>
// //       <CardHeader>
// //         <CardTitle className="text-sm font-medium">
// //           Budget Overview {accountName ? `(${accountName})` : ""}
// //         </CardTitle>
// //       </CardHeader>
// //       <CardContent className="space-y-4">
// //         {/* Monthly Budget */}
// //         <div>
// //           <div className="flex items-center gap-2 mb-1">
// //             <span className="text-sm font-medium">Monthly:</span>
// //             {isEditing ? (
// //               <>
// //                 <Input
// //                   type="number"
// //                   value={newBudget}
// //                   onChange={(e) => setNewBudget(e.target.value)}
// //                   className="w-24"
// //                   autoFocus
// //                   disabled={isLoading}
// //                 />
// //                 <Button
// //                   variant="ghost"
// //                   size="icon"
// //                   onClick={handleUpdateBudget}
// //                   disabled={isLoading}
// //                 >
// //                   <Check className="h-4 w-4 text-green-500" />
// //                 </Button>
// //                 <Button
// //                   variant="ghost"
// //                   size="icon"
// //                   onClick={handleCancel}
// //                   disabled={isLoading}
// //                 >
// //                   <X className="h-4 w-4 text-red-500" />
// //                 </Button>
// //               </>
// //             ) : (
// //               <>
// //                 <CardDescription>
// //                   ${initialBudget?.amount?.toFixed(2) || "0.00"}
// //                 </CardDescription>
// //                 <Button
// //                   variant="ghost"
// //                   size="icon"
// //                   onClick={() => setIsEditing(true)}
// //                   className="h-6 w-6"
// //                 >
// //                   <Pencil className="h-3 w-3" />
// //                 </Button>
// //               </>
// //             )}
// //           </div>
// //           <Progress
// //             value={percentMonthly}
// //             extraStyles={`${
// //               percentMonthly >= 90
// //                 ? "bg-red-500"
// //                 : percentMonthly >= 75
// //                 ? "bg-yellow-500"
// //                 : "!bg-green-500"
// //             }`}
// //           />
// //           <p className="text-xs text-muted-foreground text-right mt-1">
// //             ${currentExpenses.toFixed(2)} of ${initialBudget?.amount?.toFixed(2)} spent ({percentMonthly.toFixed(1)}%)
// //           </p>
// //         </div>

// //         {/* Daily Budget */}
// //         <div>
// //           <div className="flex items-center gap-2 mb-1">
// //             <span className="text-sm font-medium">Daily:</span>
// //             {isEditingDaily ? (
// //               <>
// //                 <Input
// //                   type="number"
// //                   value={newDailyBudget}
// //                   onChange={(e) => setNewDailyBudget(e.target.value)}
// //                   className="w-24"
// //                   autoFocus
// //                   disabled={isLoading}
// //                 />
// //                 <Button
// //                   variant="ghost"
// //                   size="icon"
// //                   onClick={handleUpdateDailyBudget}
// //                   disabled={isLoading}
// //                 >
// //                   <Check className="h-4 w-4 text-green-500" />
// //                 </Button>
// //                 <Button
// //                   variant="ghost"
// //                   size="icon"
// //                   onClick={handleCancelDaily}
// //                   disabled={isLoading}
// //                 >
// //                   <X className="h-4 w-4 text-red-500" />
// //                 </Button>
// //               </>
// //             ) : (
// //               <>
// //                 <CardDescription>
// //                   ${initialBudget?.daily?.toFixed(2) || "0.00"} per day
// //                 </CardDescription>
// //                 <Button
// //                   variant="ghost"
// //                   size="icon"
// //                   onClick={() => setIsEditingDaily(true)}
// //                   className="h-6 w-6"
// //                 >
// //                   <Pencil className="h-3 w-3" />
// //                 </Button>
// //               </>
// //             )}
// //           </div>
// //           <Progress
// //             value={percentDaily}
// //             extraStyles={`${
// //               percentDaily >= 90
// //                 ? "bg-red-500"
// //                 : percentDaily >= 75
// //                 ? "bg-yellow-500"
// //                 : "!bg-green-500"
// //             }`}
// //           />
// //           <p className="text-xs text-muted-foreground text-right mt-1">
// //             ${todayExpenses.toFixed(2)} of ${dailyLimit.toFixed(2)} spent ({percentDaily.toFixed(1)}%)
// //           </p>
// //         </div>
// //       </CardContent>
// //     </Card>
// //   );
// // }

// // export default BudgetProgress;

// "use client";

// import { useState, useEffect } from "react";
// import { Pencil, Check, X } from "lucide-react";
// import useFetch from "@/hooks/use-fetch";
// import { toast } from "sonner";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { updateBudget } from "@/actions/budget";

// function BudgetProgress({
//   accountId,
//   accountName,
//   initialBudget,
//   currentExpenses,
//   todayExpenses,
//   dynamicDailyBudget,
// }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [newBudget, setNewBudget] = useState(initialBudget?.amount?.toString() || "");

//   const {
//     loading: isLoading,
//     fn: updateBudgetFn,
//     data: updatedBudget,
//     error,
//   } = useFetch((amount) => updateBudget(accountId, amount));

//   const percentMonthly = initialBudget?.amount
//     ? (currentExpenses / initialBudget.amount) * 100
//     : 0;

//   const dailyLimit = dynamicDailyBudget || 0;
//   const percentDaily = dailyLimit
//     ? (todayExpenses / dailyLimit) * 100
//     : 0;

//   const handleUpdateBudget = async () => {
//     const amount = parseFloat(newBudget);
//     if (isNaN(amount) || amount <= 0) {
//       toast.error("Please enter a valid monthly amount");
//       return;
//     }
//     await updateBudgetFn(amount);
//   };

//   const handleCancel = () => {
//     setNewBudget(initialBudget?.amount?.toString() || "");
//     setIsEditing(false);
//   };

//   useEffect(() => {
//     if (updatedBudget?.success) {
//       setIsEditing(false);
//       toast.success("Budget updated successfully");
//     }
//   }, [updatedBudget]);

//   useEffect(() => {
//     if (error) {
//       toast.error(error.message || "Failed to update budget");
//     }
//   }, [error]);

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="text-sm font-medium">
//           Budget Overview {accountName ? `(${accountName})` : ""}
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">

//         {/* Monthly Budget Section */}
//         <div>
//           <div className="flex items-center gap-2 mb-1">
//             <span className="text-sm font-medium">Monthly:</span>
//             {isEditing ? (
//               <>
//                 <Input
//                   type="number"
//                   value={newBudget}
//                   onChange={(e) => setNewBudget(e.target.value)}
//                   className="w-24"
//                   autoFocus
//                   disabled={isLoading}
//                 />
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={handleUpdateBudget}
//                   disabled={isLoading}
//                 >
//                   <Check className="h-4 w-4 text-green-500" />
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={handleCancel}
//                   disabled={isLoading}
//                 >
//                   <X className="h-4 w-4 text-red-500" />
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <CardDescription>
//                   ₹{initialBudget?.amount?.toFixed(2) || "0.00"}
//                 </CardDescription>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => setIsEditing(true)}
//                   className="h-6 w-6"
//                 >
//                   <Pencil className="h-3 w-3" />
//                 </Button>
//               </>
//             )}
//           </div>
//           <Progress
//             value={percentMonthly}
//             extraStyles={`${
//               percentMonthly >= 90
//                 ? "bg-red-500"
//                 : percentMonthly >= 75
//                 ? "bg-yellow-500"
//                 : "!bg-green-500"
//             }`}
//           />
//           <p className="text-xs text-muted-foreground text-right mt-1">
//   ₹{currentExpenses.toFixed(2)} of ₹{initialBudget?.amount?.toFixed(2)} spent ({percentMonthly.toFixed(1)}%)<br />
//   {currentExpenses <= initialBudget?.amount ? (
//     <span className="text-green-600">
//       Balance: ₹{(initialBudget.amount - currentExpenses).toFixed(2)}
//     </span>
//   ) : (
//     <span className="text-red-600">
//       Exceeded by ₹{(currentExpenses - initialBudget.amount).toFixed(2)}
//     </span>
//   )}
// </p>

//         </div>

//         {/* Daily Budget Section (Dynamic Only) */}
//         <div>
//           <div className="flex items-center gap-2 mb-1">
//             <span className="text-sm font-medium">Daily (Dynamic):</span>
//             <CardDescription title="Auto-calculated based on remaining budget and days in month">
//               ₹{dailyLimit.toFixed(2)} per day
//             </CardDescription>
//           </div>
//           <Progress
//             value={percentDaily}
//             extraStyles={`${
//               percentDaily >= 90
//                 ? "bg-red-500"
//                 : percentDaily >= 75
//                 ? "bg-yellow-500"
//                 : "!bg-green-500"
//             }`}
//           />
//           <p className="text-xs text-muted-foreground text-right mt-1">
//   ₹{todayExpenses.toFixed(2)} of ₹{dailyLimit.toFixed(2)} spent ({percentDaily.toFixed(1)}%)<br />
//   {todayExpenses <= dailyLimit ? (
//     <span className="text-green-600">
//       Balance: ₹{(dailyLimit - todayExpenses).toFixed(2)}
//     </span>
//   ) : (
//     <span className="text-red-600">
//       Exceeded by ₹{(todayExpenses - dailyLimit).toFixed(2)}
//     </span>
//   )}
// </p>

//         </div>

//       </CardContent>
//     </Card>
//   );
// }

// export default BudgetProgress;

"use client";

import { useState, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateBudget } from "@/actions/budget";

function BudgetProgress({
  accountId,
  accountName,
  initialBudget,
  currentExpenses,
  todayExpenses,
  dynamicDailyBudget,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(initialBudget?.amount?.toString() || "");

  const {
    loading: isLoading,
    fn: updateBudgetFn,
    data: updatedBudget,
    error,
  } = useFetch((amount) => updateBudget(accountId, amount));

  const percentMonthly = initialBudget?.amount
    ? (currentExpenses / initialBudget.amount) * 100
    : 0;

  const dailyLimit = dynamicDailyBudget || 0;
  const percentDaily = dailyLimit
    ? (todayExpenses / dailyLimit) * 100
    : 0;

  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const currentDay = today.getDate();
  const daysRemaining = lastDayOfMonth - currentDay ;

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid monthly amount");
      return;
    }
    await updateBudgetFn(amount);
  };

  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  useEffect(() => {
    if (updatedBudget?.success) {
      setIsEditing(false);
      toast.success("Budget updated successfully");
    }
  }, [updatedBudget]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update budget");
    }
  }, [error]);

  const budgetSet = initialBudget?.amount > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          Budget Overview {accountName ? `(${accountName})` : ""}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">

        {/* Monthly Budget Section */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium">Monthly:</span>
            {isEditing ? (
              <>
                <Input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="w-24"
                  autoFocus
                  disabled={isLoading}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleUpdateBudget}
                  disabled={isLoading}
                >
                  <Check className="h-4 w-4 text-green-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </>
            ) : (
              <>
                <CardDescription>
                  ₹{initialBudget?.amount?.toFixed(2) || "0.00"}
                </CardDescription>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  className="h-6 w-6"
                >
                  <Pencil className="h-3 w-3" />
                </Button>
              </>
            )}
          </div>

          {budgetSet && (
            <>
              <Progress
  value={percentMonthly}
  className={`${
    percentMonthly >= 90
      ? "bg-red-500"
      : percentMonthly >= 75
      ? "bg-yellow-500"
      : "bg-green-500"
  }`}
/>

              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span className="text-left">
                  🗓️ {daysRemaining} day{daysRemaining !== 1 ? "s" : ""} remaining
                </span>
                <span className="text-right">
                  ₹{currentExpenses.toFixed(2)} of ₹{initialBudget.amount.toFixed(2)} spent ({percentMonthly.toFixed(1)}%)<br />
                  {currentExpenses <= initialBudget.amount ? (
                    <span className="text-green-600">
                      Balance: ₹{(initialBudget.amount - currentExpenses).toFixed(2)}
                    </span>
                  ) : (
                    <span className="text-red-600">
                      Exceeded by ₹{(currentExpenses - initialBudget.amount).toFixed(2)}
                    </span>
                  )}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Daily Budget Section (Only show if monthly is set) */}
        {budgetSet && currentExpenses <= initialBudget.amount &&(
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium">Daily (Dynamic):</span>
              <CardDescription title="Auto-calculated based on remaining budget and days in month">
                ₹{dailyLimit.toFixed(2)} per day
              </CardDescription>
            </div>
               <Progress
  value={percentDaily}
  className={`${
    percentDaily >= 90
      ? "bg-red-500"
      : percentDaily >= 75
      ? "bg-yellow-500"
      : "bg-green-500"
  }`}
/>
           
            
            <p className="text-xs text-muted-foreground text-right mt-1">
              ₹{todayExpenses.toFixed(2)} of ₹{dailyLimit.toFixed(2)} spent ({percentDaily.toFixed(1)}%)<br />
              {todayExpenses <= dailyLimit ? (
                <span className="text-green-600">
                  Balance: ₹{(dailyLimit - todayExpenses).toFixed(2)}
                </span>
              ) : (
                <span className="text-red-600">
                  Exceeded by ₹{(todayExpenses - dailyLimit).toFixed(2)}
                </span>
              )}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default BudgetProgress;
