import { Loader2 } from "lucide-react";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center w-full h-full">
    <Loader2 className="h-5 w-5 animate-spin text-green-500 dark:text-orange-500" />
  </div>
);

export { LoadingSpinner };
