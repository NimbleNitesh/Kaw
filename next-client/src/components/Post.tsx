import { Box, Flex, IconButton } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import {
  FaRegComment,
  FaLaughSquint,
  FaHeart,
  FaSadTear,
  FaHandHoldingHeart,
  FaLightbulb,
} from "react-icons/fa";
import { LiaCrowSolid } from "react-icons/lia";
import { GiImpLaugh } from "react-icons/gi";
import { IconType } from "react-icons";
import styles from "./post.module.css";

type Props = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  username: string;
};

function convertToDate(unix_timestamp: string) {
  const unix_timestamp_number: number = Number(unix_timestamp);
  const myDate = new Date(unix_timestamp_number);
  return myDate.toLocaleString();
}

const Post = (props: Props) => {
  const [selectedReaction, setSelectedReaction] = useState<{
    icon: IconType;
    color: string;
  } | null>(null);

  const reactionIcons = [
    { icon: FaLaughSquint, color: "blue" }, // funny
    { icon: FaHeart, color: "tomato" }, // love
    { icon: FaSadTear, color: "gray" }, // sad
    { icon: FaHandHoldingHeart, color: "green" }, // support
    { icon: FaLightbulb, color: "yellow" }, // idea
  ];

  return (
    <Box
      color="teal"
      borderWidth="2px"
      borderColor="teal"
      borderStyle="solid"
      w="600px"
      pl="25px"
      pr="25px"
      pb="25px"
      pt="10px"
    >
      <Box fontSize={12} color="white" pl={10}>{props.username}</Box>
      {props.title}
      <Box textAlign="right" color="white" fontSize={12}>{convertToDate(props.createdAt)}</Box>
      <Flex style={{ justifyContent: "space-evenly" }}>
        {selectedReaction ? (
          <selectedReaction.icon
            size={30}
            style={{
              color: selectedReaction.color,
            }}
            onClick={() => setSelectedReaction(null)}
          />
        ) : (
          <Box className={styles.reactionWrapper} position="relative">
            <LiaCrowSolid
              size={30}
              style={{
                color: "teal",
              }}
            />
            {
              <Flex
                className={styles.reactionIcons}
                position="absolute"
                bg="white"
                borderRadius="md"
                p="2"
              >
                {reactionIcons.map((reaction, index) => (
                  <IconButton
                    key={index}
                    aria-label={reaction.icon.name}
                    icon={React.createElement(reaction.icon)}
                    color={reaction.color}
                    onClick={() => setSelectedReaction(reaction)}
                  />
                ))}
              </Flex>
            }
          </Box>
        )}
        <FaRegComment
          size={20}
          style={{
            color: "teal",
            marginTop: "5px",
          }}
        />
      </Flex>
    </Box>
  );
};

export default Post;
