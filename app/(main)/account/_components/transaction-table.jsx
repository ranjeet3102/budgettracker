"use client";

import { bulkDeleteTransactions } from '@/actions/accounts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { categoryColors } from '@/data/categories';
import useFetch from '@/hooks/use-fetch';
import { format } from 'date-fns';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Clock, MoreHorizontal, RefreshCcw, RefreshCw, Search, Trash, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react'
import { BarLoader } from 'react-spinners';
import { toast } from 'sonner';
import RecurringBadge from './mobile-hover';

const ITEMS_PER_PAGE = 10;

const RECURRING_INTERVALS = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
};


const TransactionTable = ({transactions}) => {

  
  const [selectedIds,SetselectedIds] = useState([]);
  
  const [sortConfig,SetsortConfig] = useState(
    {
      field: "date",
      direction: "desc",
    }
  );
  
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [recurringFilter, setRecurringFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();




 //  filtered and sorted transactions
  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions];

    // Apply search filter
   if (searchTerm) {
  const searchLower = searchTerm.toLowerCase();
  result = result.filter((transaction) =>
    transaction.category?.toLowerCase().includes(searchLower)
  );
}


    // Apply type filter
    if (typeFilter) {
      result = result.filter((transaction) => transaction.type === typeFilter);
    }

    // Apply recurring filter
    if (recurringFilter) {
      result = result.filter((transaction) => {
        if (recurringFilter === "recurring") return transaction.isRecurring;
        return !transaction.isRecurring;
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;

      switch (sortConfig.field) {
        case "date":
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = 0;
      }

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });

    return result;
  }, [transactions, searchTerm, typeFilter, recurringFilter, sortConfig]);


  // Pagination calculation
  const totalPages = Math.ceil(
    filteredAndSortedTransactions.length / ITEMS_PER_PAGE
  );
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedTransactions.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredAndSortedTransactions, currentPage]);

const  handleSort =(field) => {
  SetsortConfig(current => ({
    field,
    direction: current.field===field && current.direction === "asc" ? "desc":"asc"
  }))
};

// const handleSelect = (id) => {
//   SetselectedIds(current => current.includes(id)? current.filter(item=>item!=id):[...current,id])
// };

// const handleSelectAll = (id) => {
//   SetselectedIds((current)=>
//   current.length === filteredAndSortedTransactions.length
// ?[] : filteredAndSortedTransactions.map((t)=>t.id)
//   );
// };

 const {
    loading: deleteLoading,
    fn: deleteFn,
    data: deleted,
  } = useFetch(bulkDeleteTransactions);

  const handleBulkDelete = async () => {
     console.log("Deleting transaction IDs:", selectedIds);
    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedIds.length} transactions?`
      )
    )
      return;
console.log("Attempting to delete these transaction IDs:", selectedIds);

    deleteFn(selectedIds);
  };
  useEffect(() => {
    if (deleted && !deleteLoading) {
      toast.error("Transactions deleted successfully");
    }
  }, [deleted, deleteLoading]);


const handleClearFilters =()=>{
    setSearchTerm("");
    setTypeFilter("");
    setRecurringFilter("");
    SetselectedIds([]);
};


const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    };

  return (
    <div className="space-y-4">
      { deleteLoading && 
      (<BarLoader className="mt-4" width={"100%"} color="#9333ea"/>)}

      {/* filters */}

        <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
           
            }}
            className="pl-8"
          />
        </div>

        <div className="flex gap-2 ">
          <Select     value={typeFilter}
            onValueChange={setTypeFilter}>
  <SelectTrigger >
    <SelectValue placeholder="All Types" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="INCOME">Income</SelectItem>
    <SelectItem value="EXPENSE">Expense</SelectItem>
  
  </SelectContent>
</Select>


          <Select     value={recurringFilter}
            onValueChange={(value)=> setRecurringFilter(value)}>
  <SelectTrigger className="w-[130px]">
    <SelectValue placeholder="All Transactions" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="recurring">Recurring only</SelectItem>
    <SelectItem value="non-recurring">Non-Recurring only</SelectItem>
  
  </SelectContent>
</Select>

{/* {selectedIds.length>0 && (<div className="flex items-center gap-2">
  <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
    <Trash className='h-4 w-4 mr-2'/>
    Delete Selected ({selectedIds.length})
  </Button>
  </div>)
  } */}

  {(searchTerm||typeFilter||recurringFilter) && (
    <Button variant="outline" size="icon" onClick={handleClearFilters} title="Clear Filters">
       <X className="h-4 w-5"/></Button>
  )}

        </div>

        </div>


      {/* transaction */}
<div className="rounded-md border">

      <Table>
  
  <TableHeader>
    <TableRow>
      {/* <TableHead className="w-[50px]">
        <Checkbox onCheckedChange={handleSelectAll}
        checked={
          selectedIds.length === filteredAndSortedTransactions.length && filteredAndSortedTransactions.length>0
        }/>
      </TableHead> */}
     
      <TableHead className="cursor-pointer"  onClick={() => handleSort("date")}>
        <div className="flex items-center pl-3">

        Date{" "}
        {sortConfig.field==="date" && 
        (sortConfig.direction==="asc" ?(<ChevronUp className="ml-1 h-4 w-4"/>):(<ChevronDown className="ml-1 h-4 w-4"/>))}
        </div>
      </TableHead>

      <TableHead>Description</TableHead>
     
      <TableHead className="cursor-pointer"  onClick={() => handleSort("category")}>
        <div className="flex items-center">
        category{sortConfig.field==="category" && 
        (sortConfig.direction==="asc" ?(<ChevronUp className="ml-1 h-4 w-4"/>):(<ChevronDown className="ml-1 h-4 w-4"/>))}
        </div>

      </TableHead>
    
      <TableHead className="cursor-pointer"  onClick={() => handleSort("amount")}>
        <div className="flex items-center justify-end">
        Amount{sortConfig.field==="amount" && 
        (sortConfig.direction==="asc" ?(<ChevronUp className="ml-1 h-4 w-4"/>):(<ChevronDown className="ml-1 h-4 w-4"/>))}
        </div>

      </TableHead>
      <TableHead>Recurring</TableHead>
      <TableHead className="w-[50px]"/>
    
    </TableRow>
  </TableHeader>
  <TableBody>

    {paginatedTransactions.length===0?(
      <TableRow>
        <TableCell colSpan={7} className="text-center text-muted-foreground">
          No Transactions found
        </TableCell>
      </TableRow>
    ):(
      paginatedTransactions.map((transaction)=>(

        <TableRow key={transaction.id}>
      {/* <TableCell>
        <Checkbox 
        onCheckedChange={()=> handleSelect(transaction.id)}
        checked={selectedIds.includes(transaction.id)} />
        </TableCell> */}
      <TableCell >
        <div className="pl-3">

        {format(new Date(transaction.date),"PP")}
        </div>
        </TableCell>
      <TableCell>
        {transaction.description}
        </TableCell>
      <TableCell className="capitalize">
        <span style={{
          background: categoryColors[transaction.category]
        }}
        className="px-2 py-1 rounded text-white text-sm">

        {transaction.category}
        </span>
        </TableCell>
      <TableCell className="text-right font-medium"
      style={{
        color: transaction.type === "EXPENSE" ? "red" :"green",
      }}>
        {transaction.type === "EXPENSE" ? "-" : "+"}$
        {transaction.amount.toFixed(2)}</TableCell>
        
        {/* <TableCell>{transaction.isRecurring ? (
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger> <Badge variant="outline"
     className="gap-1 bg-purple-100 text-purple-700 hover:bg-purple-200">
            <RefreshCw className="h-3 w-3"/>{
              RECURRING_INTERVALS[
                transaction.recurringInterval
                            ]
            }</Badge></TooltipTrigger>
    <TooltipContent>
      <div className="text-sm">
        <div className="fond-medium">Next Date:</div>
        <div>  {format(new Date(transaction.nextRecurringDate),"PP")}</div>
      </div>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

        ):(
          <Badge variant="outline" className="gap-1">
            <Clock className="h-3 w-3"/>one-time</Badge>
        )}</TableCell> */}
        <TableCell>
  <RecurringBadge transaction={transaction} />
</TableCell>
      

      <TableCell>
        <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" className="h-8 w-8 p-0">
    <MoreHorizontal className="h-4 w-4"/>
    </Button>
    </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel
    onClick={()=>
      router.push(
        `/transaction/create?edit=${transaction.id}`
      )
    }
    >Edit</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive" 
    onClick={()=> deleteFn([transaction.id])}
    >Delete</DropdownMenuItem>
  
  </DropdownMenuContent>
</DropdownMenu>

      </TableCell>
    </TableRow>

    
      ))
    )}

  </TableBody>
</Table>
</div>

 {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

    </div>
  )
}

export default TransactionTable
