'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

export function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        {children}
      </NuqsAdapter>
    </QueryClientProvider>
  );
}
