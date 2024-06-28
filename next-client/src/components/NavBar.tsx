import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { useLogoutMutation, useMeQuery } from "@/generated/graphql";
import styles from "./navbar.module.css";

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
      <Box>
        <Flex flexDirection="column" gap="20px" h="75vh">
          {tabs.map((tab) => (
            <Link
              href={`/${tab}`}
              key={tab}
              m="1%"
              style={{ fontFamily: "monospace", fontSize: "25px" }}
            >
              {tab}
            </Link>
          ))}
        </Flex>
        <Box textAlign="center" justifyContent="space-between" gap="8%">
          <Box
            className={styles.profileButton}
            m="1%"
            bg="tomato"
            borderRadius="75px"
            h="60px"
            >
            <Box>{data.me.username}</Box>
            <Box>{data.me.id}</Box>

            <Button
              className={styles.logoutButton}
              m="1%"
              p="3%"
              bg="green"
              onClick={() => {
                /**LogoutMutation doesn't require any variables, we can call this function with an empty object. */
                logout({});
              }}
              variant="link"
              isLoading={logoutFetching}
            >
              Log Out
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Flex
      bg="teal"
      color="white"
      p="2%"
      h="100vh"
      pos="fixed"
      w="15vw"
      flexDirection="column"
      gap="20px"
    >
      {body}
    </Flex>
  );
};

export default NavBar;
