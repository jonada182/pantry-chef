# PantryChef

Unleash the true potential of your pantry with **PantryChef**. No more wondering what to cook with the random assortment of ingredients you have on hand. Simply select the products you've got, and let our cutting-edge OpenAI integration generate delicious recipes tailored just for you. Manage your ingredients, save your favorite recipes, and discover culinary creations you never imagined—all in one app.

[**Demo**](https://pantry-chef.netlify.app)

## Getting Started

1.  Clone this repository
2.  Install dependencies using `npm install`
3.  (Optional) Create a `.env.local` file in the root directory with the following content:
```
    APP_API_BASE_URL="http://localhost:8000"
    APP_MOCK_API=false
    FIREBASE_API_KEY=""
```
4.  Start the development server using `npm run dev`
5.  Open your browser and go to `http://localhost:3000`

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br /> Open [http://localhost:3000](http://localhost:3000/) to view it in the browser.

The page will reload if you make edits.<br /> You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.<br /> It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br /> Your app is ready to be deployed!

### `npm start`

Runs the app in production mode. Make sure to build the app before running this command.

### `npm run lint`

Runs the ES linter to check for syntax errors and coding standards. The linter will report any issues in the console.

### `npm run test`

Runs all the tests with Jest.

## Environment Variables

This project uses the following environment variables:

### `APP_API_BASE_URL`

The base URL for the API. Default value is `http://localhost:8000`.

### `APP_MOCK_API`

A boolean value that determines whether to use a mock API response. `true` is recommended to get everything running. Default value is `false`.

### `FIREBASE_API_KEY`

Set up a Firebase app/project, and paste the API key here. Firebase is used to authenticate users.

## Using Docker for local development

Docker can help you set up a consistent and isolated environment for developing your Vite React app. You can use Docker to run your app in both development and production modes using `docker-compose`. Here's how to get started:

### Prerequisites

Before you get started, you'll need to have Docker and `docker-compose` installed on your machine. You can download Docker for free from the [official Docker website](https://www.docker.com/products/docker-desktop), and `docker-compose` is usually included with Docker.

#### Building the Docker image

```
docker-compose build

```

#### Run Docker container in Development mode

```
docker-compose up dev

```

#### Run Docker container in Production mode

```
docker-compose up prod

```

## Learn More

You can learn more about the Chat API in the [OpenAI documentation](https://platform.openai.com/docs/guides/chat)

You can learn more about Vite in the [Vite documentation](https://vitejs.dev/).

You can learn more about Typescript in the [Typescript documentation](https://www.typescriptlang.org/docs/home.html).

To learn React, check out the [React documentation](https://reactjs.org/docs/getting-started.html).
