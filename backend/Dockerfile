# using python 3.9
FROM python:3.9
ENV PYTHONUNBUFFERED 1

RUN mkdir /backend
WORKDIR /backend
# update pip
RUN pip install pip -U
# get requirements.txt
COPY requirements.txt /backend/

# install modules
RUN pip install -r requirements.txt

# copy current codes
COPY . /backend/
