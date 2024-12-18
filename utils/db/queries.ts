import 'server-only';

import { config } from 'dotenv';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { genSaltSync, hashSync } from 'bcrypt-ts';

import {
  user,
  chat,
  message,
  document,
  type User,
  type Message,
} from './schema';
import { eq, desc, asc } from 'drizzle-orm';

config({ path: '.env.local' });

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle({ client });

export const getUser = async (email: string): Promise<Array<User>> => {
  try {
    return await db.select().from(user).where(eq(user.email, email));
  } catch (error) {
    console.error('Failed to get user from database');
    throw error;
  }
};

export const createUser = async (email: string, password: string) => {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  try {
    return await db.insert(user).values({ email, password: hash });
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
  try {
    return await db.insert(chat).values({
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
  try {
    await db.delete(message).where(eq(message.chatId, id));

    return await db.delete(chat).where(eq(chat.id, id));
  } catch (error) {
    console.error('Failed to delete chat by id from database');
    throw error;
  }
};

export const getChatsByUserId = async ({ id }: { id: string }) => {
  try {
    return await db
      .select()
      .from(chat)
      .where(eq(chat.userId, id))
      .orderBy(desc(chat.createdAt));
  } catch (error) {
    console.error('Failed to get chats by user from database');
    throw error;
  }
};

export const getChatById = async ({ id }: { id: string }) => {
  try {
    const [selectedChat] = await db.select().from(chat).where(eq(chat.id, id));
    return selectedChat;
  } catch (error) {
    console.error('Failed to get chat by id from database');
    throw error;
  }
};

export const saveMessages = async ({
  messages,
}: {
  messages: Array<Message>;
}) => {
  try {
    return await db.insert(message).values(messages);
  } catch (error) {
    console.error('Failed to save messages in database', error);
    throw error;
  }
};

export const getMessagesByChatId = async ({ id }: { id: string }) => {
  try {
    return await db
      .select()
      .from(message)
      .where(eq(message.chatId, id))
      .orderBy(asc(message.createdAt));
  } catch (error) {
    console.error('Failed to get messages by chat id from database', error);
    throw error;
  }
};
