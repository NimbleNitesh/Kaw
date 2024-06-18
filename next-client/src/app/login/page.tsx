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
import { useLoginMutation } from "@/generated/graphql";
import { FieldError } from "@/generated/graphql";
import { useRouter } from "next/navigation";


type Props = {};

export const toErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};

const pages = (props: Props) => {
  const [, login] = useLoginMutation();
  const router = useRouter();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, {setErrors}) => {
          const response = await login({ password: values.password, usernameOrEmail: values.usernameOrEmail });
          if(response.data?.login.error){
            // console.log(toErrorMap(response.data.login.error));
            alert(JSON.stringify(toErrorMap(response.data.login.error)));
          } else if(response.data?.login.user){
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="Username or Email"
              label="Username or Email"
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
              Log In
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default pages;
