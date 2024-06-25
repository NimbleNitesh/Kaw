// app/page.tsx
"use client";
import NavBar from "@/components/NavBar";
import { Link } from "@chakra-ui/next-js";
import { useGetAllPostsQuery } from "@/generated/graphql";
import Post from "@/components/Post";
import { Box, Flex, Grid } from "@chakra-ui/react";

export default function Page() {
  const [{ data }] = useGetAllPostsQuery();

  return (
    <>
      <Box backgroundColor="antiquewhite" h="100vh">
      <NavBar />
      <div>Hello World</div>
      <Flex alignItems="center" justifyContent="center" maxW="100%" color="teal">
        <Box width="30%">
          {!data
            ? null
            : data.getAllPosts.map((p) => (
                <Post
                  id={p.id}
                  title={p.title}
                  createdAt={p.createdAt}
                  updatedAt={p.updatedAt}
                ></Post>
              ))}
        </Box>
      </Flex>
      </Box>
    </>
  );
}
