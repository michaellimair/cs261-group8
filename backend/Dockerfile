# using python 3.9
FROM python:3.9
ENV PYTHONUNBUFFERED 1
RUN pip install pipenv

RUN mkdir /backend
WORKDIR /backend

COPY Pipfile* /backend/
RUN pipenv lock --keep-outdated --requirements > requirements.txt

# update pip
RUN pip install pip -U

# install modules
RUN pip install -r requirements.txt

# copy current codes
COPY . /backend/
