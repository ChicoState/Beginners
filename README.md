# Beginners Next.js App

APP WILL NOT WORK WITHOUT PRIVATE API KEY.

## Quick Start with Docker

### First Time Setup
```bash
# Clone the repository
git clone git@github.com:ChicoState/Beginners.git
cd Beginners

# Create .env file in root directory with:
# ANTHROPIC_API_KEY=your_api_key_here

# Build and start containers
docker compose up --build
```

### Daily Development
```bash
# Start containers
docker compose up

# Stop containers
docker compose down
```

### Testing Changes
```bash
# If you changed dependencies (package.json, requirements.txt):
docker compose up --build

# If you only changed code:
docker compose up

# To restart just the backend:
docker compose restart backend

# To restart just the frontend:
docker compose restart nextapp
```

### Troubleshooting
```bash
# Full reset (use if having issues):
docker compose down
docker compose up --build

# View logs
docker compose logs -f nextapp  # Frontend logs
docker compose logs -f backend  # Backend logs
```

## Environment Setup
You need only one `.env` file in the root directory with:
```
ANTHROPIC_API_KEY=your_api_key_here
```
This will be automatically used by both frontend and backend containers.

## Accessing the App
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api/posts
- Django Admin: http://localhost:8000/admin

## Tech Stack
- Next.js 14.2.13
- React ^18
- Django 5.1.4
- Tailwind CSS ^3.4.1
