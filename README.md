# Overview

- [Screenshots](#screenshots)
- [Installation & Execution](#installation--execution)
- [Application Architecture](#application-architecture)
- [Suggested Improvements](#suggested-improvements)
- [Dependencies & Justification for Their Usage](#dependencies--justification-for-their-usage)

This application enables users to search for their preferred GitHub repositories and add them to a favorites list.

The application is developed using React (with Vite) and TypeScript, incorporating MUI for the user interface and React Query for data fetching and caching.

## Screenshots

![Example of regular usage](https://raw.githubusercontent.com/AlexLomm/favorite-repos/main/screenshots/empty-state.png)

![Example with bottom sheet](https://raw.githubusercontent.com/AlexLomm/favorite-repos/main/screenshots/filled-state.png)

## Installation & Execution

1. Launch the server:

```bash
docker run -p 8080:8080 gcr.io/hiring-278615/reposerver:v1.1
```

2. Launch the client:

- With Docker:

```bash
docker build . -t favorite-repos
docker run -p 3000:3000 favorite-repos
```

- Without Docker:

```bash
npm install
npm run preview
```

3. Navigate to [localhost:3000](http://localhost:3000) to view the project.

## Application Architecture

The application is constructed using React (with Vite) and TypeScript, and employs MUI and Emotion for the user interface, as well as React Query for data fetching and caching. An in-depth explanation of these dependencies is provided below.

The application is divided into the following primary components:

1. `components`: Contains all shared components utilized within the app.
2. `pages`: Stores the app's pages. Although the app consists of a single page, this separation facilitates scalable organization between pages and shared components. The current app only features a "Home" page.
3. `api`: Includes API calls to the server and schema validation logic (powered by Zod) to provide "guaranteed" types for the app.
4. `hooks`: Houses the custom hooks employed throughout the app.
5. `utils`: Stores utility functions used throughout the app.
6. `models`: Contains TypeScript interfaces and schemas for the "models" used in the app, as well as dedicated models for GitHub-specific requests and custom server-specific requests.

## Suggested Improvements

1. Testing: Due to time constraints, tests were not implemented. However, tests are crucial for any production application and should be added.
2. Error Handling: Although the app includes substantial error handling, incorporating `ErrorBoundaries` would further enhance its robustness.
3. Environment Variables: The setup of environment variables was not completed, but it would be beneficial to include variables for aspects such as the server URL.

## Dependencies & Justification for Their Usage

1. [MUI](https://mui.com/material-ui/react-autocomplete/): MUI was chosen due to its popularity as a Material design library for React. It offers a quick start for the UI and ensures a consistent appearance throughout the app.
    - [Emotion](https://emotion.sh/): Emotion is a required dependency for MUI. As it would be included regardless, it was utilized in the app.
2. [React Query](https://react-query.tanstack.com/): React Query was employed for data fetching and caching. It is a popular library for this purpose and is considered an industry standard.
3. [React Router](https://reactrouter.com/): React Router was used for handling routing.
4. [Zod](https://github.com/colinhacks/zod): Schema validation library that I used to validate the data coming from the server. This is a good practice, because the it avoids assumptions about the type of data that is coming from the server and makes the code more robust.
