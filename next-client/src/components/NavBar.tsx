import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { useMeQuery } from "@/generated/graphql";

type Props = {};

const NavBar = (props: Props) => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  if (fetching) {
    // data is loading
  } else if (!data?.me) {
    body = (
      <>
        <Link href="/register" m="1%">
          Register
        </Link>
        <Link href="/login" m="1%">
          Login
        </Link>
      </>
    );
  } else {
    body = (
      <Box textAlign="center"  justifyContent="space-between" gap="5%">
        <Flex m="1%" bg="navy" borderRadius="5px" borderColor="white">
          {data.me.username}
        </Flex>
        <Link href="/" m="1%">
          Log Out
        </Link>
      </Box>
    );
  }

  return (
    <Flex bg="darkcyan" color="white" p="2%" justifyContent="flex-end" h="10%">
      {body}
    </Flex>
  );
};

export default NavBar;
