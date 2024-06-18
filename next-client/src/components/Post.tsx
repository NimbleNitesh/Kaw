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
    <Box borderColor="white" color="white" border="10px">
        {props.title}
        <Box textAlign="right">
            {convertToDate(props.updatedAt)}
        </Box>
    </Box>
  )
}

export default Post