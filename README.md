# itw-tests

Welcome to the Restaurant App, a demo/dummy web application which permits to the restaurant's customers to order food and developpers to show their skills ;)

The project is written in Ja

## Prerequisit installation

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
3. Create database schema: `(cd backend && yarn run migration:create)`
4. Migrate database schema: `(cd backend && yarn run migration:up)`
5. Seed database with data: `(cd backend && yarn run seeds:up)`
6. Start backend server: `(cd backend && yarn run dev)`

### Frontend

1. Install frontend dependencies: `(cd frontend && yarn install)`
3. Start frontend server: `(cd frontend && yarn run dev)`


## Ports

```
3000 Backend server
3001 Frontend server
5432 Postgres
```

## API Specs

API specs with swagger are in ```localhost:3000/api```