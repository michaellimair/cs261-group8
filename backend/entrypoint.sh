#!/bin/sh
gunicorn --bind :${PORT:-8080} --workers 3 --timeout 0 --preload backend.wsgi:application