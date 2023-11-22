'use server';

import { auth } from 'lib/auth';
import { type Session } from 'next-auth';
import { queryBuilder } from 'lib/planetscale';
import { revalidatePath } from 'next/cache';

export async function increment(slug: string) {
  const data = await queryBuilder
    .selectFrom('views')
    .where('slug', '=', slug)
    .select(['count'])
    .execute();

  const views = !data.length ? 0 : Number(data[0].count);

  await queryBuilder
    .insertInto('views')
    .values({ slug, count: 1 })
    .onDuplicateKeyUpdate({ count: views + 1 })
    .execute();
  return;
}

async function getSession(): Promise<Session> {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error('Unauthorized');
  }

  return session;
}
