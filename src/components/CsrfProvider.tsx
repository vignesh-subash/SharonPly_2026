"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface CsrfContextType {
  csrfToken: string | null;
  isLoading: boolean;
}

const CsrfContext = createContext<CsrfContextType>({
  csrfToken: null,
  isLoading: true,
});

export function useCsrf() {
  return useContext(CsrfContext);
}

interface CsrfProviderProps {
  children: ReactNode;
}

export function CsrfProvider({ children }: CsrfProviderProps) {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCsrfToken() {
      try {
        // Get CSRF token from cookie (set by server)
        const cookies = document.cookie.split(';');
        const csrfCookie = cookies.find(c => c.trim().startsWith('csrf-token='));
        
        if (csrfCookie) {
          const token = csrfCookie.split('=')[1];
          setCsrfToken(decodeURIComponent(token));
        }
      } catch (error) {
        console.error('Failed to get CSRF token:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCsrfToken();
  }, []);

  return (
    <CsrfContext.Provider value={{ csrfToken, isLoading }}>
      {children}
    </CsrfContext.Provider>
  );
}

// Hook to add CSRF token to fetch requests
export function useCsrfFetch() {
  const { csrfToken } = useCsrf();

  return function csrfFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const headers = new Headers(options.headers);
    
    if (csrfToken) {
      headers.set('x-csrf-token', csrfToken);
    }

    return fetch(url, {
      ...options,
      headers,
    });
  };
}
