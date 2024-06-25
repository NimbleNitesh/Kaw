// app/page.tsx
"use client";
import NavBar from "@/components/NavBar";
import { Link } from "@chakra-ui/next-js";
import { useGetAllPostsQuery } from "@/generated/graphql";
import Post from "@/components/Post";
import { Box, Flex, Grid } from "@chakra-ui/react";
import { useMeQuery } from "@/generated/graphql";
import CreatePost from "@/components/CreatePost";

export default function Page() {
  const [{ data }] = useGetAllPostsQuery();
  const [{ data: meData, fetching }] = useMeQuery();

  return (
    <>
      <Box backgroundColor="antiquewhite" h="100vh">
        <NavBar />
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
          <Flex
            alignItems="center"
            justifyContent="center"
            maxW="100%"
            color="teal"
            direction="column"
          >
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
            </Box>
          </Flex>
        )}
      </Box>
    </>
  );
}
