# Project Manager
It's a fullstack app that helps you organise your work and stay productive.
To see more [click here](https://project-manager-kt.netlify.app/) to visit the site.

## The stack I used
Everything is written in Typescript
### Frontend
- NextJS
- ChakraUI
- react-query
- axios
- formik
- hosts on Netlify
### Backend
- NestJS
- Prisma
- PostgreSQL
- JWT Auth
- Passport
- hosts on Heroku

## If you want to set it up locally:
1. Copy this repository.
2. In frontend directory create .env.local
3. In frontend/.env.local add following line
```
NEXT_PUBLIC_BACKEND_ENDPOINT='http://localhost:5000'
```
4. In frontend/src/utils/axiosInstance.ts change following line
```
const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "/api",
});
```
to
```
const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT,
});
```
5. Use backend/docker-compose.yml to create docker container with db.
6. In backend folder create .evn file 
7. In backend/.env add following lines
```
DATABASE_URL=YOUR DB LINK
AT_SECRET=YOUR AT SECRET
RT_SECRET=YOUR RT SECRET
FRONTEND_ORIGIN="http://localhost:3000"
```
8. Enter those commands in terminal:
```
cd backend
npm run start:dev
```
```
cd frontend
npm run dev
```
9. You're good to go.
