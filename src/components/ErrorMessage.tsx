import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ErrorMessage = ({ message }: { message: string }) => (
  <Alert variant="destructive" className="mt-4 max-w-md" >
    <AlertCircle className="h-4 w-4" />
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);

export { ErrorMessage };
