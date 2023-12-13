#!/bin/sh
eval $(grep '^BITCASH_LOCAL_API' ./.env) && \
eval $(grep '^BITCASH_LOCAL_API_ADMIN_SECRET' ./.env) && \

echo "genql --endpoint $BITCASH_LOCAL_API \
--output ./generated \
-H 'content-type: application/json' \
-H 'x-hasura-admin-secret: $BITCASH_LOCAL_API_ADMIN_SECRET'" && \

genql --endpoint $BITCASH_LOCAL_API \
--output ./generated \
-H 'content-type: application/json' \
-H 'x-hasura-admin-secret: $BITCASH_LOCAL_API_ADMIN_SECRET'