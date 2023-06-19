# Lang AI - English Assessment Tool

The purpose of this project is to simplify the process of assessing the English level of Wizeline candidates and employees. In order to achieve this, we created a web application where Wizeline employees can practice and evaluate their level of English.

Working with Wizeline, we implemented the OpenAI tool and its Whisper library for voice recognition to analyze and estimate employee results.

# Solution implemented
A container was created in AWS lightsail for the deployment of the application, said container already has the dependencies installed and configured to run the application.

https://dev-langai.e2e271jfqq7g6.us-east-1.cs.amazonlightsail.com/


# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guide for [Docker](https://create.t3.gg/en/deployment/docker) for more information..

After setting up docker with postgres. Run
```
npm install
```

## Environment Variables
Create an `.env` file on root. 

```
# When adding additional environment variables, the schema in "/src/env.mjs"
# should be updated accordingly.

# Prisma
# https://www.prisma.io/docs/reference/database-reference/connection-urls#env
#DATABASE_URL=
DATABASE_URL=

# Next Auth
# You can generate a new secret on the command line with:
# openssl rand -base64 32
# https://next-auth.js.org/configuration/options#secret
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Next Auth Providers
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

AUTH0_BASE_URL=
AUTH0_ISSUER=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=

# AWS
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
AWS_S3_BUCKET=

# OpenAI
OPENAI_API_KEY=
```
Ask for the `.env` values to the colabs.

# Database setup
Initialize database
```
npx prisma generate
npx prisma db push
npx prisma db seed
```
To validate the schema without errors
```
prisma validate 
```
Initialize server:
```
npm run dev
```

# Environments

### **Main**
This project was created in the `main` branch, which is the local environment.

### **Tests**
We created a container in Lightsail AWS, which is already configurated to run our tests. These can be found in the `main` branch in the cypress folder. 
More info can be found here [Deploy to AWS Lightsail](https://github.com/wizelineacademy/itesm-socioformador-ene-feb-2023-equipo-4/wiki/Deploy-to-AWS-Lightsail)

### **Dev**
We created a container in Lightsail AWS, which is already configurated to deploy the app. The branch for this environment is `dev`.
More info can be found here [Deploy to AWS Lightsail](https://github.com/wizelineacademy/itesm-socioformador-ene-feb-2023-equipo-4/wiki/Deploy-to-AWS-Lightsail)

# CI
### **Cypress**
We use Cypress for End-to-End and Unitary testing. These can be found in the `main` branch in the cypress folder. To run these tests in development use npm run test.

