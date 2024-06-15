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

type Props = {};

const pages = (props: Props) => {
  // The below import defines which components come from formik
  // import { Field, Form, Formik } from 'formik';
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
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
