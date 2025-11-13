import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // Don't retry on 404s or 401s
        if (error?.response?.status === 404 || error?.response?.status === 401) {
          return false;
        }
        // Retry others 3 times
        return failureCount < 3;
      },
    },
  },
});
