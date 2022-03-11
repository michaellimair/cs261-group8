###########
# BUILDER #
###########

# using python 3.9
FROM python:3.9.10-alpine
ENV PYTHONUNBUFFERED 1

WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apk update \
    && apk add gcc python3-dev curl musl-dev jpeg-dev zlib-dev libffi-dev cairo-dev pango-dev gdk-pixbuf-dev g++ gfortran openssl-dev libxml2 libxml2-dev py-pip build-base wget freetype-dev libpng-dev openblas-dev libxslt libxslt-dev libjpeg-turbo-dev libpq

RUN pip install --upgrade pip
RUN pip install --upgrade cython
RUN pip install pipenv

COPY Pipfile .
COPY Pipfile.lock .
RUN pipenv lock --keep-outdated --requirements > requirements.txt

RUN pip install -r requirements.txt

COPY . .

# install dependencies
RUN apk update

ENTRYPOINT [ "sh", "./entrypoint.sh" ]
