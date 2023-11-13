#!/bin/sh
eval $(grep '^MASTERBOTS_TEST_API' ./.env) && \
eval $(grep '^MASTERBOTS_TEST_API_ADMIN_SECRET' ./.env) && \

echo "genql --endpoint $MASTERBOTS_TEST_API \
--output ./generated \
-H 'content-type: application/json' \
-H 'x-hasura-admin-secret: $MASTERBOTS_TEST_API_ADMIN_SECRET'" && \

genql --endpoint $MASTERBOTS_TEST_API \
--output ./generated \
-H 'content-type: application/json' \
-H "'x-hasura-admin-secret: $MASTERBOTS_TEST_API_ADMIN_SECRET'"