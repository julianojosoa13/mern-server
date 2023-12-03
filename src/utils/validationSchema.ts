import * as yup from 'yup'

export const CreateUserSchema = yup.object().shape({
    name: yup
            .string()
            .trim()
            .required("Name is missing!")
            .min(3, "Name is too short!")
            .max(20, "Name is too long!"),
    email: yup
            .string()
            .required('Email is missing!')
            .email('Invalid email id!'),
    password: yup
            .string()
            .trim()
            .required("Password is missing")
            .min(8, "Password is too short! Minimum is 8 characters")
            .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/, "Password is too simple! You can use uppercase, lowercase, special character, and numbers to make it more complex")
})