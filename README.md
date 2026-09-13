# Week 19 — Warehouse Management Project

Full-stack warehouse / product management app built as a Bootcamp exercise.

- **Backend:** `warehouse-api/` — Express.js REST API with JWT auth, file-based JSON storage, and Swagger docs.
- **Frontend:** `frontend/` — React 19 + Vite admin panel (Persian / RTL) with React Query, React Hook Form + Yup, React Router, and dark/light theme.

## Project Structure

```
week19/
├── warehouse-api/          # Backend
│   ├── data/
│   │   ├── products.json   # File-based product store
│   │   └── users.json      # File-based user store
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js   # POST /auth/register, POST /auth/login
│   │   └── productRoutes.js# CRUD /products + bulk delete
│   ├── swagger/
│   │   └── swagger.json
│   ├── server.js           # Express app + auto port-fallback + Swagger UI
│   └── package.json
├── frontend/               # Frontend
│   ├── src/
│   │   ├── components/     # ProductsTable, SearchBox, Pagination, PriceRange,
│   │   │                   # Add/Update/Delete modals, ThemeToggle, route guards
│   │   ├── pages/          # LoginPage, RegisterPage, AdminPage, PageNotFound
│   │   ├── router/Router.jsx
│   │   ├── context/        # AuthContext, ThemeContext
│   │   ├── hooks/          # React Query queries/mutations, useDebounce
│   │   ├── service/        # axios instance (api.js), cookie helpers
│   │   ├── schemas/        # Yup validation (authSchema, productsSchema)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## Tech Stack

**Backend (`warehouse-api`)**

- Node.js + Express 4
- `jsonwebtoken` + `bcryptjs` for auth
- `cors`, `uuid`
- `swagger-ui-express` + `swagger-jsdoc` for API docs
- JSON files as database (no external DB required)

**Frontend (`frontend`)**

- React 19, React DOM, Vite 8
- `react-router-dom` 7, `@tanstack/react-query` 5 (+ devtools)
- `axios`, `js-cookie`
- `react-hook-form` + `@hookform/resolvers` + `yup`
- `react-hot-toast`, `react-icons`, `react-loader-spinner`
- `react-paginate`, `react-range-slider-input`, `react-password-checklist`
- `vazirmatn` font (Persian UI)

## Features

### Backend

- User registration with bcrypt password hashing
- Login with JWT issuance (`expiresIn: 1h`)
- JWT middleware protecting product mutations
- Products CRUD:
  - `GET /products` with pagination (`page`, `limit`) + search (`name`) + price filter (`minPrice`, `maxPrice`)
  - `GET /products/:id`
  - `POST /products` (auth)
  - `PUT /products/:id` (auth)
  - `DELETE /products/:id` (auth)
  - `DELETE /products` bulk delete by `ids[]` (auth)
- Validation: `minPrice > maxPrice` → 400, out-of-range page → 400
- Auto port fallback: if `PORT` is busy, tries `PORT+1`
- Swagger UI at `/api-docs` with correct dynamic server URL

### Frontend

- Public routes: `/` (Login), `/register`
- Private route: `/admin` (requires JWT cookie, `PrivateRoute` guard)
- Product table with pagination, debounced name search, price-range filter
- Add / Edit / single delete / bulk delete modals with Yup validation
- Auth persisted via `js-cookie`, axios interceptors attach `Bearer` token and redirect to `/` on 401
- Light/dark theme via `ThemeContext` + `ThemeToggle`
- Toasts (react-hot-toast), loading spinners, 404 page

## API Reference

Base URL (default): `http://localhost:3000`

Interactive docs: `http://localhost:3000/api-docs`

### Auth

| Method | Endpoint         | Auth | Body                              | Response                |
| ------ | ---------------- | ---- | --------------------------------- | ----------------------- |
| POST   | `/auth/register` | No   | `{ "username", "password" }`       | `201 { message }`       |
| POST   | `/auth/login`    | No   | `{ "username", "password" }`       | `200 { token }`         |

### Products

| Method | Endpoint         | Auth | Query / Body | Response |
| ------ | ---------------- | ---- | ------------ | -------- |
| GET    | `/products`      | No*  | `?page=1&limit=10&name=&minPrice=&maxPrice=` | `200 { totalProducts, page, limit, totalPages, data[] }` |
| GET    | `/products/:id`  | No   | — | `200 product` / `404` |
| POST   | `/products`      | Yes  | `{ name, price, quantity }` | `201 product` |
| PUT    | `/products/:id`  | Yes  | partial `{ name?, price?, quantity? }` | `200 product` |
| DELETE | `/products/:id`  | Yes  | — | `204` |
| DELETE | `/products`      | Yes  | `{ ids: string[] }` | `204` |

> Auth = `Authorization: Bearer <JWT>`. See `warehouse-api/middleware/authMiddleware.js`.

**Product shape:**

```json
{
  "id": "uuid",
  "name": "Laptop",
  "price": 1200,
  "quantity": 10
}
```

## Getting Started

Prerequisites: Node.js 18+ (20 LTS recommended), npm.

### 1. Clone and install

```bash
# backend
cd warehouse-api
npm install

# frontend (separate terminal)
cd frontend
npm install
```

### 2. Run the backend

```bash
cd warehouse-api
npm start
# Server is running on http://localhost:3000
# Swagger API docs are available at http://localhost:3000/api-docs
```

Optional: change port with `PORT`:

```powershell
$env:PORT=4000; npm start
```

```bash
PORT=4000 npm start
```

> Frontend axios baseURL is hardcoded to `http://localhost:3000` in `frontend/src/service/api.js`. If you change the backend port, update that file.

### 3. Run the frontend

```bash
cd frontend
npm run dev
# Vite dev server, typically http://localhost:5173
```

Open the printed Vite URL, register at `/register`, then log in at `/` to reach `/admin`.

### Other scripts

```bash
# frontend
npm run dev      # start Vite dev server
npm run build    # production build to dist/
npm run preview  # preview production build
npm run lint     # eslint
```

```bash
# backend
npm start        # node server.js
```

## Auth Flow

1. `POST /auth/register` → bcrypt-hashed user saved to `data/users.json`.
2. `POST /auth/login` → verify hash → sign JWT (`supersecretkey`, 1h) → `{ token }`.
3. Frontend stores token in cookie (`service/cookie.js`), axios attaches it to every request.
4. Protected product routes verify token via `authMiddleware.js`; 401 triggers logout redirect.

> Demo secret `supersecretkey` is hardcoded in `routes/authRoutes.js`. For real use, move it to an environment variable.

## Data Storage

No database setup needed. Data lives in:

- `warehouse-api/data/users.json`
- `warehouse-api/data/products.json`

Both are plain JSON arrays read/written synchronously with `fs`. Deleting/editing in the UI directly mutates these files.

## Frontend Routes

| Path        | Guard          | Component     |
| ----------- | -------------- | ------------- |
| `/`         | Public only    | `LoginPage`   |
| `/register` | Public only    | `RegisterPage`|
| `/admin`    | Private (JWT)  | `AdminPage`   |
| `*`         | —              | `PageNotFound`|


