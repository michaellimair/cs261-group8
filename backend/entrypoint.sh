#!/bin/sh
gunicorn --bind :${PORT:-8080} --workers 3 backend.wsgi:application