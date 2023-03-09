import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../server/main';

async function main() {
  const client = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: 'https://hanantrpc-cswr--4000.local-credentialless.webcontainer.io/trpc',
      }),
    ],
    transformer: null,
  });

  const res = await client.hello.query();

  console.log({
    ['api response']: res,
  });
}

main();
