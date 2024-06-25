import React, { useState } from "react";
import { Box, Button, Flex, Textarea } from "@chakra-ui/react";
import EmojiPicker from "emoji-picker-react";
import { GrEmoji } from "react-icons/gr";
import { IconContext } from "react-icons";

type Props = {};

const CreatePost = (props: Props) => {
  const [postContent, setPostContent] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  return (
    <Box
      w="600px"
      h="180px"
      mt="3%"
      mb="3%"
      borderWidth="2px"
      borderColor="black"
      borderStyle="solid"
    >
      <Textarea
        className="createPost"
        placeholder="What's Happening??"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        resize="none"
      />
      <Flex justifyContent="space-between">
        <IconContext.Provider value={{ size: "1.5em", color: "teal", style: {marginLeft: "20px", marginTop: "20px"}}}>
          <GrEmoji onClick={() => setShowEmoji(!showEmoji)} />
        </IconContext.Provider>
        <EmojiPicker
          style={{ marginLeft: "3px", zIndex: 100}}
          open={showEmoji}
          onEmojiClick={(e) => setPostContent(postContent + e.emoji)}
        />
        <Button
          style={{ marginRight: "20px", marginTop: "10px", background: "teal" }}
          onClick={() => {
            setShowEmoji(false);
            console.log(postContent);
          }}
        >
          Post
        </Button>
      </Flex>
    </Box>
  );
};

export default CreatePost;
