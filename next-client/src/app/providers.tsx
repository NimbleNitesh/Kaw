// app/providers.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react';
import { Client, cacheExchange, fetchExchange, Provider } from 'urql';


const client = new Client({
  url: 'http://localhost:4000/graphql',
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
    credentials: "include"
  }
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider value={client}>
    <ChakraProvider>
      {children}
    </ChakraProvider>
    </Provider>
  );
}