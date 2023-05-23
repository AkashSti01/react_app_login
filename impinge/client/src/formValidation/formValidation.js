import * as Yup from "yup";

// Validation of admin Schema.

export const Validation = Yup.object({
  firstName: Yup.string()
    .max(15, "must be 15 characters or less")
    .required("First name field is required!")
    .trim(),
  lastName: Yup.string()
    .max(15, "must be 15 characters or less")
    .required("Last name field is required!")
    .trim(),
  email: Yup.string()
    .email("Enter valid email address")
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .required("Email field is required!"),
  password: Yup.string()
    .min(8, "Password must be atleast 8 characters")
    .required("Password field is required!"),
  file: Yup.mixed().required("This field is required!"),
});

// Validation of user Schema.

export const loginValidation = Yup.object({
  email: Yup.string()
    .email("Enter valid email address")
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .required("Email field is required!"),
  password: Yup.string()
    .min(8, "Password must be atleast 8 characters")
    .required("Password field is required!"),
});
