###########
# BUILDER #
###########

# using python 3.9
FROM python:3.9.10-slim-buster
ENV PYTHONUNBUFFERED 1

WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update \
    && apt-get install gcc python3-dev curl musl-dev libffi-dev g++ gfortran libxml2 libxml2-dev wget libpng-dev libxslt-dev

RUN pip install --upgrade pip
RUN pip install --upgrade cython
RUN pip install pipenv

COPY Pipfile .
COPY Pipfile.lock .
RUN pipenv lock --keep-outdated --requirements > requirements.txt

RUN pip install -r requirements.txt

COPY . .

ENTRYPOINT [ "sh", "./entrypoint.sh" ]
