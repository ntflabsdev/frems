# Backend (Express + TypeScript)

MVC with reusable Request/Response wrappers and status utilities.

## Scripts

- dev: `pnpm --filter frems-backend dev` or `npm run dev` inside `backend/`
- build: `npm run build`
- start: `npm run start`

## Env

Copy `.env.example` to `.env`.

## Structure

```
backend/
  src/
    core/               # reusable http, errors, types
    middleware/         # global middlewares
    modules/            # feature modules (MVC)
    routes/             # route registry
    app.ts              # express app
    server.ts           # bootstrap
```


