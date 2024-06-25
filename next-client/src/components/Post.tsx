import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { FaRegHeart, FaRegComment } from "react-icons/fa";


type Props = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
};

function convertToDate(unix_timestamp: string) {
  const unix_timestamp_number: number = Number(unix_timestamp);
  const myDate = new Date(unix_timestamp_number);
  return myDate.toLocaleString();
}

const Post = (props: Props) => {
  const [liked, setLiked] = React.useState("green");
  return (
    <Box
      color="tomato"
      borderWidth="2px"
      borderColor="black"
      borderStyle="solid"
      w="600px"
      p="25px"
      borderRadius="8px"
    >
      {props.title}
      <Box textAlign="right">{convertToDate(props.updatedAt)}</Box>
      <Flex style={{justifyContent: "space-evenly"}}>
      <FaRegHeart onClick={() => setLiked(liked=="green"? "tomato" : "green")} style={{color: liked}}/>
      <FaRegComment />
      </Flex>
    </Box>
  );
};

export default Post;
