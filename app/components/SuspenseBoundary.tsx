"use client";

import { Suspense, ReactNode } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface SuspenseBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function SuspenseBoundary({
  children,
  fallback = (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  ),
}: SuspenseBoundaryProps) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}
