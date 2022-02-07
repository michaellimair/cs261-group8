#!/bin/sh

gunicorn --bind :$PORT --workers 3 backend.wsgi:application