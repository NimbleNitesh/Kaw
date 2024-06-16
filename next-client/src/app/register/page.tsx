"use client";

import React from "react";
import { Field, Form, Formik } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Box,
} from "@chakra-ui/react";
import Wrapper from "@/components/Wrapper";
import InputField from "@/components/InputField";
import { useMutation } from "urql";

type Props = {};

const REGISTER_MUT = `
mutation register($userCredentials: UserCredentials!){
  register(userCredentials: $userCredentials) {
    error {
      field,
      message
    }
    user {
      id,
      username
    }
  }
}
`

const pages = (props: Props) => {
  const [, register] = useMutation(REGISTER_MUT);
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
          return register({ userCredentials: values });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt="5%">
            <InputField
              name="password"
              placeholder="password"
              label="Password"
              type="password"
            />
            </Box>
            <Button type="submit" colorScheme="teal" mt="5%" isLoading={isSubmitting}>
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default pages;
