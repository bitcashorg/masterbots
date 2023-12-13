#!/bin/sh
eval $(grep '^BITCASH_PROD_API' ./.env) && \
eval $(grep '^BITCASH_PROD_API_ADMIN_SECRET' ./.env) && \

echo "genql --endpoint $BITCASH_PROD_API \
--output ./generated \
-H 'content-type: application/json' \
-H 'x-hasura-admin-secret: $BITCASH_PROD_API_ADMIN_SECRET'" && \

genql --endpoint $BITCASH_PROD_API \
--output ./generated \
-H 'content-type: application/json' \
-H 'x-hasura-admin-secret: $BITCASH_PROD_API_ADMIN_SECRET'