# Ducking MVP

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

Notes:

1. We are going to build most pages as client pages. This is primarily because of the offline nature of the product.
