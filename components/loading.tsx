import React from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

interface LoadingProps {
  children?: React.ReactNode;
  isLoading?: boolean;
}

export default function Loading({ children, isLoading = true }: LoadingProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-screen">
        <ArrowPathIcon className="text-black animate-spin h-16 w-16" />
        <span className="ml-4 text-gray text-lg font-semibold">
          Cargando...
        </span>
      </div>
    );
  } else {
    return <>{children}</>;
  }
}
