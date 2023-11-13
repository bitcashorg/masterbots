#!/bin/sh
eval $(grep '^MASTERBOTS_PROD_API' ./.env) && \
eval $(grep '^MASTERBOTS_PROD_API_ADMIN_SECRET' ./.env) && \

echo "genql --endpoint $MASTERBOTS_PROD_API \
--output ./generated \
-H 'content-type: application/json' \
-H 'x-hasura-admin-secret: $MASTERBOTS_PROD_API_ADMIN_SECRET'" && \

genql --endpoint $MASTERBOTS_PROD_API \
--output ./generated \
-H 'content-type: application/json' \
-H "'x-hasura-admin-secret: $MASTERBOTS_PROD_API_ADMIN_SECRET'"