###########
# BUILDER #
###########

# using python 3.9
FROM python:3.9.10-alpine
ENV PYTHONUNBUFFERED 1

WORKDIR /usr/src/backend

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apk update \
    && apk add gcc python3-dev curl musl-dev jpeg-dev zlib-dev libffi-dev cairo-dev pango-dev gdk-pixbuf-dev

RUN pip install --upgrade pip
RUN pip install pipenv

COPY Pipfile* .
RUN pipenv lock --keep-outdated --requirements > requirements.txt

RUN pip install -r requirements.txt

COPY . .
# TODO: Add Python linter
RUN pip install pylint==2.12.2
# RUN pylint .

# create directory for the app user
RUN mkdir -p /home/app

# create the app user
RUN addgroup -S app && adduser -S app -G app

# create the appropriate directories
ENV HOME=/home/app
ENV APP_HOME=/home/app/backend
RUN mkdir $APP_HOME
RUN mkdir $APP_HOME/staticfiles

WORKDIR $APP_HOME

# install dependencies
RUN apk update && apk add libpq

# copy project
COPY . $APP_HOME

# chown all the files to the app user
RUN chown -R app:app $APP_HOME

# change to the app user
USER app

ENTRYPOINT [ "./entrypoint.sh" ]
