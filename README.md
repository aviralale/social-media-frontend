# Social Media Application Frontend

## Table of Contents
- [Social Media Application Frontend](#social-media-application-frontend)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
  - [Folder Structure](#folder-structure)
  - [Available Scripts](#available-scripts)
    - [`npm run dev`](#npm-run-dev)
  - [Customization](#customization)
    - [Tailwind CSS Configuration](#tailwind-css-configuration)
    - [Lucide Icons](#lucide-icons)
  - [Technologies Used](#technologies-used)

## Introduction
This is the frontend of a social media application built with React + Vite. It includes features for displaying posts, comments, replies, managing followers, user profiles, and real-time chat and notification functionalities using WebSocket.

## Features
- User authentication and profiles
- Post creation, commenting, and liking
- Follower and following system
- Real-time chat with WebSocket support
- Notifications system

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/aviralale/social-media-frontend.git
    cd social-media-frontend
    ```

2. Install the required dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your environment variables:
    ```env
    VITE_API_URL=http://127.0.0.1:8000/
    VITE_WEBSOCKET_URL=ws://127.0.0.1:8000/ws/
    ```

## Running the Project
To run the project in development mode, use the following command:
```sh
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Folder Structure
```
📦 
├─ .eslintrc.cjs
├─ .env
├─ .gitignore
├─ README.md
├─ bun.lockb
├─ components.json
├─ index.html
├─ jsconfig.json
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ logo-white.png
│  ├─ logo-white.svg
│  └─ logo.png
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ Icons
│  │  └─ Icons.jsx
│  ├─ assets
│  │  └─ photos
│  │     ├─ 404.png
│  │     ├─ acc-activation.png
│  │     ├─ login-bg.png
│  │     ├─ logo-white.svg
│  │     ├─ reg-bg.png
│  │     └─ regbg.jpeg
│  ├─ auth
│  │  ├─ PrivateRoute.jsx
│  │  ├─ PublicRoute.jsx
│  │  ├─ auth.js
│  │  └─ useMutualConnections.js
│  ├─ components
│  │  └─ ui
│  │     ├─ accordion.jsx
│  │     ├─ avatar.jsx
│  │     ├─ badge.jsx
│  │     ├─ button.jsx
│  │     ├─ calendar.jsx
│  │     ├─ card.jsx
│  │     ├─ carousel.jsx
│  │     ├─ dialog.jsx
│  │     ├─ drawer.jsx
│  │     ├─ dropdown-menu.jsx
│  │     ├─ hover-card.jsx
│  │     ├─ input.jsx
│  │     ├─ label.jsx
│  │     ├─ scroll-area.jsx
│  │     ├─ select.jsx
│  │     ├─ separator.jsx
│  │     ├─ sheet.jsx
│  │     ├─ skeleton.jsx
│  │     ├─ table.jsx
│  │     ├─ tabs.jsx
│  │     ├─ textarea.jsx
│  │     └─ tooltip.jsx
│  ├─ context
│  │  └─ PostContext.jsx
│  ├─ data
│  │  ├─ commentData.js
│  │  ├─ postData.js
│  │  ├─ replyData.js
│  │  └─ userData.js
│  ├─ index.css
│  ├─ lib
│  │  └─ utils.js
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ Auth
│  │  │  ├─ AccountActivated.jsx
│  │  │  ├─ AccountActivation.jsx
│  │  │  ├─ ForgotPassword.jsx
│  │  │  ├─ ForgotUsername.jsx
│  │  │  ├─ Login.jsx
│  │  │  ├─ Register.jsx
│  │  │  ├─ ResetPasswordConfirm.jsx
│  │  │  └─ ResetUsernameConfirm.jsx
│  │  ├─ Chat
│  │  │  └─ ChatPage.jsx
│  │  ├─ Layout.jsx
│  │  ├─ Misc
│  │  │  └─ 404.jsx
│  │  ├─ Social
│  │  │  ├─ Explore.jsx
│  │  │  ├─ Followers.jsx
│  │  │  ├─ Following.jsx
│  │  │  ├─ Home.jsx
│  │  │  ├─ HomePosts.jsx
│  │  │  ├─ IndividualPostPage.jsx
│  │  │  ├─ Notifications.jsx
│  │  │  ├─ Search.css
│  │  │  └─ Search.jsx
│  │  ├─ components
│  │  │  ├─ Chat
│  │  │  │  ├─ ChatList.jsx
│  │  │  │  ├─ ChatRoom.jsx
│  │  │  │  └─ StartChat.jsx
│  │  │  ├─ Misc
│  │  │  │  ├─ FeedEnd.jsx
│  │  │  │  ├─ Loader.css
│  │  │  │  ├─ Loader.jsx
│  │  │  │  ├─ Navbar.jsx
│  │  │  │  ├─ Sidebar.jsx
│  │  │  │  └─ SidebarRight.jsx
│  │  │  ├─ Posts
│  │  │  │  ├─ CreatePost.jsx
│  │  │  │  ├─ Likers
│  │  │  │  │  ├─ Comment
│  │  │  │  │  │  ├─ CommentLiker.jsx
│  │  │  │  │  │  ├─ CommentLikers.jsx
│  │  │  │  │  │  └─ Reply
│  │  │  │  │  │     ├─ ReplyLiker.jsx
│  │  │  │  │  │     └─ ReplyLikers.jsx
│  │  │  │  │  └─ Post
│  │  │  │  │     ├─ PostLiker.jsx
│  │  │  │  │     └─ PostLikers.jsx
│  │  │  │  ├─ Post.jsx
│  │  │  │  ├─ PostFooter.jsx
│  │  │  │  ├─ PostHeader.jsx
│  │  │  │  ├─ PostMedia.jsx
│  │  │  │  ├─ Posts.jsx
│  │  │  │  └─ comment
│  │  │  │     ├─ Comment.jsx
│  │  │  │     ├─ CommentHeader.jsx
│  │  │  │     ├─ Comments.jsx
│  │  │  │     └─ reply
│  │  │  │        ├─ Replies.jsx
│  │  │  │        ├─ Reply.jsx
│  │  │  │        └─ ReplyHeader.jsx
│  │  │  ├─ ThemeProvider.jsx
│  │  │  ├─ ToggleMode.jsx
│  │  │  └─ User
│  │  │     ├─ DeleteAccount.jsx
│  │  │     ├─ Follower.jsx
│  │  │     └─ MutualConnections.jsx
│  │  └─ user
│  │     ├─ EditProfile.jsx
│  │     └─ Profile.jsx
│  └─ utils
│     ├─ TruncateText.jsx
│     ├─ apiUrl.js
│     ├─ formatDate.js
│     ├─ getMediaUrl.js
│     ├─ socialService.js
│     └─ useDocumentTitle.js
├─ tailwind.config.js
└─ vite.config.js
```

## Available Scripts
In the project directory, you can run:

### `npm run dev`
Runs the app in the development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Customization

### Tailwind CSS Configuration
The project uses Tailwind CSS for styling. You can customize the Tailwind configuration in the `tailwind.config.js` file:
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#1DA1F2',
        secondary: '#14171A',
      },
    },
  },
  variants: {},
  plugins: [],
};
```

### Lucide Icons
The project uses the Lucide icons library. You can add more icons as needed by importing them in your components:
```js
import { IconName } from 'lucide-react';
```

## Technologies Used
- React, Vite
- Tailwind CSS
- Axios
- WebSocket
- React Router
- Lucide Icons
