'use server';

import { z } from 'zod';

import { createUser, getUser } from '@/utils/db/queries';
import { compare } from 'bcrypt-ts';
import { createSession } from '@/utils/session';
import { redirect, RedirectType } from 'next/navigation';

const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// @ts-ignore
export const login = async (state: any, formData: FormData) => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    const { data: users = [], error } = await getUser(validatedData.email);

    console.log(users);
    if (!users || users.length === 0) {
      return { status: 'failed', error: 'user_not_exist' };
    }

    const passwordMatch = await compare(
      formData.get('password') as string,
      users[0].password!,
    );
    if (!passwordMatch) {
      return { status: 'failed', error: 'wrong_password' };
    }

    await createSession({ userId: users[0].id });
    redirect('/', RedirectType.replace);

    // return { status: 'success', user: users[0] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: 'failed', error: 'invalid_data' };
    }
    return { status: 'failed' };
  }
};

export const register = async (state: any, formData: FormData) => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    const { data = [], error } = await getUser(validatedData.email);

    if (data && data.length) {
      return { status: 'failed', error: 'user_exists' };
    }

    await createUser(validatedData.email, validatedData.password);

    const fd = new FormData();
    fd.append('email', validatedData.email);
    fd.append('password', validatedData.password);
    await login(null, fd);

    return { status: 'success' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: 'failed', error: 'invalid_data' };
    }

    return { status: 'failed' };
  }
};
