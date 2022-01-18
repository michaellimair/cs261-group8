# DBCampus2021 Group 8
Project for Group 8 of DBCampus 2021, made for the CS261 Software Engineering course at the University of Warwick.

Group members:
- Betty (@acyanbird)
- Kailo
- Damian
- Vladimir
- Sabit
- Dan

This project follows the Test-Driven Development (TDD) approach for development, applying testing wherever necessary and possible. As such, all code by all developers need to be adequately tested and needs to pass all automated checks.

## General Conventions
- Development builds are automatically versioned according to their commit hash
- Release builds will follow semantic versioning
- Please use the naming conventions as laid out in [PEP8](https://www.python.org/dev/peps/pep-0008/#naming-conventions). Namely, variable and function names should use snake_case. Class names should use PascalCase.
- Everyone is a developer, code reviewer, and tester. We prioritize collaboration in this team.
- All code should pass checks from the linters of the code's programming language (Pylint for Python, ESLint for JavaScript)

## For Backend Development
The following section contains the steps to perform backend development along with things to note.

### Running the Project
- Navigate to the `backend` folder
- Perform `pipenv shell` to activate the virtual Python environment for this project
- Perform `pipenv install` to install all the dependencies of the project
- Perform database migration with `python manage.py migrate`
- Run the project with `python manage.py runserver`

### Creating Models
- All models can be placed in `models.py` for now. Refactoring will be done in the near future.
- After creating a model, make a migration by performing `python manage.py makemigrations <model_name>`, followed by performing the migration with `python manage.py migrate <model_name>`

### Generating an OpenAPI Schema
API schemas are useful for external users or for the frontend team to be able to link the application to the backend. Detailed instructions are available in the official Django REST Framework website [here](https://www.django-rest-framework.org/api-guide/schemas).

## References (WIP)
Tutorials followed:
- https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react
- https://typescript-eslint.io/docs/linting/
