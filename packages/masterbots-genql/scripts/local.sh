#!/bin/sh
eval $(grep '^MASTERBOTS_LOCAL_API' ./.env) && \
eval $(grep '^MASTERBOTS_LOCAL_API_ADMIN_SECRET' ./.env) && \

echo "genql --endpoint $MASTERBOTS_LOCAL_API \
--output ./generated \
-H 'content-type: application/json' \
-H 'x-hasura-admin-secret: $MASTERBOTS_LOCAL_API_ADMIN_SECRET'" && \

genql --endpoint $MASTERBOTS_LOCAL_API \
--output ./generated \
-H 'content-type: application/json' \
-H "'x-hasura-admin-secret: $MASTERBOTS_LOCAL_API_ADMIN_SECRET'"