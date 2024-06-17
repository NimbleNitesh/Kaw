// app/providers.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react';
import { Client, fetchExchange, Provider } from 'urql';
import { cacheExchange, Cache, QueryInput } from '@urql/exchange-graphcache';
import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from '@/generated/graphql';

function betterUpdateQuery<Result, Query> (
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
){
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any)
}

const client = new Client({
  url: 'http://localhost:4000/graphql',
  exchanges: [cacheExchange({
    updates: {
      Mutation: {
        logout: (_result, args, cache, _info) => {
          betterUpdateQuery<LogoutMutation, MeQuery>(
            cache,
            { query: MeDocument},
            _result,
            () => ({
              me: null
            })
          );
        },
        login: (_result, args, cache, _info) => {
          betterUpdateQuery<LoginMutation, MeQuery>(
            cache,
            { query: MeDocument },
            _result,
            (result, query) => {
              if(result.login.error){
                return query;
              } else{
                return {
                  me: result.login.user
                }
              }
            }
          )
        },
        register: (_result, args, cache, _info) => {
          betterUpdateQuery<RegisterMutation, MeQuery>(
            cache,
            { query: MeDocument },
            _result,
            (result, query) => {
              if(result.register.error){
                return query;
              } else{
                return {
                  me: result.register.user
                }
              }
            }
          )
        }
      }
    }
  }), fetchExchange],
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