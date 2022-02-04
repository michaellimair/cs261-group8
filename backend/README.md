# DBCampus Backend App

This application was made with the Django framework, which is based in Python.

## Getting Started
1. Ensure you have Python 3.9 or later installed in your system.
2. Type `pipenv shell` to activate the virtual Python environment for this project
3. Type `pipenv install` to install all the dependencies of the project
4. Copy the `.env.example` file into a file named `.env`, and fill it with the appropriate credentials to authenticate to your local PostgreSQL database.
5. Create a database in your PostgreSQL instance with the same name as the value you entered in the `DB_NAME` variable.
6. Perform database migration with `python manage.py migrate` to populate all the tables and models.
7. Run the project with `python manage.py runserver`

## Environment Variables
This project has been set up to support overriding operating system environment variables using the `.env` file. A `.env` file will only be locally stored and will not be uploaded to version control. This is done for security reasons, since `.env` files typically contain secrets and sensitive credentials. Inside the `backend` folder, you can copy the `.env.example` file and paste it as `.env`.

When adding additional environment variables for configurable settings or for storing secrets, please add them as an environment variable. You can use `os.environ.get(<env_name>)` from the `os` module to get the environment variables. Afterwards, add the key of the environment variable to your `.env` file and an example key/value pair in `.env.example`.

## Creating Models
- All models can be placed in `models.py` for now. Refactoring will be done in the near future.
- After creating a model, make a migration by performing `python manage.py makemigrations <model_name>`, followed by performing the migration with `python manage.py migrate <model_name>`

## Generating an OpenAPI Schema
API schemas are useful for external users or for the frontend team to be able to link the application to the backend. Detailed instructions are available in the official Django REST Framework website [here](https://www.django-rest-framework.org/api-guide/schemas).

## Testing
All Python files need to have tests written alongside them. You can add tests in an adjacent file to the file you are writing by adding a `test_` prefix to the name of the test file. For example, if you want to test `models.py`, you should create a file `test_models.py`.
