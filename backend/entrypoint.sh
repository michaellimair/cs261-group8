#!/bin/sh
hypercorn --bind :${PORT:-8080} --workers 3 backend.asgi:application