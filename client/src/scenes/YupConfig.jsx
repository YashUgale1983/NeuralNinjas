import * as Yup from "yup";

export const LoginFormSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email..."),
    password: Yup.string().min(4).required("Please enter your password...")
})

export const SignupSchema = Yup.object({
    username: Yup.string().min(5).max(20).required("Please enter your username..."),
    email: Yup.string().email().required("Please enter your email..."),
    password: Yup.string().min(4).required("Please enter your password..."),
    location: Yup.string().max(15).required("Please enter your location..."),
    expertise: Yup.string().min(3).max(15).required("Please enter your expertise..."),
    fees: Yup.string().min(2).max(10).required("Enter your consultation fees..."),
    phoneNumber: Yup.string().min(10).max(10).required("Enter your phone number...")
})