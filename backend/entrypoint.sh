#!/bin/sh
gunicorn --bind :${PORT:-8080} --workers 3 --timeout 90 backend.wsgi:application