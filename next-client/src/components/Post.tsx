import { Box } from '@chakra-ui/react'
import React from 'react'

type Props = {
    id: number,
    createdAt: string,
    updatedAt: string,
    title: string,
}

function convertToDate(unix_timestamp: string){
  const unix_timestamp_number: number = Number(unix_timestamp);
  const myDate = new Date(unix_timestamp_number);
  return myDate.toLocaleString();
}

const Post = (props: Props) => {


  return (
    <Box color="tomato" borderWidth="2px" borderColor="black" borderStyle="solid" w="120px" h="30px">
        {props.title}
        <Box textAlign="right">
            {convertToDate(props.updatedAt)}
        </Box>
    </Box>
  )
}

export default Post