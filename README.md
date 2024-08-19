
# ConnectStud Frontend

## Project Overview

ConnectStud is a Final Year Project (FYP) developed to create a marketplace platform that connects users. The frontend of this platform is built using React, providing a user-friendly interface for interacting with the various features of the platform, such as user authentication, community interaction, and event management.

## Features

- **User Authentication:** Allows users to register, log in, and manage their sessions securely.
- **Dashboard:** A personalized dashboard displaying events, communities, and connection requests.
- **Community Interaction:** Users can join communities, post content, and interact with other members.
- **Profile Management:** Users can edit their profiles, upload profile pictures, and view connection requests.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Faizanmoriani2/ConnectStud
   cd connectstud-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   - Create a `.env` file in the root directory and configure the following variables:

     ```
     REACT_APP_API_URL=http://localhost:5000/api
     ```

## Environment Variables

| Variable         | Description                                      | Example                     |
|------------------|--------------------------------------------------|-----------------------------|
| `REACT_APP_API_URL` | URL of the backend API                           | http://localhost:5000/api   |

## Available Scripts

In the project directory, you can run:

- **`npm start`**

  Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- **`npm test`**

  Launches the test runner in the interactive watch mode.

- **`npm run build`**

  Builds the app for production to the `build` folder.

- **`npm run eject`**

  Removes the single build dependency from your project.

## Project Structure

```
connectstud-frontend/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   ├── styles/
│   ├── App.js
│   ├── index.js
│   ├── routes/
│
├── .env
├── package.json
└── README.md
```

- **`components/`**: Reusable components used across the application.
- **`pages/`**: Different page components representing the views like Dashboard, Profile, Events, etc.
- **`styles/`**: Contains CSS and styled-components for the app.
- **`routes/`**: Routing components for navigating between different pages.
- **`utils/`**: Utility functions used across the application.

## Routes

- **`/login`**: User login page
- **`/register`**: User registration page
- **`/community/:id`**: Community details page
- **`/messages/:userId`**: Messaging page with chat history and new message input
- **`/profile/:id`**: User profile page with edit functionality
- **`/events/:id`**: Event details page

## Usage

1. **Running the app:**

   ```bash
   npm start
   ```

   This will start the frontend server on [http://localhost:3000](http://localhost:3000).

2. **Interacting with the Backend:**

   Ensure the backend server is running at the specified `REACT_APP_API_URL`. The frontend communicates with the backend for user authentication, data retrieval, and other features.

## Contributing

Contributions are welcome! Please follow the standard Git workflow:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a pull request