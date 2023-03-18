#!/bin/bash

flask db init
flask db stamp head
flask db migrate
flask db upgrade

if [[ $1 == "local" ]]
then
  export LOCAL="true"
fi

if [[ ${ENVIRONMENT} == "dev" ]]; then
  echo "Running in Development"
  gunicorn "main:create_app()" --workers 1 --threads 10 --bind=0.0.0.0:5000 --worker-class eventlet --reload
elif [[ ${ENVIRONMENT} == "prod" ]]; then
  echo "Running in Production"
  gunicorn "main:create_app()" --workers 2 --threads 10 --bind=0.0.0.0:5000 --worker-class eventlet
fi