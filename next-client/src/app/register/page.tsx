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
import { useQuery, useMutation } from "urql";
import { useRegisterMutation } from "@/generated/graphql";
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
  const [, register] = useRegisterMutation();
  const router = useRouter();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "", email: ""}}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ userCredentials: values });
          if (response.data?.register.error) {
            // console.log(toErrorMap(response.data.register.error));
            alert(JSON.stringify(toErrorMap(response.data.register.error)));
          } else if (response.data?.register.user) {
            router.push("/");
          }
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
                name="email"
                placeholder="email"
                label="Email"
              />
            </Box>
            <Box mt="5%">
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              type="submit"
              colorScheme="teal"
              mt="5%"
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default pages;
