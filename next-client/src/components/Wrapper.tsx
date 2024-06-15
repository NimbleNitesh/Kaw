import React from "react";
import { Box } from "@chakra-ui/react";

type Props = {
  variant?: "small" | "regular";
  children: React.JSX.Element;
};

const wrapper = ({ children, variant = "regular" }: Props) => {
  return (
    <Box
      mt="5%"
      mx="auto"
      maxW={variant === "regular" ? "40%" : "20%"}
      w="100%"
    >
      {children}
    </Box>
  );
};

export default wrapper;
