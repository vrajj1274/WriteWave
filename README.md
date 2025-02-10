Writewave is a full-stack blog application that enables users to create, read, update, and delete blogs. It is designed with user authentication, dynamic blog rendering, and a clean, responsive interface. The application incorporates modern web development tools and best practices to provide a seamless user experience.

Features

User Authentication

Secure login and signup system.

Cookies are used for session management.

Passwords are encrypted using Crypto for enhanced security.

Blog Management

Create, view, edit, and delete blogs.

Upload and display cover images for blogs.

Display authors and comments for each blog post.

Comment System

Users can leave comments on blog posts.

Comments are displayed dynamically with author details.

Error Handling

Comprehensive error handling ensures a smooth user experience.

Proper feedback messages for invalid actions (e.g., incorrect login credentials).

Middleware

Middleware for authentication and other functionalities.

JWT Tokens

Used for secure user authentication.

Database Management

MongoDB is used for storing user, blog, and comment data.

Password matching logic ensures secure verification.

Technology Stack

Frontend: EJS (Embedded JavaScript), Bootstrap 5, CSS

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT, Cookies, Crypto

Others: Multer for file uploads, Middleware for request handling
