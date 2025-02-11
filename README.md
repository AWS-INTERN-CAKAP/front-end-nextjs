# Next.js Project Documentation

This project is built using Next.js, a React framework for building fast, scalable web applications. This guide provides you with the steps to set up and start your Next.js project, along with some basic explanations and resources for learning more.

## Prerequisites

Before you start, ensure that you have the following installed on your system:

- **Node.js**: Next.js requires Node.js to run. You can download it from [nodejs.org](https://nodejs.org).
- **Package Manager**: You can use npm (default with Node.js), yarn, pnpm, or bun as a package manager.

## Installing Next.js with create-next-app

To get started with Next.js, you need to create a new project. The easiest way to do this is by using `create-next-app`, which sets up a new Next.js application for you with all the necessary configurations.

Run the following commands to create a new Next.js app:

```bash
# Using npx (npm 5.2+)
npx create-next-app@latest front-end-nextjs
# or using yarn
yarn create next-app front-end-nextjs
# or using pnpm
pnpm create next-app front-end-nextjs
# or using bun
bun create next-app front-end-nextjs
```

## Project Structure

The project structure for this Next.js application is as follows:

```
front-end-nextjs/
├── .gitignore
├── .env
├── index.html
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── src/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   │   └── index.ts
│   └── vite-env.d.ts
```

## Getting Started

### 1. Install Dependencies

Navigate to your project directory:

```bash
cd your-project-name
```

Then, install the project dependencies by running:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 2. Start the Development Server

To start the development server, run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The server will start, and you can access the application at [http://localhost:5173](http://localhost:5173).

If you want to expose the server to your local network, change the `vite.config.ts` file to listen on all IP addresses like this:

```ts
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0', // Expose the server to the local network
    port: 5173, // Port configuration
    strictPort: true, // Ensures the port stays the same
  },
});
```

After that, you can access the app on network IPs such as `http://192.168.x.x:5173/` or `http://172.27.x.x:5173/`.

### Learn More

To learn more about Next.js, check out these resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and APIs.
- [Learn Next.js](https://nextjs.org/learn) - An interactive tutorial for Next.js.
- [Next.js GitHub repository](https://github.com/vercel/next.js) - Contribute or report issues.

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), the platform created by the authors of Next.js.

For more information on deploying, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
