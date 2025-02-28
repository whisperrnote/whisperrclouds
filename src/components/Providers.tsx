import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {/* Add any context providers or global state providers here */}
      {children}
    </>
  );
}
