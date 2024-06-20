"use client";

import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Box,
  Link,
  Text,
} from "@chakra-ui/react";
import Wrapper from "@/components/Wrapper";
import InputField from "@/components/InputField";
import {
  useForgotPasswordMutation,
  useLoginMutation,
} from "@/generated/graphql";
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
  const [, sendMail] = useForgotPasswordMutation();
  const router = useRouter();
  const [forgetPassword, setForgetPassword] = useState(false);

  return (
    <Wrapper variant="small">
      {!forgetPassword ? (
        <Formik
          initialValues={{ usernameOrEmail: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login({
              password: values.password,
              usernameOrEmail: values.usernameOrEmail,
            });
            if (response.data?.login.error) {
              // console.log(toErrorMap(response.data.login.error));
              alert(JSON.stringify(toErrorMap(response.data.login.error)));
              setErrors(toErrorMap(response.data.login.error));
            } else if (response.data?.login.user) {
              router.push("/");
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
              <Box mt="5%" textAlign="right">
                <Link color="skyblue" onClick={() => setForgetPassword(true)}>
                  forgot password?
                </Link>
                <Text>
                  {" "}
                  New to Kaw?{" "}
                  <Link color="skyblue" href="/register">
                    sign up now!
                  </Link>
                </Text>
              </Box>
              <Button
                type="submit"
                colorScheme="teal"
                mt="5%"
                w="30%"
                isLoading={isSubmitting}
              >
                Log In
              </Button>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async (values) => {
            await sendMail({ email: values.email });
            alert("Go to your registered Email to verify");
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="email" placeholder="Email" label="Email" />
              <Button
                type="submit"
                colorScheme="teal"
                mt="5%"
                isLoading={isSubmitting}
              >
                Reset Password
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </Wrapper>
  );
};

export default pages;
