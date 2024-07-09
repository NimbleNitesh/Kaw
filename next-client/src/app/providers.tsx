// app/providers.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { Client, fetchExchange, Provider, stringifyVariables } from "urql";
import {
  cacheExchange,
  Cache,
  QueryInput,
  Resolver,
} from "@urql/exchange-graphcache";
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "@/generated/graphql";

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);

    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      "posts"
    );

    info.partial = !isItInTheCache;

    const results: string[] = [];
    let hasMore = true;

    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "posts") as string[];
      const _hasMore = cache.resolve(key, "hasMore") as boolean;
      console.log(data, _hasMore);
      if(_hasMore == false){
        hasMore = false;
      }
      results.push(...data);
    });

    return { __typename: 'PaginatedPost', hasMore: hasMore, posts: results };
  };
};

const client = new Client({
  url: "http://localhost:4000/graphql",
  exchanges: [
    cacheExchange({
      keys: {
        PaginatedPost: () => null,
      },
      resolvers: {
        Query: {
          getAllPosts: cursorPagination(),
        },
      },
      updates: {
        Mutation: {
          logout: (_result, args, cache, _info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({
                me: null,
              })
            );
          },
          login: (_result, args, cache, _info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.error) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
          },
          register: (_result, args, cache, _info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.error) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              }
            );
          },
        },
      },
    }),
    fetchExchange,
  ],
  fetchOptions: {
    credentials: "include",
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider value={client}>
      <ChakraProvider>{children}</ChakraProvider>
    </Provider>
  );
}
