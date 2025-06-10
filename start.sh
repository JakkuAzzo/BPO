#!/bin/bash
# Simple script to run Flask backend and React frontend together

# run flask server
(
  cd app
  source ../venv/bin/activate
  export FLASK_APP="app:create_app"
  flask run --port=5001 --host=0.0.0.0 &
  FLASK_PID=$!
)

# run React dev server
(
  cd frontend
  npm run dev &
  NODE_PID=$!
)

trap "kill $FLASK_PID $NODE_PID" SIGINT
wait $FLASK_PID $NODE_PID
