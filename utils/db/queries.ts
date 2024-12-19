import 'server-only';

import { config } from 'dotenv';
// import postgres from 'postgres';
// import { drizzle } from 'drizzle-orm/postgres-js';
import { genSaltSync, hashSync } from 'bcrypt-ts';

// import {
//   user,
//   chat,
//   message,
//   document,
//   type User,
//   type Message,
// } from './schema';
// import { eq, desc, asc } from 'drizzle-orm';
import { createClient } from '../supabase/server';

config({ path: '.env.local' });

// const client = postgres(process.env.POSTGRES_URL!, { prepare: false });
// const db = drizzle(client);

export const getUser = async (email: string) => {
  const supabase = await createClient();
  try {
    // return await db.select().from(user).where(eq(user.email, email));
    return await supabase.from('User').select().eq('email', email);
  } catch (error) {
    console.error('Failed to get user from database', error);
    throw error;
  }
};

export const createUser = async (email: string, password: string) => {
  const supabase = await createClient();
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  try {
    return await supabase.from('User').insert({ email, password: hash });
  } catch (error) {
    console.error('Failed to create user in database');
    throw error;
  }
};

export const saveChat = async ({
  id,
  userId,
  title,
}: {
  id: string;
  userId: string;
  title: string;
}) => {
  const supabase = await createClient();
  try {
    return await supabase.from('Chat').insert({
      id,
      createdAt: new Date(),
      userId,
      title,
    });
  } catch (error) {
    console.error('Failed to save chat in database');
    throw error;
  }
};

export const deleteChatById = async ({ id }: { id: string }) => {
  const supabase = await createClient();

  try {
    await supabase.from('Message').delete().eq('chatId', id);

    return await supabase.from('Chat').delete().eq('id', id);
  } catch (error) {
    console.error('Failed to delete chat by id from database');
    throw error;
  }
};

export const getChatsByUserId = async ({ id }: { id: string }) => {
  const supabase = await createClient();
  try {
    return await supabase
      .from('Chat')
      .select()
      .eq('userId', id)
      .order('createdAt', { ascending: false });
  } catch (error) {
    console.error('Failed to get chats by user from database');
    throw error;
  }
};

export const getChatById = async ({ id }: { id: string }) => {
  const supabase = await createClient();
  try {
    return await supabase.from('Chat').select().eq('id', id);
  } catch (error) {
    console.error('Failed to get chat by id from database');
    throw error;
  }
};

export const saveMessages = async (message: {
  chatId: string;
  role: string;
  content: string;
  createdAt: string;
}) => {
  const supabase = await createClient();
  try {
    return await supabase.from('Message').insert(message);
  } catch (error) {
    console.error('Failed to save messages in database', error);
    throw error;
  }
};

export const getMessagesByChatId = async ({ id }: { id: string }) => {
  const supabase = await createClient();

  try {
    return await supabase
      .from('Message')
      .select()
      .eq('chatId', id)
      .order('createdAt', { ascending: true });
  } catch (error) {
    console.error('Failed to get messages by chat id from database', error);
    throw error;
  }
};
