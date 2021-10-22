# itw-tests

## Install

* Node.js (>= v14.16)
* Yarn (v1.x)
* [Docker](https://www.docker.com/products/docker-desktop) on your local machine.
(version)

## Backend

Code in /backend
The main technologies used are: Node (v14), Nest.js (v7), Typescript (v4) and Postgres (v13.2). Mikro-ORM is used as an ORM.

## Frontend

Code in /frontend
The main technologies used are: React (v17), Next.js (v10), Typescript (v4) and Tailwind (v1).

## Setup & Run

### Backend

1. Create and run database: `docker-compose up -d`
2. Install backend dependencies: `(cd backend && yarn install)`
3. Migrate database schema: `(cd backend && yarn run migration:up)`
4. Seed database with data: `(cd backend && yarn run seeds:up)`
5. Start backend server: `(cd backend && yarn run dev)`

### Frontend

1. Install frontend dependencies: `(cd frontend && yarn install)`
2. Build frontend styles: `(cd frontend && yarn run build:styles)`
3. Start frontend server: `(cd frontend && yarn run dev)`


## Ports

```
3000 Backend server
3001 Frontend server
5432 Postgres
```

