# Premium Steel Works

Full-stack website for a steel fabrication business (gates, staircases, railings, balconies).

## Structure

```
freelancing/
├── frontend/    # React + Vite (consumer site)
├── backend/     # Node.js + Express + MongoDB (API)
└── admin/       # Admin panel (separate URL) - coming next
```

## Quick Start

### 1. MongoDB

Install [MongoDB](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

For local MongoDB, ensure it's running on `mongodb://127.0.0.1:27017`.

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env   # Edit .env if needed
npm run seed           # Create admin + sample data
npm run dev            # http://localhost:5000
```

**Admin login:** `admin@premiumsteelworks.com` / `admin123`

### 3. Frontend

```bash
cd frontend
npm install
# Create .env with: VITE_API_URL=http://localhost:5000/api
npm run dev            # http://localhost:5173
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/login | - | Login |
| POST | /api/auth/register | - | Register admin |
| GET | /api/categories | - | List categories |
| GET | /api/categories/:slug | - | Get category |
| GET | /api/products | - | List products |
| GET | /api/products/category/:slug | - | Products by category |
| GET | /api/products/:id | - | Get product |
| POST | /api/contact | - | Submit contact form |
| GET | /api/slides | - | Hero slides |

Protected routes (add `Authorization: Bearer <token>`): POST/PUT/DELETE for categories, products, slides; GET /api/contact.

## Environment

**Backend (.env):**
- `PORT` - Server port (default 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT (change in production)

**Frontend (.env):**
- `VITE_API_URL` - Backend API URL (default http://localhost:5000/api)
