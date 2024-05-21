# GardaWorld as-frontend template

## Description 📝

This is a Next.js 13 template that serves as a starting point for building web applications.

## Dependencies 🛠️

- **Next.js 13.5.4**: Typescript - Yes, ESLint - Yes, src directory - No, App Router - Yes
- **Axios**: @axios
- **Material UI**: @mui/material @emotion/react @emotion/styled @mui/icons-material
- **Tailwind**: tailwindcss@3.3.3

## Garda Colors 🌈

Garda colors are saved in the CSS config files, and we can use them in our classname as `text-gwColor-primary01`
or `bg-gwColor-primary01`. Here is the list:

<div style="display: flex; flex-wrap: wrap;">
  <div style="background-color: RGBA(213, 43, 30, 1); width: 50px; height: 30px;"></div>
  <div style="margin-left: 10px;">--garda-primary01-color: RGBA(213, 43, 30, 1)</div>
</div>

<div style="display: flex; flex-wrap: wrap;">
  <div style="background-color: RGBA(116, 118, 120, 1); width: 50px; height: 30px;"></div>
  <div style="margin-left: 10px;">--garda-primary02-color: RGBA(116, 118, 120, 1)</div>
</div>

<div style="display: flex; flex-wrap: wrap;">
  <div style="background-color: RGBA(213, 214, 210, 1); width: 50px; height: 30px;"></div>
  <div style="margin-left: 10px;">--garda-neutral01-color: RGBA(213, 214, 210, 1)</div>
</div>

<div style="display: flex; flex-wrap: wrap;">
  <div style="background-color: RGBA(205, 198, 192, 1); width: 50px; height: 30px;"></div>
  <div style="margin-left: 10px;">--garda-neutral02-color: RGBA(205, 198, 192, 1)</div>
</div>

<div style="display: flex; flex-wrap: wrap;">
  <div style="background-color: RGBA(0, 0, 0, 1); width: 50px; height: 30px;"></div>
  <div style="margin-left: 10px;">--garda-neutral03-color: RGBA(0, 0, 0, 1)</div>
</div>

<div style="display: flex; flex-wrap: wrap;">
  <div style="background-color: RGBA(255, 255, 255, 1); width: 50px; height: 30px;"></div>
  <div style="margin-left: 10px;">--garda-neutral04-color: RGBA(255, 255, 255, 1)</div>
</div>

<div style="display: flex; flex-wrap: wrap;">
  <div style="background-color: RGBA(60, 60, 74, 1); width: 50px; height: 30px;"></div>
  <div style="margin-left: 10px;">--garda-charcoal-color: RGBA(60, 60, 74, 1)</div>
</div>

<div style="display: flex; flex-wrap: wrap;">
  <div style="background-color: RGBA(109, 51, 50, 1); width: 50px; height: 30px;"></div>
  <div style="margin-left: 10px;">--garda-dark-red-color: RGBA(109, 51, 50, 1)</div>
</div>

<div style="display: flex; flex-wrap: wrap;">
  <div style="background-color: RGBA(178, 180, 179, 1); width: 50px; height: 30px;"></div>
  <div style="margin-left: 10px;">--garda-grey-color: RGBA(178, 180, 179, 1)</div>
</div>

<div style="display: flex; flex-wrap: wrap;">
  <div style="background-color: RGBA(234, 167, 148, 1); width: 50px; height: 30px;"></div>
  <div style="margin-left: 10px;">--garda-rust-color: RGBA(234, 167, 148, 1)</div>
</div>

<div style="display: flex; flex-wrap: wrap;">
  <div style="background-color: RGBA(225, 226, 224, 1); width: 50px; height: 30px;"></div>
  <div style="margin-left: 10px;">--garda-light-grey-color: RGBA(225, 226, 224, 1)</div>
</div>

<div style="display: flex; flex-wrap: wrap;">
  <div style="background-color: RGBA(109, 51, 50, 1); width: 50px; height: 30px;"></div>
  <div style="margin-left: 10px;">--garda-critical-color: RGBA(109, 51, 50, 1)</div>
</div>

<div style="display: flex; flex-wrap: wrap;">
  <div style="background-color: RGBA(12, 345, 678, 1); width: 50px; height: 30px;"></div>
  <div style="margin-left: 10px;">--garda-high-servere-color: RGBA(12, 345, 678, 1)</div>
</div>

<div style="display: flex; flex-wrap: wrap;">
  <div style="background-color: RGBA(60, 60, 74, 1); width: 50px; height: 30px;"></div>
  <div style="margin-left: 10px;">--garda-high-substantial-color: RGBA(60, 60, 74, 1)</div>
</div>

<div style="display: flex; flex-wrap: wrap;">
  <div style="background-color: RGBA(116, 118, 120, 1); width: 50px; height: 30px;"></div>
  <div style="margin-left: 10px;">--garda-medium-color: RGBA(116, 118, 120, 1)</div>
</div>

<div style="display: flex; flex-wrap: wrap;">
  <div style="background-color: RGBA(178, 180, 179, 1); width: 50px; height: 30px;"></div>
  <div style="margin-left: 10px;">--garda-low-color: RGBA(178, 180, 179, 1)</div>
</div>

<div style="display: flex; flex-wrap: wrap;">
  <div style="background-color: RGBA(225, 226, 224, 1); width: 50px; height: 30px;"></div>
  <div style="margin-left: 10px;">--garda-minimal-color: RGBA(225, 226, 224, 1)</div>
</div>

<div style="display: flex; flex-wrap: wrap;">
  <div style="background-color: RGBA(234, 198, 192, 1); width: 50px; height: 30px;"></div>
  <div style="margin-left: 10px;">--garda-severe-color: RGBA(234, 198, 192, 1)</div>
</div>

<div style="display: flex; flex-wrap: wrap;">
  <div style="background-color: RGBA(205, 198, 192, 1); width: 50px; height: 30px;"></div>
  <div style="margin-left: 10px;">--garda-substantial-color: RGBA(205, 198, 192, 1)</div>
</div>

### Folder and file structure 🏢

    as-nextjs-examples/
    ├── .next/ # Auto-generated by Next.js build files
    ├── app/
    │ ├── api/ # API routes
    │ ├── components/
    │ │ ├── loading.tsx
    │ │ ├── page.tsx
    │ │ ├── navbar.tsx
    │ │ └── loadingPage.tsx
    │ ├── locale/ # internationalization (i18n) and localization (l10n)
    │ ├── Next-page/ # loading demo page folder
    │ │ └── loadingPage.tsx
    │ ├── util/ # Custom utilities and functions
    │ ├── .env.local
    │ ├── error.tsx # error page
    │ ├── favicon.ico
    │ ├── global.css # CSS configuration
    │ ├── layout.tsx # Layout page with navbar
    │ ├── loading.tsx # Loading page
    │ └── page.tsx # Index/main page
    ├── node_modules/ # Node.js modules and packages
    ├── public/ # Static files
    │ ├── garda-lion-logo
    │ └── garda-name-logo
    ├── .eslint/
    ├── .gitignore/
    ├── next-env.d.ts/
    ├── next.config.js/
    ├── package-lock.json/
    ├── package.json/ # Node.js dependencies and scripts
    ├── postcss.config.js/
    ├── README.md # Project documentation
    ├── tailwind.config.js/ # Tailwind configuration file
    └── tsconfig.json # TypeScript configuration file

### Naming Conventions 🚧

In this project, we follow specific naming conventions to maintain consistency and readability. Please adhere to the
following conventions:

- **Kebab Casing**: Use kebab-case (lowercase with hyphens) when naming folders and files. For example, name a folder
  as `first-name` or a file as `first-name.tsx`. This convention helps with file and folder naming consistency.

- **Camel Casing**: Use camelCase (initial lowercase, with subsequent words capitalized) when naming functions and
  variables. For example, `myFunction` or `myVariable`.

### Folder Structure 📂

Here's an overview of the key directories and their purposes:

- `/components`: React components for building your application's user interface.

- `/public`: Static files (e.g., images, fonts) accessible through the server. Garda logo's are saved as garda-lion-logo
  and garda-name-seal-logo.

- `/util`: Utility functions and helper scripts.

- `/api`: API routes for creating serverless functions.

- `/locale`: Translation files for internationalization.

The above folders are not routable, please do not create a page.tsx or route.tsx file in this folder

## Setup Instruction 🛠️

1. **Navigate to the `frontend/` directory**.
   ```bash
   cd frontend
   ```
2. **Install the required npm packages**.
   ```bash
   npm install
   ```
3. **Create a new `.env.local` file**.
    - You can use `sample.env.local` as a reference.
   ```bash
   cp sample.env.local .env.local
   ```
4. **Fill in the values in `.env.local`**.

    - Open `.env.local` in your text editor and fill in the appropriate values for `API_KEY`.

5. **Run the Next.js development server**.
   ```bash
   npm run dev
   ```

## Notes 📝

- When `NODE_ENV` is set to `development`, login flow is not required. In all other cases, login flow is required.

## Fun Debates 🍎 vs 🤖

- No debate because 🤖 is so much better

Happy Coding! 🎉
