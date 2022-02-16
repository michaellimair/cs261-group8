# CS261 Group 8
Project for Group 8 of the CS261 Software Engineering course at the University of Warwick.

Project setup instructions for both the backend and frontend can be seen in their respective folders.

Group members:
- Betty (@acyanbird)
- Kailo
- Damian
- Vladimir
- Sabit
- Dan

This project follows the **Test-Driven Development (TDD)** approach for development, applying testing wherever necessary and possible. As such, all code by all developers need to be adequately tested and needs to pass all automated checks.

## Getting Started
- Any time you want to start working on a new feature based on the `main` branch, always do a `git pull` to make sure that you are working on the latest version of code.
- Before merging into the `main` branch, please always ensure that you have merged the latest version of the `main` branch into your branch and pushed it.
- For frontend development, please refer to the instructions in the `frontend` folder.
- For backend development, please refer to the instructions in the `backend` folder.

## General Conventions
- Development builds are automatically versioned according to their commit hash
- Release builds will follow semantic versioning
- Please use the naming conventions as laid out in [PEP8](https://www.python.org/dev/peps/pep-0008/#naming-conventions). Namely, variable and function names should use snake_case. Class names should use PascalCase.
- Everyone is a developer, code reviewer, and tester. We prioritize collaboration in this team.
- All code should pass checks from the linters of the code's programming language (Pylint for Python, ESLint for JavaScript)

## Deployment
This project's system architecture has been designed heavily around the Google Cloud Platform (GCP) cloud provider. All configuration of the cloud project has been done with Terraform in the `main.tf` file.

Essentially, the components involved in the project are as follows:
- 1 GCS bucket for Terraform state
- 1 GCS bucket for file storage
- Firebase Hosting for static site hosting (frontend app)
- Cloud Run main instance (backend app)
- Cloud Run failover instance (backend app)
- HTTP(S) Load Balancer to proxy to both main and failover instance
- Cloud SQL instance

## Notes
This repository has been reset once on 7 February 2022 for security reasons.