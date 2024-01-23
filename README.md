# blogApp

Blog connected to a database with the ability to create new posts, as well as filter them by author, content, or title.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, clone this repo using https://github.com/ferbragon/blogApp.git or the options provided by GitHub.

Second, instal the dependencies with

```bash
npm install
```

Third, Create an SQL database in PostgreSQL.

Fourth, Create a .env file with the following parameters:

```bash
// Postgres link examples:
postgresql://postgres:v******p@c*******p:***9/l***l
postgresql://DB_USER:DB_PASSWORD@DB_HOST:DB_PORT/DB_NAME

ENVIRONMENT=DEVELOP
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_NAME=
DB_URL=postgres://p*****s:3****l@localhost:5***/***

NEXT_PUBLIC_DOMAIN=http://localhost:3000/
```

Fifth, run the database by executing npm run syncDB in the console. Optionally, you can populate the database using the npm run seed command.

Sixth, run the development server:

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
