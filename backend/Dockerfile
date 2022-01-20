# using python 3.9
FROM python:3.9
ENV PYTHONUNBUFFERED 1

RUN mkdir /code
WORKDIR /code
# update pip
RUN pip install pip -U
# get requirements.txt
ADD requirements.txt /code/

# install modules
RUN pip install -r requirements.txt

# copy current codes
ADD . /code/