# Beginners Next.js App

## Docker Setup

Our Docker configuration supports both frontend (Next.js) and backend (Django) services in a development environment.

### Project Structure
- Frontend: Next.js application (port 3000)
- Backend: Django API (port 8000)

### Getting Started with Docker

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Start the development environment:
   ```bash
   docker-compose up --build
   ```

3. Access the applications:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api/posts
   - Django Admin: http://localhost:8000/admin

### When to Use Different Docker Commands

1. **`docker-compose up --build`**
   Use this when:
   - Starting the project for the first time
   - After changing Dockerfile or docker-compose.yml
   - After adding new dependencies (in requirements.txt or package.json)
   - When you want to ensure all images are up to date
   
2. **`docker-compose up`**
   Use this when:
   - No changes to Docker configuration or dependencies
   - Only working on application code
   - Restarting after a temporary shutdown
   - Daily development work

3. **`docker-compose up -d`**
   Use this when:
   - You want to run containers in the background
   - You don't need to see logs immediately
   - You'll be using other terminal windows

### Docker Commands Reference

1. **Basic Commands:**
   ```bash
   # Start services and see logs
   docker-compose up

   # Start services in background
   docker-compose up -d

   # Stop services (when running with -d)
   docker-compose down

   # View running containers
   docker-compose ps

   # View logs (when running detached)
   docker-compose logs -f         # All logs
   docker-compose logs -f backend # Only backend logs
   ```

2. **Development Workflow:**
   ```bash
   # Start development session
   docker-compose up -d

   # When making backend changes that need restart
   docker-compose restart backend  # Quick restart
   # OR
   docker-compose up --build backend  # Full rebuild if needed

   # Run migrations
   docker-compose exec backend python manage.py migrate

   # Create new migrations
   docker-compose exec backend python manage.py makemigrations

   # Frontend changes auto-reload
   # (no restart needed)

   # End development session
   docker-compose down
   ```

3. **Troubleshooting:**
   ```bash
   # Check container status
   docker-compose ps

   # View logs
   docker-compose logs

   # Full reset
   docker-compose down
   docker-compose up --build

   # Reset everything (including volumes)
   docker-compose down -v
   ```

### Understanding Docker in This Project

1. **Container Persistence:**
   - Stopping with Ctrl+C: Containers remain but stop running
   - `docker-compose down`: Removes containers and networks
   - Your code changes persist (mounted as volumes)
   - Database persists unless manually deleted

2. **Development Features:**
   - Live reload for Next.js frontend
   - Django backend auto-reloads on code changes
   - Shared network between services
   - Mounted volumes for real-time development

3. **Best Practices:**
   - Use `docker-compose up -d` for development sessions
   - Check logs with `docker-compose logs -f`
   - Restart backend after significant changes
   - Always use `docker-compose down` at the end of session

4. **Data Management:**
   - Code changes are reflected immediately
   - Database persists between restarts
   - Use `down -v` to reset all data

## Running with Docker

### Development Mode (USE THIS)

## Getting Started

1. If you haven't cloned the repository yet:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. If you've already cloned the repository, update it:

   ```bash
   git pull
   ```

3. Start the development server:

   ```shell
   docker compose up
   ```

   Note: If you're using an older version of Docker, you may need to use `docker-compose up` instead.

4. Open your browser and navigate to `http://localhost:3000`

5. Make changes to your code and see them reflected in real-time!

### Production Mode (Not recommended for development)

1. Build the Docker image:

   ```shell
   docker build -t nextapp .
   ```

2. Run the Docker container:

   ```shell
   docker run -p 3000:3000 nextapp
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Development

1. Our development process will consist of individually making specific "components" for each function of the website. These "components" (functions in C++ terms) will be the building blocks for our website. To start developing, this is an Object Oriented approach so don't worry about how the function will fit into the website, focus on the function itself. Keep in mind that a lot of our Kanban Board issues are similar. In short, our site's primary function is, search and return search results. Everything else will build off this.

2. To start developing without Docker, run the development server:

   ```shell
   npm run dev
   ```

   Note: this will require a local install of Node.js, npm, and all other dependencies.

3. Do test the backend run:

   ```shell
   cd backend/beginners
   ```

   Note: this will not work for you because there's a few needed dependencies.

   The main dependencies include:
   - Django
   - django-ninja
   - django-cors-headers
   - django-extensions

# ***if you can't get it running on local machine***
 ## 'Venv' option for wsl
	*FIRSTLY, TYPE 'wsl'*
	1. 'sudo apt update'
	2. 'sudo apt install python3-venv'
	3. 'python3 -m venv venv'
	4. 'source venv/bin/activate'
	5. 'deactive' (not often use)
	6. 'python manage.py runserver'
	
##	Now can you install the dependencies
	- 'pip install django-cors-headers'
	- 'pip install django-extensions'
	- 'pip install django-ninja'

   ```shell
   pip install django django-ninja django-cors-headers
   ```

   After installing dependencies, you can start the server:

   ```shell
   python manage.py runserver  # Start the server
   ```

   If this doesn't work, the Dockerfile will be updated soon to support the backend.

   # Creating Admin Account
   - python manage.py createsuperuser
   - Open http://127.0.0.1:8000/admin/auth/
   - log in and check for what youre looking for

## Environment Variables

- Next.js 14.2.13
- React ^18
- React DOM ^18
- Tailwind CSS ^3.4.1
- PostCSS ^8

### When to Restart the Backend

1. **Commands for Backend Restart:**
   ```bash
   # Restart only the backend service
   docker-compose restart backend

   # Alternative: Stop and start backend
   docker-compose stop backend
   docker-compose start backend

   # If changes aren't reflecting, full rebuild:
   docker-compose up --build backend
   ```

2. **When to Restart Backend:**
   - After adding new Python dependencies
   - When modifying Django models (after migrations)
   - If you change Django settings
   - When adding new API endpoints
   - If the backend seems unresponsive
   - When Django's auto-reload fails

3. **When NOT to Restart Backend:**
   - For most Python code changes (Django auto-reloads)
   - For frontend/Next.js changes
   - When only viewing logs
   - After database queries

4. **Auto-Reload vs Restart:**
   - Django auto-reloads for most `.py` file changes
   - Some changes require manual restart:
     - URL configuration changes
     - Middleware changes
     - Environment variable changes
     - New dependencies
     - Database migrations
