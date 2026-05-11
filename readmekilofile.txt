=====================================
KILO CODE SETUP FILE
=====================================

PROJECT: Auth-Project
LOCATION: D:\Rafai\22april2026\Auth-Project

=====================================
IMPORTANT - READ FIRST
=====================================
This file is read by Kilo (AI coding assistant) before working on your project.
It provides context about the project structure, current state, and next steps.

=====================================
PROJECT OVERVIEW
=====================================
Type: Full-stack authentication system with e-commerce expansion planned
Backend: Express.js + TypeScript + MongoDB (Mongoose)
Frontend: React + TypeScript + Vite + React Router
Auth: JWT with access/refresh tokens, httpOnly cookies, token rotation
Email: Resend API for verification emails

=====================================
CURRENT STATE (May 2026)
=====================================
BACKEND: 96% Complete
- Registration with phone validation, timezone detection
- Email verification (Resend integrated)
- Login with JWT (access + refresh tokens)
- Refresh token rotation (security best practice)
- Logout with cookie clearing + DB token removal
- Auth middleware (authenticate.ts) - validates JWT & sets req.authenticatedUser
- Authorization middleware (authorize.ts) - role-based guards implemented
- API structure: Controller → Service → Repository → Model
- Database: MongoDB with User & Token models
- ROLE SYSTEM: EUserRoles enum expanded (ADMIN, VENDOR, CUSTOMER, USER)
- Admin endpoints: GET /user/management/users, PATCH /user/management/users/role

FRONTEND: 88% Complete
- AuthContext with auto-login via /me endpoint
- Axios interceptors (token attachment, 401 handling)
- Login page (fixed response parsing, password excluded)
- Register page (full form with consent)
- Dashboard (protected route)
- Home page (landing)
- Fixed: Auto-login infinite refresh, logout session clearing
- Fixed: Redirect loops on auth checks
- Fixed: Cookie clearing on logout (proper options)
- Fixed: Method mismatch (logout POST vs PUT)
- Added: /Home route access
- Added: GuestRoute protection (prevent login/register access when authenticated)
- Added: Role-based ProtectedRoute with requiredRoles prop
- Added: AdminDashboard with user management
- Added: Unauthorized page for access denied

=====================================
WHAT WAS FIXED THIS SESSION
=====================================
1. Frontend auth flow - AuthContext /me response handling
2. Axios interceptors - Bearer token in headers, 401 auto-redirect
3. Login page - Correct response parsing (res.data.data.user)
4. Backend security - Password excluded from login response
5. Logout - localStorage cleared, httpOnly cookies cleared
6. TypeScript errors - IUserWithId interface fixed
7. ProtectedRoute - Typed props, ready for RBAC
8. authorize middleware created for future roles
9. Home page added for e-commerce landing

=====================================
ROLE SYSTEM IMPLEMENTATION
=====================================
1. EUserRoles enum expanded: ADMIN, VENDOR, CUSTOMER, USER
2. user.repository.ts - Added getAllUsers and updateUserRole methods
3. management.service.ts - Created admin services for user management
4. management.controller.ts - Added getAllUsers and updateUserRole endpoints
5. management/index.ts - Added protected admin routes with authorize middleware
6. ProtectedRoute.tsx - Added requiredRoles prop for role-based access
7. AdminDashboard.tsx - Created admin UI for viewing/changing user roles
8. Unauthorized.tsx - Created unauthorized access page
9. AppRoutes.tsx - Added /admin and /unauthorized routes

=====================================
KNOWN ISSUES
=====================================
1. Email confirmation endpoint may have issues (needs testing)
2. Register page missing name & phone validation (frontend has fields, needs frontend validation)
3. Vendor dashboard not yet implemented
4. Customer features (products, cart, orders) not yet implemented

=====================================
NEXT PRIORITIES
=====================================
1. TEST full auth flow (register → verify email → login → dashboard → logout)
2. Add Vendor dashboard (product management)
3. Add Customer features (product listing, cart, orders)
4. Improve UI/UX (modern design, loading states, error handling)
5. Add session expiry handling (auto-logout after token expiry)
6. Dockerize for deployment
7. GitHub Actions CI/CD

=====================================
TESTING COMMANDS
=====================================
Backend:
  cd backend
  npm run start:dev     # Starts server on http://localhost:3000
  npm run lint          # Check code quality
  npm run build         # Compile TypeScript

Frontend:
  cd frontend
  npm run dev           # Starts Vite on http://localhost:5173
  npm run lint          # Check code quality
  npm run build         # Build for production

=====================================
ENVIRONMENT SETUP
=====================================
Backend .env (already configured):
  DATABASE_URL=mongodb connection string
  ACCESS_TOKEN_SECRET=mySuperSecretAccessKey123
  REFRESH_TOKEN_SECRET=mySuperSecretRefreshKey456
  ENV=development
  PORT=3000
  EMAIL_SERVICE_API_KEY=re_bDTcfTsB_BTv8DZYX66MR9fpef1a16J3T

=====================================
KEY FILES TO KNOW
=====================================
Backend:
  src/app.ts              - Express app setup (CORS, middleware)
  src/bin/server.ts       - Server bootstrap
  src/bootstrap/index.ts  - DB connection, rate limiter init
  src/APIs/index.ts       - Route mounting
  src/middlewares/authenticate.ts  - JWT validation
  src/middlewares/authorize.ts     - RBAC middleware
  src/APIs/user/authentication/   - Auth endpoints
  src/APIs/user/management/       - User management endpoints (admin)
  src/APIs/user/_shared/models/   - Mongoose models

Frontend:
  src/main.tsx            - Entry point (AuthProvider wraps App)
  src/context/AuthContext.tsx  - Global auth state
  src/api/axios.ts        - API client with interceptors
  src/routes/AppRoutes.tsx     - All routes defined
  src/routes/ProtectedRoute.tsx - Route guard with role support
  src/pages/Login.tsx     - Login form
  src/pages/Register.tsx  - Registration form
  src/pages/Dashboard.tsx - Protected page
  src/pages/AdminDashboard.tsx - Admin user management
  src/pages/Unauthorized.tsx - Access denied page

=====================================
GITHUB REPO STATUS
=====================================
Git: Initialized, commits exist
Main branch: main
Current branch: harvest-forgery (working branch)
Remote: origin configured
Last push: Role system implemented and tested

=====================================
GITHUB UPLOAD CHECKLIST
=====================================
Before pushing to GitHub:
[x] Ensure .gitignore excludes node_modules, dist, .env, logs
[ ] Create .env.example files for both frontend/backend
[ ] Update README.md with setup instructions
[x] Test full flow locally (register → verify → login → logout)
[ ] Commit all changes with clear messages
[x] Push to GitHub (git push origin harvest-forgery)

Note: Role system manually tested - admin dashboard working correctly.

=====================================
IMPORTANT NOTES FOR NEW DEVICE
=====================================
1. Install dependencies:
   - Backend: cd backend && npm install
   - Frontend: cd frontend && npm install

2. MongoDB required - either local or Atlas connection string

3. Email verification works via Resend API (key already in .env)

4. Cookies are httpOnly - frontend never directly accesses them

5. Token rotation: Each refresh replaces old refresh token (rotates)

6. Current focus: Vendor/Customer dashboards + e-commerce features

=====================================
ARCHITECTURE DECISIONS
=====================================
- Cookie-based auth (httpOnly) for security (XSS protection)
- JWT access token (1 hour) + Refresh token (1 year)
- Refresh token stored in DB for revocation
- Token rotation on refresh (security)
- RBAC middleware for ADMIN/VENDOR/CUSTOMER
- Frontend uses React Context for global state
- Axios interceptors centralize auth logic
- Separate API layer (src/api/) for all endpoints

====================================
EOF