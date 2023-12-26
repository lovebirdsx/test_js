import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';

//     👆 **type-only** import
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
    }),
  ],
});

async function main() {
  const user = await trpc.userById.query('1');
  if (!user) {
    console.log(`User not found for id 1`);
    return;
  }
  console.log(`User found: ${user.name}`);

  const users = await trpc.userList.query();
  console.log(`Users: ${users.map((u) => u.name).join(', ')}`);

  const user3 = await trpc.userCreate.mutate({
    name: 'Carol',
  });
  console.log(`Created user: ${user3.name}`);

  const users2 = await trpc.userList.query();
  console.log(`Users: ${users2.map((u) => u.name).join(', ')}`);
}

main();
