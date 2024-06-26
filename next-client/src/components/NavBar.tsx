import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { useLogoutMutation, useMeQuery } from "@/generated/graphql";

type Props = {};

const NavBar = (props: Props) => {
  const [{ data, fetching }] = useMeQuery();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const tabs = ["Home", "Profile", "Search"];
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
      <Box className="tabs">
        {tabs.map((tab) => (
          <Link href={`/${tab}`} key={tab} m="1%" style={{display: "flex", flexDirection: "column", fontFamily: "monospace", fontSize: "25px", gap: "15px"}}>
            {tab}
          </Link>
        ))}
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
          </Box>
    );
  }

  return (
    <Flex bg="teal" color="white" p="2%" h="100vh" pos="fixed" w="15vw" >
      {body}
    </Flex>
  );
};

export default NavBar;
