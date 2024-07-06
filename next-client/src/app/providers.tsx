// app/providers.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react';
import { Client, fetchExchange, Provider, Query, stringifyVariables } from 'urql';
import { cacheExchange, Cache, QueryInput, Resolver } from '@urql/exchange-graphcache';
import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from '@/generated/graphql';

function betterUpdateQuery<Result, Query> (
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
){
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any)
}

const cursorPagination = (): Resolver => {
  console.log("Hello hi");
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    console.log(entityKey, fieldName);
    const allFields = cache.inspectFields(entityKey);
    console.log("All Fields: ", allFields);
    const fieldInfos = allFields.filter(info => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }
    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(entityKey, fieldKey);
    info.partial = !isItInTheCache;

    const results:string[] = [];
    fieldInfos.forEach(fi => {
      const data = cache.resolve(entityKey, fi.fieldKey) as string[];
      console.log(data);
      results.push(...data);
    })
    return results;
  };
};

const client = new Client({
  url: 'http://localhost:4000/graphql',
  exchanges: [cacheExchange({
    resolvers: {
      Query: {
        GetAllPosts: cursorPagination()
      }
    },
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