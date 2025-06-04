"use client";

import { deleteAccount } from '@/actions/accounts'; // Make sure this exists in actions
import { updateDefaultAccount } from '@/actions/accounts';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import useFetch from '@/hooks/use-fetch';
import { ArrowDownRight, ArrowUpRight, MoreVertical, Trash } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { toast } from 'sonner';

const AccountCard = ({account}) => {
const {name,type,balance,id,isDefault} = account;

const {
  loading: updateDefaultLoading,
  fn: updateDefaultfn,
  data: updateAccount,
  error,
} = useFetch(updateDefaultAccount);

const handleDefaultChange = async(event)=>{
event.preventDefault();

if(isDefault){
  toast.warning("You need atleast 1 default account");
  return;
}

await updateDefaultfn(id);
}

useEffect(() =>{
  if(updateAccount?.success){
    toast.success("Default account updated successfully");
  }
},[updateAccount, updateDefaultLoading])

useEffect(() =>{
  if(error){
    toast.error(error.message|| "Failed to update default account");
  }
},[error])


const {
  loading: deleteLoading,
  fn: deleteFn,
  data: deletedAccount,
  error: deleteError,
} = useFetch(deleteAccount);

useEffect(() => {
  if (deletedAccount?.success) {
    toast.success("Account deleted successfully");
    // Optionally reload or refetch list
  }
}, [deletedAccount]);

useEffect(() => {
  if (deleteError) {
    toast.error(deleteError.message || "Failed to delete account");
  }
}, [deleteError]);



//DELETE 
const handleDelete = async (event) => {
  event.preventDefault();

  const confirmDelete = confirm("Are you sure you want to delete this account? All associated transactions will be deleted.");
  if (!confirmDelete) return;

  await deleteFn(id); // Make sure `deleteFn` comes from `useFetch(deleteAccount)`
};

  return (
  <Card className="hover:shadow-md transition-shadow group relative">
    
    <Link href={`/account/${id}`} >
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium capitalize">{name}</CardTitle>
   <Switch checked={isDefault} onClick={handleDefaultChange} disabled={updateDefaultLoading}/>
  </CardHeader>
  <CardContent>
   <div className="text-2xl font-bold">
    ${parseFloat(balance).toFixed(2)}
   </div>
   <p className="text-xs text-muted-foreground">
        {type.charAt(0) + type.slice(1).toLowerCase()} Account
   </p>
  </CardContent>
  {/* <CardFooter className="flex justify-between text-sm text-muted-foreground my-3">
    <div className="flex items-center">
        <ArrowUpRight className="mr-1 h-4 w-4 text-green-500"/>
        Income
    </div>
    <div className="flex items-center">
        <ArrowDownRight className="mr-1 h-4 w-4 text-red-500"/>
        Expense
    </div>
  </CardFooter> */}
  <CardFooter className="flex justify-between items-center text-sm text-muted-foreground my-3">
  <div className="flex gap-4">
    <div className="flex items-center">
      <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
      Income
    </div>
    <div className="flex items-center">
      <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
      Expense
    </div>
  </div>

  {/* DROPDOWN BADGE MENU */}
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Badge
        variant="outline"
        className="cursor-pointer p-2 rounded-full"
      >
        <MoreVertical className="h-4 w-4" />
      </Badge>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem
        onClick={handleDelete}
        disabled={deleteLoading}
        className="text-red-600 focus:text-red-700"
      >
        <Trash className="mr-2 h-4 w-4" />
        Delete Account
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</CardFooter>

    </Link>
</Card>

  )
}

export default AccountCard
