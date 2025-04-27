## Instalation and usage:
- git clone and cd into root folder
- start the database service: docker compose up -d
- npm install
- create a .env file (update the values below)

```sh
# .env
PORT=5433
DB_URL=postgres://username:password@localhost:5432/database_name
```
## To seed the database:
-node ./database/setup.js
-npm run start

## Available endpoints
- GET /people/:id
- GET /wrongs

## Debug flow:
3000 -> routes -> controllers -> models/DB
Index = Everything
, Show = Just one
, New[form]*
, Create,
 Edit[form]*
, Update
, Destroy

* = we do not need

