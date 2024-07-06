// app/page.tsx
"use client";
import NavBar from "@/components/NavBar";
import { Link } from "@chakra-ui/next-js";
import { PostCursor, useGetAllPostsQuery } from "@/generated/graphql";
import Post from "@/components/Post";
import { Box, Button, Flex, Grid } from "@chakra-ui/react";
import { useMeQuery } from "@/generated/graphql";
import CreatePost from "@/components/CreatePost";
import { useState } from "react";

export default function Page() {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as PostCursor | null,
  });
  const [{ data }] = useGetAllPostsQuery({
    variables,
  });
  const [{ data: meData, fetching }] = useMeQuery();

  return (
    <>
      <NavBar />
      <Flex justifyContent="space-around" overflow="hidden">
        {fetching ? (
          <Box>
            <h1>Loading ...</h1>
          </Box>
        ) : !meData?.me ? (
          <Box>
            <h1>What's Happening</h1>
            <h2>Login to find out....</h2>
          </Box>
        ) : (
          <Flex maxW="100%" color="teal" direction="column">
            <CreatePost />
            <Box width="600px">
              {!data
                ? null
                : data.getAllPosts.map((p) => (
                    <Post
                      key={p.id}
                      id={p.id}
                      title={p.title}
                      createdAt={p.createdAt}
                      updatedAt={p.updatedAt}
                    ></Post>
                  ))}
              {data ? (
                <Button
                  onClick={() => {
                    setVariables({
                      limit: variables.limit,
                      cursor: {
                        createdAt:
                          data.getAllPosts[data.getAllPosts.length - 1]
                            .createdAt,
                        id: data.getAllPosts[data.getAllPosts.length - 1].id,
                      },
                    });
                  }}
                >
                  Load More
                </Button>
              ) : null}
            </Box>
          </Flex>
        )}
      </Flex>
    </>
  );
}
