#!/usr/bin/env bash
# Run quick smoke tests against the local API
# Requires: bash, curl, optionally jq for pretty output

BASE_URL="http://localhost:3000/api"
EMAIL="jhonatan@example.com"
PASSWORD="password123"

echo "1) Login to get token..."
RESP=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"password\": \"$PASSWORD\"}")

# Try to extract token (works with jq if installed, otherwise basic parsing)
if command -v jq >/dev/null 2>&1; then
  TOKEN=$(echo "$RESP" | jq -r '.token')
else
  TOKEN=$(echo "$RESP" | sed -n 's/.*"token"\s*:\s*"\([^"]*\)".*/\1/p')
fi

if [ -z "$TOKEN" ] || [ "$TOKEN" = "null" ]; then
  echo "ERROR: could not obtain token. Response was:"; echo "$RESP"; exit 1
fi

echo "Token obtained: ${TOKEN:0:40}..."
AUTH_HEADER="Authorization: Bearer $TOKEN"

# Helper function
do_curl(){
  echo "\n$1"
  shift
  curl -s -w "\nHTTP_STATUS:%{http_code}\n" "$@"
}

# 2) Create habit
HABIT_CREATE_PAYLOAD='{ "name": "Test Habit" }'
HABIT_CREATE_RESP=$(do_curl "Create habit" -X POST "$BASE_URL/habits" -H "$AUTH_HEADER" -H "Content-Type: application/json" -d "$HABIT_CREATE_PAYLOAD")
echo "$HABIT_CREATE_RESP"
HABIT_ID=$(echo "$HABIT_CREATE_RESP" | sed -n 's/.*"id"\s*:\s*\([0-9]*\).*/\1/p' | head -n1)

# 3) Get habits
do_curl "Get habits" -X GET "$BASE_URL/habits" -H "$AUTH_HEADER"

# 4) Get habit by id
if [ -n "$HABIT_ID" ]; then
  do_curl "Get habit by id" -X GET "$BASE_URL/habits/$HABIT_ID" -H "$AUTH_HEADER"
fi

# 5) Update habit
if [ -n "$HABIT_ID" ]; then
  UPDATE_PAYLOAD='{ "name": "Test Habit Updated" }'
  do_curl "Update habit" -X PUT "$BASE_URL/habits/$HABIT_ID" -H "$AUTH_HEADER" -H "Content-Type: application/json" -d "$UPDATE_PAYLOAD"
fi

# 6) Delete habit
if [ -n "$HABIT_ID" ]; then
  do_curl "Delete habit" -X DELETE "$BASE_URL/habits/$HABIT_ID" -H "$AUTH_HEADER"
fi

# 7) Create routine
ROUTINE_CREATE_PAYLOAD='{ "title": "Test Routine" }'
ROUTINE_CREATE_RESP=$(do_curl "Create routine" -X POST "$BASE_URL/routines" -H "$AUTH_HEADER" -H "Content-Type: application/json" -d "$ROUTINE_CREATE_PAYLOAD")
ROUTINE_ID=$(echo "$ROUTINE_CREATE_RESP" | sed -n 's/.*"id"\s*:\s*\([0-9]*\).*/\1/p' | head -n1)

# 8) Get routines
do_curl "Get routines" -X GET "$BASE_URL/routines" -H "$AUTH_HEADER"

# 9) Get routine by id
if [ -n "$ROUTINE_ID" ]; then
  do_curl "Get routine by id" -X GET "$BASE_URL/routines/$ROUTINE_ID" -H "$AUTH_HEADER"
fi

# 10) Update routine
if [ -n "$ROUTINE_ID" ]; then
  ROUTINE_UPDATE_PAYLOAD='{ "title": "Test Routine Updated" }'
  do_curl "Update routine" -X PUT "$BASE_URL/routines/$ROUTINE_ID" -H "$AUTH_HEADER" -H "Content-Type: application/json" -d "$ROUTINE_UPDATE_PAYLOAD"
fi

# 11) Delete routine
if [ -n "$ROUTINE_ID" ]; then
  do_curl "Delete routine" -X DELETE "$BASE_URL/routines/$ROUTINE_ID" -H "$AUTH_HEADER"
fi

echo "\nAll done. If any step returned HTTP status >=400 check server logs and responses above."
