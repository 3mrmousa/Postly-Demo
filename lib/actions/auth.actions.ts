"use server";

import {
  loginByEmail,
  loginByUsername,
  register,
} from "@/lib/services/user.service";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type FormState = {
  error: string | null;
  success?: boolean;
  user?: unknown;
};

//Zod

const RegisterSchema = z.object({
  firstName: z.string().min(2, "First Name must be at least 2 chars"),
  lastName: z.string().min(2, "Last Name must be at least 2 chars"),
  username: z
    .string()
    .min(3, "Username must be at least 3 chars")
    .max(20, "Username must be less than 20 chars"),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 chars"),
  avatar: z.string().optional(),
  cover: z.string().optional(),
});

const LoginByEmailSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const LoginByUsernameSchema = z.object({
  username: z.string(),
  password: z.string(),
});
//
//
//
//Actions

export async function LoginByEmailAction(
  prevState: FormState,
  formData: FormData,
) {
  const parsed = LoginByEmailSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues.map((i) => i.message).join(", "),
    };
  }

  try {
    const user = await loginByEmail(parsed.data.email, parsed.data.password);

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    // return {
    //   success: true,
    //   user,
    //   error: null,
    // };
  } catch (err) {
    return {
      error: "Something went wrong",
      success: false,
    };
  }
  redirect("/");
}

export async function LoginByUsernameAction(
  prevState: FormState,
  formData: FormData,
) {
  const parsed = LoginByUsernameSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues.map((i) => i.message).join(", "),
      success: false,
    };
  }

  try {
    const user = await loginByUsername(
      parsed.data.username,
      parsed.data.password,
    );

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    // return {
    //   success: true,
    //   user,
    //   error: null,
    // };
  } catch (err) {
    return {
      error: "Something went wrong",
      success: false,
    };
  }
  redirect("/");
}

export async function RegisterAction(prevState: FormState, formData: FormData) {
  const parsed = RegisterSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues.map((i) => i.message).join(", "),
      success: false,
    };
  }

  try {
    const user = await register(parsed.data);

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    // return {
    //   success: true,
    //   user,
    //   error: null,
    // };
  } catch (err) {
    return {
      error: "Something went wrong",
      success: false,
    };
  }
  redirect("/");
}

export async function logoutAction() {
  (await cookies()).delete("token");
  redirect("/login");
}
