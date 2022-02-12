# DBCampus Backend App

This application was made with the Django framework, which is based in Python.

## Getting Started
1. Ensure you have Python 3.9 or later installed in your system.
2. Install `pipenv` if you do not have it by running `pip install pipenv`. If you get some `PATH` errors, try `python -m pip install pipenv`.
3. Type `pipenv shell` to activate the virtual Python environment for this project
4. Type `pipenv install` to install all the dependencies of the project
5. Copy the `.env.example` file into a file named `.env`, and fill it with the appropriate credentials to authenticate to your local PostgreSQL database.
6. Create a database in your PostgreSQL instance with the same name as the value you entered in the `DB_NAME` variable.
7. Perform database migration with `python manage.py migrate` to populate all the tables and models.
8. Run the project with `python manage.py runserver`.

Every time you start the project, run `python manage.py migrate` to ensure that you are on the latest version of the database.

Run test cases by invoking the `python manage.py test` command.

## Environment Variables
This project has been set up to support overriding operating system environment variables using the `.env` file. A `.env` file will only be locally stored and will not be uploaded to version control. This is done for security reasons, since `.env` files typically contain secrets and sensitive credentials. Inside the `backend` folder, you can copy the `.env.example` file and paste it as `.env`.

When adding additional environment variables for configurable settings or for storing secrets, please add them as an environment variable. You can use `os.environ.get(<env_name>)` from the `os` module to get the environment variables. Afterwards, add the key of the environment variable to your `.env` file and an example key/value pair in `.env.example`.

## Default User Credentials
### Mentor
- Username: testmentor
- Password: testmentor124

### Mentee
- Username: testmentee
- Password: testmentee124

### Admin
- Username: superadmin
- Password: superadmin124

## Creating Models
- All models can be placed in `models.py` for now. Refactoring will be done in the near future.
- After creating a model, make a migration by performing `python manage.py makemigrations <model_name>`, followed by performing the migration with `python manage.py migrate <model_name>`

## Internationalization and Localization
To ensure that all strings returned from the backend are properly localized, please use Django's built-in translation utilities from `django.utils.translation`. To add a translation key:
1. In your code, use an instance of translation. For example:
```
from django.utils.translation import gettext as _

print(_('hello_world'))
```
2. In the folder of this readme file, run `python -m manage.py makemessages -a`.
3. Write all the proper strings for translations in the file `cs261/locale/[language]/LC_MESSAGES/django.po`.
4. Compile the message files by running `python -m manage.py compilemessages` in this folder.
5. If the compilation is successful, you will see an update to the `cs261/locale/[language]/LC_MESSAGES/django.mo` file.

Note that names of language must follow the language identifiers as specified in [RFC 3066](http://www.i18nguy.com/unicode/language-identifiers.html). This is in order for Django's `Accept-Language` behavior to function properly.

## Generating an OpenAPI Schema
API schemas are useful for external users or for the frontend team to be able to link the application to the backend. Detailed instructions are available in the official Django REST Framework website [here](https://www.django-rest-framework.org/api-guide/schemas).

## Production Database Migration
In the production Cloud SQL instance, migrations will need to be done manually for security and safety reasons. This can be done by connecting to the Cloud SQL instance with the [Cloud SQL Proxy](https://cloud.google.com/sql/docs/postgres/quickstart-proxy-test). Afterwards, point your local backend environment variables to the proxy. Then, you will be able to do all the `python manage.py <command>` as usual.

## Testing
All Python files need to have tests written alongside them. You can add tests in an adjacent file to the file you are writing by adding a `test_` prefix to the name of the test file. For example, if you want to test `models.py`, you should create a file `test_models.py`.
