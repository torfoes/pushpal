## Introduction
PushPal is an application for managing organizations and sending push notifications to groups of individuals. 

## Requirements

### User Requirements

- **Compatibility:** Works across all major browsers on both desktop and mobile devices.

### Development Requirements

- **Node.js:** Version 20
- **Docker:** For containerization and environment setup

## External Dependencies

- **Docker:** Containerization platform
- **Heroku CLI:** For deployment
- **Git:** Version control system


## Setup
### Backend (Ruby on Rails)
- Ensure Docker is installed. If not, [install Docker](https://docs.docker.com/get-docker/).


**Running the Backend:**
```sh
cd backend
docker compose up -d
docker exec -it pushpal_backend /bin/bash
cd csce431
bundle install
rails db:create
rails db:migrate
rails server --binding=0.0.0.0
```

### Frontend (Node.js)

**Prerequisites:**

- **Node.js:** Ensure you have Node.js (version 20) installed. You can download it from the [official website](https://nodejs.org/).

**Install Dependencies:**

Navigate to the `frontend` directory and install the necessary packages:

**Install Dependencies:**
```sh
cd frontend
npm install
```

**Start the Frontend:**
```sh
npm run dev
```

## Usage

Once both the backend and frontend servers are running, you can access PushPal by navigating to [http://localhost:3001](http://localhost:3001/) in your web browser.

### Features

- **Organization Management:** Create, update, and delete organizations.
- **Push Notifications:** Send targeted push notifications to selected groups.
- **User Authentication:** Secure login with Google OAuth.


## Deployment
Setup a Heroku account: https://signup.heroku.com/
From the heroku dashboard select `New` -> `Create New Pipline`
Name the pipeline, and link the respective git repo to the pipline
Our application does not need any extra options, so select `Enable Review Apps`
right away
Click `New app` under review apps, and link your test branch from your repo
Under staging app, select `Create new app` and link your main branch from your repo


# Environment Variables

This application requires the following environment variables to function properly. Create a `.env` file in the root directory and populate it with the values below.

## Required Variables - Frontend

- **`NEXT_PUBLIC_VAPID_PUBLIC_KEY`**

  Your VAPID public key for push notifications.

- **`VAPID_PRIVATE_KEY`**

  Your VAPID private key (keep this secret).

- **`VAPID_SUBJECT`**

  Contact email for VAPID.

- **`NEXT_PUBLIC_RAILS_SERVER_URL`**

  URL of your Rails backend server.

- **`NEXT_PUBLIC_BASE_URL`**

  Base URL of your frontend application.

- **`NEXTAUTH_URL`**

  URL used by NextAuth.js for authentication.

- **`NEXT_PUBLIC_AUTHJS_SESSION_COOKIE`**

  Name of the Auth.js session cookie.

- **`AUTH_TRUST_HOST`**

  Trusted host for authentication.

- **`AUTH_GOOGLE_ID`**

  Google OAuth Client ID.

- **`AUTH_GOOGLE_SECRET`**

  Google OAuth Client Secret.

- **`AUTH_SECRET`**

  Secret key for signing authentication tokens.

## Required Variables - Backend

- **`VAPID_PUBLIC_KEY`**

  Your VAPID public key for push notifications.

- **`VAPID_PRIVATE_KEY`**

  Your VAPID private key (keep this secret).

- **`VAPID_SUBJECT`**

  Contact email for VAPID.

- **`AUTH_SECRET`**

  Secret key for signing authentication tokens.

- **`NEXT_PUBLIC_AUTHJS_SESSION_COOKIE`**

  Name of the Auth.js session cookie.

The frontend and backend MUST share the same AUTH_SECRET enviroment variable. This is how we authenticate requests.


## Additional Notes

https://ui.shadcn.com/docs/components/form

This is a good guide for implementing forms with validation. You guys might check out this tutorial

Also, if you are confused about routing and anything regarding nextjs,
https://nextjs.org/docs/


## Support
The support of this app has been officially closed as the support team has been
reassigned to other projects. No major features remain for development and any bugs
are no longer responsibility of the dev team.
## References
https://stackoverlfow.com

https://chat.openai.com

https://guides.rubyonrails.org/index.html

## Extra Help

For additional assistance with the PushPal application, please feel free to contact any of our development team members:

- **Karlos Zurutuza**
  karlos.zurutuza@tamu.edu
- **Jack Roehr**
  jroehr@tamu.edu
- **Darren Collingwood**
  dlcollingwood@tamu.edu
- **Ali Mahdavi**
  a.mahdavi@tamu.edu

### Additional Support

More detailed support information can be found in the Developer Support Guide:

[PushPal Developer Support Guide](https://drive.google.com/file/d/1MIv5h_KS2uDZ0SBOo-1xTVZ4Clc7G8rW/view?usp=sharing)

If you still have questions or need further assistance, don't hesitate to reach out to our development team.
