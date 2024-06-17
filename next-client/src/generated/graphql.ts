import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  deletePost: Scalars['Boolean']['output'];
  login: UserResponse;
  logout: Scalars['Boolean']['output'];
  register: UserResponse;
  updatePost?: Maybe<Post>;
};


export type MutationCreatePostArgs = {
  title: Scalars['String']['input'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  userCredentials: UserCredentials;
};


export type MutationRegisterArgs = {
  userCredentials: UserCredentials;
};


export type MutationUpdatePostArgs = {
  id: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAllPosts: Array<Post>;
  getPost?: Maybe<Post>;
  hello: Scalars['String']['output'];
  me?: Maybe<User>;
};


export type QueryGetPostArgs = {
  id: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserCredentials = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegularUserFragment = { __typename?: 'User', id: number, username: string };

export type LoginMutationVariables = Exact<{
  userCredentials: UserCredentials;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', error?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  userCredentials: UserCredentials;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', error?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string } | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string } | null };

export const RegularUserFragmentDoc = gql`
    fragment regularUser on User {
  id
  username
}
    `;
export const LoginDocument = gql`
    mutation Login($userCredentials: UserCredentials!) {
  login(userCredentials: $userCredentials) {
    error {
      field
      message
    }
    user {
      ...regularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($userCredentials: UserCredentials!) {
  register(userCredentials: $userCredentials) {
    error {
      field
      message
    }
    user {
      ...regularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...regularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};