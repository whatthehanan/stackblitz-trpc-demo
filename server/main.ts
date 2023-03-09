import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import cors from 'cors';

const t = initTRPC.create();
const router = t.router;

// initialize router
const appRouter = router({
  hello: t.procedure.query(() => 'hello'),
});

const app = express();
app.use(cors());
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(4000);

// this export is used in the client
// for trpc the recommended way is projects where server and client are in the same directory
// but I'd assume you could also publish this type in a custom package which the client could use, extra steps to set up ofc
export type AppRouter = typeof appRouter;
