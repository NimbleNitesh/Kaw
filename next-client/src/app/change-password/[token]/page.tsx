"use client";
import { useChangePasswordMutation } from "@/generated/graphql";
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
} from "@chakra-ui/react";import InputField from "@/components/InputField";
import { toErrorMap } from "@/app/login/page";
import { useRouter } from "next/navigation";
import Wrapper from "@/components/Wrapper";


export default function Page({ params }: { params: { token: string } }) {
  const [, changePassword] = useChangePasswordMutation();
  const router = useRouter();
  return (
    <Wrapper>
    
    <Formik
    initialValues={{ newPassword: "" }}
    onSubmit={async (values, {setErrors}) => {
      const response = await changePassword({ newPassword: values.newPassword, token: params.token });
      if(response.data?.changePassword.error){
        alert(JSON.stringify(toErrorMap(response.data.changePassword.error)));
        setErrors(toErrorMap(response.data.changePassword.error));
      } else if(response.data?.changePassword.user){
        router.push("/");
      }
    }}
  >
    {({ isSubmitting }) => (
      <Form>
        <InputField name="newPassword" placeholder="New Password" label="New Password" />
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
  </Wrapper>
);
}
