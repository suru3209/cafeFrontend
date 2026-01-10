This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



☕ Aniicones Cafe – Full Stack Food Ordering System

Aniicones Cafe is a modern, fast, and scalable food ordering platform built with Next.js, Express, Prisma, and PostgreSQL.
It supports user ordering, admin management, real-time updates, product customization, and secure authentication.

🚀 Features
👤 User Side

Browse menu by category

Add items to cart with custom options

Select delivery address using map

Secure checkout flow

View order history

Invoice download

🛠 Admin Panel

Secure admin login (with secret code)

Orders dashboard with status updates

Search orders by item name / ID

Product management (Add / Edit / Delete)

Menu options (Size, Milk, Sugar, etc.)

Image upload for products

Real-time order updates (Socket.io)

🔐 Security

Session-based authentication

Role-based access (USER / ADMIN)

Protected admin routes

🧑‍💻 Tech Stack
Frontend

Next.js (App Router)

Tailwind CSS

ShadCN UI

Axios

Context API (Auth + Cart)

Lucide Icons

Backend

Node.js + Express

Prisma ORM

PostgreSQL

Express Session

Multer (Image Upload)

Socket.io

Cloudinary / Local Upload Support

📁 Project Structure
frontend/
 ├─ app/
 ├─ components/
 ├─ context/
 ├─ lib/
 └─ styles/

backend/
 ├─ routes/
 ├─ controllers/
 ├─ middlewares/
 ├─ utils/
 ├─ prisma/
 └─ socket.ts

⚙️ Environment Setup
Backend .env
DATABASE_URL=postgresql://user:password@localhost:5432/aniicones
SESSION_SECRET=supersecret
ADMIN_SECRET=admin123
FRONTEND_URL=http://localhost:3000

Frontend .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token

🏃 Run Locally
Backend
cd backend
npm install
npx prisma migrate dev
npm run dev

Frontend
cd frontend
npm install
npm run dev

🔑 Admin Login

Admin login requires:

Email

Password

Admin Secret Code

Example:

Email: admin@aniicones.com  
Password: ********  
Secret: admin123  

📦 API Routes
Auth

POST /api/auth/login

POST /api/auth/admin/login

GET /api/auth/me

Orders

POST /api/orders

GET /api/orders/my

PUT /api/admin/orders/:id/status

Products

GET /api/admin/products

POST /api/admin/products

PUT /api/admin/products/:id

DELETE /api/admin/products/:id

Address

POST /api/addresses

GET /api/addresses

🖼 Image Upload

Product images are uploaded using Multer
Stored in:

/uploads/


Accessible via:

http://localhost:8080/uploads/filename.jpg

🔄 Real-Time Updates

Admin dashboard receives live order updates using Socket.io.

🛡 Production Checklist

✅ 404 Page

✅ Auth Protection

✅ CORS via ENV

✅ Secure Sessions

✅ Admin Role Check

✅ Image Upload

✅ API Validation