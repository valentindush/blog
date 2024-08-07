# Blog App

## Overview

This project is a blog application with a frontend built using React/Next.js and a backend built with Django (using MySQL database).

## Project Structure

The project is organized into two main folders:
- `client`: Contains the React/Next.js frontend application.
- `server`: Contains the Django backend application.

## Client (Front-end)

### Prerequisites

- Node.js (version 14.x or later)

### Setup and Running

1. **Navigate to the `client` directory:**

   ```bash
   cd client
    ```
2. **Install dependencies:**

   ```bash
   npm install
    ```
3. **Start server in development mode:**

   ```bash
   npm run dev
    ```
    The frontend server will be running on [`http://locahost:3000`](http://localhost:8000)

## Server (Back-end)

### Prerequisites

- Python 3.9 or later
- MySQL database

### Setup and Running

1. **Navigate to the `server` directory:**

   ```bash
   cd server
    ```
2. **Create and activate a virtual environment (recommended):**

   ```bash
   python -m venv venv 
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```
3. **Install the required packages:**

   ```bash
   pip install -r requirements.txt
    ```
3. **Configure database:** <br/>
    Update the `settings.py` file with your MySQL (or PostgreSQL) database configuration.
   ```python
   # settings.py

    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'your_database_name',
            'USER': 'your_database_user',
            'PASSWORD': 'your_database_password',
            'HOST': 'localhost',
            'PORT': '3306',
        }
    }
    ```
    For PostgreSQL it would be:

    ```python
    # settings.py

    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'your_database_name',
            'USER': 'your_database_user',
            'PASSWORD': 'your_database_password',
            'HOST': 'localhost',
            'PORT': '3306',
        }
    }

    ```

5. **Run migrations:**

   ```bash
   python manage.py makemigrations
   python manage.py migrate
    ```

5. **Start development server:**

   ```bash
   python manage.py runserver
    ```
    The backend server will be running on [`http://locahost:8000`](http://localhost:8000)

    API docs on [`http://locahost:8000/swagger`](http://localhost:8000/swagger)