import * as Yup from "yup";

export const LoginFormSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email..."),
    password: Yup.string().min(4).required("Please enter your password...")
})

export const SignupSchema = Yup.object({
    username: Yup.string().min(5).max(20).required("Please enter your username..."),
    email: Yup.string().email().required("Please enter your email..."),
    password: Yup.string().min(4).required("Please enter your password...")
})