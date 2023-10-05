# Ducking MVP

## Steps to run the app:

1. Clone the repo
2. Run `yarn` to install dependencies
3. Copy .env.example to .env
4. Run `docker-compose up` to start the DB
5. Run `yarn dev` to start the app

## Useful commands

```bash
# Run the app (this will also run migrations):
$ yarn dev
# Run the DB:
$ docker-compose up
# Run a migration (prisma):
$ npx prisma migrate dev
# After running a migration, you need to generate the client:
$ npx prisma generate
```

## Steps to run a migration

1. Change the schema
2. Run `npx prisma migrate dev` to run the migration
3. Run `npx prisma generate` to generate the client

Note: If there are breaking changes caused by the migration, refer to the [documentation](https://www.prisma.io/docs/concepts/components/prisma-migrate) on ways to handle it.

## Local Development Scripts

1. If you need the hardcoded local organization, run `ts-node scripts/seedLocalOrganization.ts` from the root of the project

## Notes

1. We are going to build most pages as client pages. This is primarily because of the offline nature of the product.
