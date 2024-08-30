## GravyWork Services V3 ##

This project contains following

- REST API with [MongoDB](https://www.mongodb.com) support
- Swagger documentation, [Joi](https://github.com/hapijs/joi) validation
- Docker
- Node v18 (for local only)

## 1. Requirements

Install and setup Docker on your local environment

## 2. Setup

2.1. Make a copy of the example environment variables file.

On Linux systems:

```bash
$ cp .env.example .env
```

On Windows:

```powershell
$ copy .env.example .env
```

2.2. Configure your environment variables in the newly created `.env` file.

For a standard development configuration, you can use the default values and configure only the OpenAi and MongoDb variables.

## 3. Env Example

```
MONGO_DB_HOST=mongodb://127.0.0.1:27017
MONGO_DB_NAME=gw_storage

APP_PORT=3001
APP_ENV=local

DB_PORT=3306
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=blank123
DB_NAME=graphy_dev

JWT_ACCESS_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d
JWT_ACCESS_SECRET=STRONG-KEY-HERE
JWT_REFRESH_SECRET=ANOTHER-STRONG-KEY-HERE

OPENAI_API_KEY=sk-your-openai-key
OPENAI_ORG_ID=org-your-open-ai-org-id

```

## How to add new files

```
cd src
# following will generate a new module named "prompt" in the modules folder
npx nest generate module modules/prompt

```

other things that you can add are:

```
Schematics available on @nestjs/schematics collection:
    ┌───────────────┬─────────────┬──────────────────────────────────────────────┐
    │ name          │ alias       │ description                                  │
    │───────────────┴─────────────┴──────────────────────────────────────────────│
    │ application   │ application │ Generate a new application workspace         │
    │ class         │ cl          │ Generate a new class                         │
    │ configuration │ config      │ Generate a CLI configuration file            │
    │ controller    │ co          │ Generate a controller declaration            │
    │ decorator     │ d           │ Generate a custom decorator                  │
    │ filter        │ f           │ Generate a filter declaration                │
    │ gateway       │ ga          │ Generate a gateway declaration               │
    │ guard         │ gu          │ Generate a guard declaration                 │
    │ interceptor   │ itc         │ Generate an interceptor declaration          │
    │ interface     │ itf         │ Generate an interface                        │
    │ library       │ lib         │ Generate a new library within a monorepo     │
    │ middleware    │ mi          │ Generate a middleware declaration            │
    │ module        │ mo          │ Generate a module declaration                │
    │ pipe          │ pi          │ Generate a pipe declaration                  │
    │ provider      │ pr          │ Generate a provider declaration              │
    │ resolver      │ r           │ Generate a GraphQL resolver declaration      │
    │ resource      │ res         │ Generate a new CRUD resource                 │
    │ service       │ s           │ Generate a service declaration               │
    │ sub-app       │ app         │ Generate a new application within a monorepo │
    └───────────────┴─────────────┴──────────────────────────────────────────────┘
```

# Docker Local Setup

First setup docker proxy project and run it

```
git clone https://github.com/gravywork/gravy-proxy.git
cd gravy-proxy
docker-compose up
```

Run migration or Only run the project (for fast load)

You can change the Dockerfile.dev

```
# migrate-and-run | run-only
# run only makes sub sequent loads faster during development
CMD [ "npm", "run", "run-only" ]


```

Run the project with following command:

```
docker-compose up --build
```

# Create new Migration [Caution: requires docker setup]

To create a new migration in src/migrations folder with name TestABC-<timestamp> run following command

```
npm run create-migration --name=TestABC
```

To generate a new migration based on a Model file entity that you have just created:

```
npm run docker:generate-migration  --name=TestABC
```

To run migrations

```
npm run docker:run-migrations
```

## Push to ECR

```
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 300360094850.dkr.ecr.us-east-1.amazonaws.com
```

```
docker build -t dev-v3-services-ecr . -f Dockerfile
```

```
docker tag dev-v3-services-ecr:latest 300360094850.dkr.ecr.us-east-1.amazonaws.com/dev-v3-services-ecr:latest
```

```
docker push 300360094850.dkr.ecr.us-east-1.amazonaws.com/dev-v3-services-ecr:latest
```

## Configure Request Throttle

Request throttling has been configured at the global level inside `app.module.ts` file using the `@nestjs/throttler` package.

Values to configure the throttler modules are defined in environment variables as follows:

- `APP_THROTTLE_RESET_MILLISECONDS` - Defines the number of milliseconds when the throttler reset its value
- `APP_THROTTLE_REQUEST_COUNT` - Defines the number of requests allowed in a time defined in `APP_THROTTLE_RESET_MILLISECONDS`

In order to exclude a particular controller or a controller method from a global configuration you can use these 2 decorators defined as follows:

- `@SkipThrottle()` - This will skip the throttling on either a class or a route depending on which level it is used.
- `@Throttle({default: {limit: 3, ttl: 60000}})`- This will override the global configuration at the route or a class level and set the new values

You can find more details about the configuration of throttler module [here](https://www.npmjs.com/package/@nestjs/throttler).

### run github actions locally

- Install `act` locally https://nektosact.com/installation/index.html
- to run ci github action `act --job build -W "./.github/workflows/ci.yaml"`
- to run unit-test-ci github action `act --job build_and_test -W "./.github/workflows/unit-test-ci.yaml"`
- to run any other action pass env variables and name of file workflow accordingly
