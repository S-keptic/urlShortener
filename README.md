URL Shortener

A simple and efficient URL shortener service built with Node.js and Express. Convert long URLs into short, shareable links, and get automatic redirection when those links are visited.

🚀 Features

Create a short URL for any valid long URL.

Redirect from the short URL to the original long URL.

Store URL mappings in a database (via models).

Modular structure (controllers, routes, models) for clean maintainability.

Configurable via environment variables and works with Docker (Dockerfile / docker-compose).

🧰 Tech Stack

Node.js — runtime environment

Express — web framework for routing and HTTP handling

MongoDB (or any configured database via models) — stores URL data

Mongoose (or ORM/ODM defined in project) — for schema definitions and database interactions

dotenv — to manage configuration through environment variables

(Optional) Docker — to containerize and simplify deployment
