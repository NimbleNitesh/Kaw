import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { useLogoutMutation, useMeQuery } from "@/generated/graphql";

type Props = {};

const NavBar = (props: Props) => {
  const [{ data, fetching }] = useMeQuery();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
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
      <Box textAlign="center" justifyContent="space-between" gap="8%">
        <Flex m="1%" bg="navy" borderRadius="5px" borderColor="white">
          {data.me.username}
        </Flex>
        <Button
          m="1%"
          p="3%"
          bg="tomato"
          onClick={() => {
            /**LogoutMutation doesn't require any variables, we can call this function with an empty object. */
            logout({});
          }}
          variant="link"
          isLoading={logoutFetching}
        >Log Out</Button>
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
