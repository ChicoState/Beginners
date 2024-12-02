# Beginners Next.js App

## Docker Setup

Our Docker configuration supports two environments: development and production.

### Development Environment

The development setup uses Docker Compose to create an environment with live reloading:

- Dockerfile will run `npm run dev` for you

This allows you to see your changes in real-time without rebuilding the Docker image (make sure to disable cache in browser settings).

### Production Environment

The production setup builds an optimized version of the app:

- Runs `npm run build` for you
- This is exactly what a live server would do

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
