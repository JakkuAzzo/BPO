# Business Productivity Optimization (BPO)

This project implements a small productivity platform.  A Flask API manages
users, organisations, tasks, job cards and timesheets.  A lightweight React
front‑end (under `frontend/`) consumes this API.  Older HTML templates are kept
under `prototype/` for reference.

## Project Structure

```
app/                 # Flask application
prototype/           # Static prototype for future redesigns
.env.example         # Example environment configuration
.gitignore           # Repository ignore rules
```

## Features

- User and organisation management
- Create and update tasks
- Upload timesheets and job cards
- React dashboard served separately from the API

See `app/readme.md` for detailed information about the application itself.

## Running the Application

1. Create a virtual environment and install the requirements for the Flask
   server:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r app/requirements.txt
   ```
2. Copy `.env.example` to `.env` and update the values for your environment.
3. Start the Flask API:
   ```bash
   export FLASK_APP=app/app.py
   flask run
   ```

4. In a separate terminal start the React front‑end:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Tests

Pytest tests live in the `tests/` directory.  To run them:

```bash
pip install -r app/requirements.txt  # if not already installed
pytest
```

## Missing/Incorrect Features

The code base has a number of features that are not fully configured:

- **Environment Variables** – Mail and database settings are read from the
  environment but no `.env` file is provided.  Copy `.env.example` to `.env` and
  provide values for `SECRET_KEY`, mail server credentials, Microsoft OAuth
  settings and database URI.
- **Database Files in Version Control** – `app/databases/instance/site.db` and
  other sample databases are checked into the repository.  These should be
  deleted and added to `.gitignore` if a clean database is desired.
- **Upload Folder Configuration** – The application expects an `UPLOAD_FOLDER`
  defined in the config but the directory may not exist.  Create the folder or
  update `Folder_Configs` in `app/app_routes/sqlalch_config.py`.
- **Requirements** – `app/requirements.txt` contains packages (PyInstaller,
  PyQt6, PySide6, etc.) that are not required by the Flask server.  Cleaning up
  the requirements list will make installation faster.

