import { useState } from "react";
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Clock } from "lucide-react";
import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const RECURRING_INTERVALS = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
};

const RecurringBadge = ({ transaction }) => {
  const [showMobileInfo, setShowMobileInfo] = useState(false);

  if (!transaction.isRecurring) {
    return (
      <Badge variant="outline" className="gap-1">
        <Clock className="h-3 w-3" />
        one-time
      </Badge>
    );
  }

  return (
    <>
      {/* Desktop Tooltip */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="hidden sm:inline-block">
            <Badge
              variant="outline"
              className="gap-1 bg-purple-100 text-purple-700 hover:bg-purple-200 cursor-pointer select-none"
            >
              <RefreshCw className="h-3 w-3" />
              {RECURRING_INTERVALS[transaction.recurringInterval]}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-sm">
              <div className="font-medium">Next Date:</div>
              <div>{format(new Date(transaction.nextRecurringDate), "PP")}</div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Mobile tap to toggle */}
      <div className="sm:hidden relative inline-block">
        <Badge
          variant="outline"
          className="gap-1 bg-purple-100 text-purple-700 cursor-pointer select-none"
          onClick={() => setShowMobileInfo((v) => !v)}
        >
          <RefreshCw className="h-3 w-3" />
          {RECURRING_INTERVALS[transaction.recurringInterval]}
        </Badge>

        {showMobileInfo && (
          <div
            className="absolute z-10 mt-1 w-max rounded border border-gray-300 bg-white p-2 text-xs shadow-lg"
            onClick={() => setShowMobileInfo(false)}
          >
            <div className="font-medium">Next Date:</div>
            <div>{format(new Date(transaction.nextRecurringDate), "PP")}</div>
            <div className="text-gray-400 text-right text-xs mt-1 cursor-pointer">
              Tap to close
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RecurringBadge;
