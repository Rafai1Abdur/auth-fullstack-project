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
BACKEND: 95% Complete
- Registration with phone validation, timezone detection
- Email verification (Resend integrated)
- Login with JWT (access + refresh tokens)
- Refresh token rotation (security best practice)
- Logout with cookie clearing + DB token removal
- Auth middleware (authenticate.ts) - validates JWT & sets req.authenticatedUser
- Authorization middleware (authorize.ts) - role-based guards ready
- API structure: Controller → Service → Repository → Model
- Database: MongoDB with User & Token models

FRONTEND: 50% Complete
- AuthContext with auto-login via /me endpoint
- Axios interceptors (token attachment, 401 handling)
- Login page (fixed response parsing, password excluded)
- Register page (full form with consent)
- Dashboard (protected route)
- Home page (landing)
- Fixed: Auto-login infinite refresh, logout session clearing

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
KNOWN ISSUES
=====================================
1. Page refresh loop on first load (fixed in this session)
2. Logout cookies clearing (fixed in this session - simplified cookie options)
3. No role system yet (middleware ready, need to implement roles in User model & routes)
4. Register page missing name & phone validation (frontend has fields, needs frontend validation)
5. Email confirmation endpoint may have issues (needs testing)

=====================================
NEXT PRIORITIES
=====================================
1. TEST full auth flow (register → verify email → login → dashboard → logout)
2. Add role field to User model (ADMIN, VENDOR, CUSTOMER)
3. Implement role-based route guards in backend (use authorize middleware)
4. Add Admin dashboard (view users, approve vendors)
5. Add Vendor dashboard (product management)
6. Add Customer features (product listing, cart, orders)
7. Improve UI/UX (modern design, loading states, error handling)
8. Add session expiry handling (auto-logout after token expiry)
9. Dockerize for deployment
10. GitHub Actions CI/CD

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
  src/middlewares/authorize.ts     - RBAC (just created)
  src/APIs/user/authentication/   - Auth endpoints
  src/APIs/user/_shared/models/   - Mongoose models

Frontend:
  src/main.tsx            - Entry point (AuthProvider wraps App)
  src/context/AuthContext.tsx  - Global auth state
  src/api/axios.ts        - API client with interceptors
  src/routes/AppRoutes.tsx     - All routes defined
  src/routes/ProtectedRoute.tsx - Route guard
  src/pages/Login.tsx     - Login form
  src/pages/Register.tsx  - Registration form
  src/pages/Dashboard.tsx - Protected page

=====================================
GITHUB REPO STATUS
=====================================
Git: Initialized, commits exist
Main branch: main
Current branch: fix-later (working branch)
Remote: origin configured

=====================================
GITHUB UPLOAD CHECKLIST
=====================================
Before pushing to GitHub:
[ ] Ensure .gitignore excludes node_modules, dist, .env, logs
[ ] Create .env.example files for both frontend/backend
[ ] Update README.md with setup instructions
[ ] Test full flow locally (register → verify → login → logout)
[ ] Commit all changes with clear messages
[ ] Push to GitHub (git push origin main or fix-later)

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

6. Current focus: Testing + Role system implementation

=====================================
ARCHITECTURE DECISIONS
=====================================
- Cookie-based auth (httpOnly) for security (XSS protection)
- JWT access token (1 hour) + Refresh token (1 year)
- Refresh token stored in DB for revocation
- Token rotation on refresh (security)
- RBAC middleware ready for ADMIN/VENDOR/CUSTOMER
- Frontend uses React Context for global state
- Axios interceptors centralize auth logic
- Separate API layer (src/api/) for all endpoints

=====================================
EOF