Masterbots
├── apss/
│   ├── hasura/
│   │   ├──metadata/
│   │   │   ├──databases/
│   │   │   │  ├──masterbots/
│   │   │   │  │   └──tables/
│   │   │   │  └──databases.yaml
│   │   │   ├──actions.graphql
│   │   │   ├──actions.yaml
│   │   │   ├──allow_list.yaml
│   │   │   ├──api_limits.yam
│   │   │   ├──backend_configs.yaml
│   │   │   ├──cron_triggers.yaml
│   │   │   ├──graphql_schema_introspection.yaml
│   │   │   ├──inherited_roles.yaml
│   │   │   ├──metrics_config.yaml
│   │   │   ├──network.yaml
│   │   │   ├──opentelemetry.yaml
│   │   │   ├──query_collections.yaml
│   │   │   ├──remote_schemas.yaml
│   │   │   ├──rest_endpoints.yaml
│   │   │   └──version.yaml   
│   │   ├──migrations/
│   │   ├──seeds/
│   │   ├──.gitignore
│   │   ├──cloudbuild.yml
│   │   ├──config.yaml
│   │   └──Dockerfile
│   ├── masterbots.ai/
│   │   ├──.next/
│   │   ├──.vercel/
│   │   ├──app/
│   │   │  ├──(browse)/
│   │   │  │   ├──category/
│   │   │  │   │  ├──threadId/
│   │   │  │   │  │  ├──page.tsx
│   │   │  │   │  │  └──sitemap.ts
│   │   │  │   │  ├──page.tsx
│   │   │  │   │  └──sitemap.ts
│   │   │  │   ├──layout.tsx
│   │   │  │   ├──page.tsx
│   │   │  │   └──sitemap.ts
│   │   │  ├──api/
│   │   │  │   ├──auth/
│   │   │  │   │  └──...nextaut/
│   │   │  │   │        └──route.ts
│   │   │  │   ├──chat/
│   │   │  │   │  ├──actions/
│   │   │  │   │  │  └──actions.tsx
│   │   │  │   │  ├──models/
│   │   │  │   │  │  └──models.ts
│   │   │  │   │  └──route.ts
│   │   │  │   ├──og/
│   │   │  │   │  └──route.tsx
│   │   │  │   ├──payment/
│   │   │  │   │  ├──intent/
│   │   │  │   │  │  └──route.ts
│   │   │  │   │  ├──plans/
│   │   │  │   │  │  └──route.ts
│   │   │  │   │  ├──subscription/
│   │   │  │   │  │  └──route.ts
│   │   │  │   │  └──sumarize/
│   │   │  │   │  │  └──route.ts
│   │   │  │   └──wordware/
│   │   │  │      └──.route.ts.swp
│   │   │  ├──b/
│   │   │  │  └──id
│   │   │  │     ├──threadId/
│   │   │  │     │  ├──page.tsx
│   │   │  │     │  └──sitemap.ts
│   │   │  │     ├──layout.tsx
│   │   │  │     ├──page.tsx
│   │   │  │     └──sitemap.ts
│   │   │  ├──c/
│   │   │  │  ├──category/
│   │   │  │  │  ├──chatbot/
│   │   │  │  │  │  ├──page.tsx
│   │   │  │  │  │  └──sitemap.ts
│   │   │  │  │  ├──page.tsx
│   │   │  │  │  └──sitemap.ts
│   │   │  │  ├──p/
│   │   │  │  ├──layout.tsx
│   │   │  │  ├──page.tsx
│   │   │  │  └──sitemap.tsx
│   │   │  ├──share/
│   │   │  │  └──id
│   │   │  │     └──page.tsx
│   │   │  ├──sign-in/
│   │   │  │  └──page.tsx
│   │   │  ├──terms/
│   │   │  │  ├──layout.tsx
│   │   │  │  └──page.tsx
│   │   │  └──u/
│   │   │  │  ├──slug/
│   │   │  │  │  ├──s/
│   │   │  │  │  │  ├──pref/
│   │   │  │  │  │  │  └──page.tsx
│   │   │  │  │  │  └──sub/
│   │   │  │  │  │     └──page.tsx
│   │   │  │  │  └──t/
│   │   │  │  │     ├──category/
│   │   │  │  │     │  ├──threadId.tsx
│   │   │  │  │     │  └──page.tsx
│   │   │  │  │     ├──page.tsx
│   │   │  │  │     └──sitemap.tsx
│   │   │  │  ├──s/
│   │   │  │  │  └──subs/
│   │   │  │  │     └──intentId.tsx
│   │   │  │  │        └──page.tsx
│   │   │  │  └──layout.tsx
│   │   │  ├──actions.ts
│   │   │  ├──error.tsx
│   │   │  ├──globals.css
│   │   │  └──layout.tsx
│   │   ├──components/
│   │   │  ├──chat/
│   │   │  │  ├──chat-accordion.tsx
│   │   │  │  ├──chat-chatbot-details.tsx
│   │   │  │  ├──chat-chatbot.tsx
│   │   │  │  ├──chat-clickable-text.tsx
│   │   │  │  ├──chat-combobox.tsx
│   │   │  │  ├──chat-history.tsx
│   │   │  │  ├──chat-layout-section.tsx
│   │   │  │  ├──chat-list.tsx
│   │   │  │  ├──chat-message-actions.tsx
│   │   │  │  ├──chat-message.tsx
│   │   │  │  ├──chat-panel.tsx
│   │   │  │  ├──chat-scroll-anchor.tsx
│   │   │  │  ├──chat-search-input.tsx
│   │   │  │  ├──chat-share-dialog.tsx
│   │   │  │  ├──chat-thread-list-panel.tsx
│   │   │  │  ├──chat.tsx
│   │   │  │  └──new-chat.tsx
│   │   │  ├──thread-panel/
│   │   │  │  ├──index.tsx
│   │   │  │  └──user-thread-panel.tsx
│   │   │  ├──ui/
│   │   │  │  ├──wizard/
│   │   │  │  │     ├──hook/
│   │   │  │  │     │   ├──index.tsx
│   │   │  │  │     │   └──useWizard.tsx
│   │   │  │  │     └──index.tsx
│   │   │  │  ├──accordion.tsx
│   │   │  │  ├──alert-dialog.tsx
│   │   │  │  ├──badge.tsx
│   │   │  │  ├──button.tsx
│   │   │  │  ├──calendar.tsx
│   │   │  │  ├──codeblock.tsx
│   │   │  │  ├──command.tsx
│   │   │  │  ├──dialog.tsx
│   │   │  │  ├──dropdown-menu.tsx
│   │   │  │  ├──icons.tsx
│   │   │  │  ├──input.tsx
│   │   │  │  ├──label.tsx
│   │   │  │  ├──menubar.tsx
│   │   │  │  ├──pagination.tsx
│   │   │  │  ├──popover.tsx
│   │   │  │  ├──select.tsx
│   │   │  │  ├──separator.tsx
│   │   │  │  ├──sheet.tsx
│   │   │  │  ├──switch.tsx
│   │   │  │  ├──textarea.tsx
│   │   │  │  └──tooltip.tsx
│   │   │  ├──browse-category-button.tsx
│   │   │  ├──browse-category-tabs.tsx
│   │   │  ├──browse-chat-message-list.tsx
│   │   │  ├──browse-chat-message.tsx
│   │   │  ├──browse-chat-messages.tsx
│   │   │  ├──browse-chatbot-details.tsx
│   │   │  ├──browse-list-item.tsx
│   │   │  ├──browse-list.tsx
│   │   │  ├──browse-search-input.tsx
│   │   │  ├──browse-specific-thread-list.tsx
│   │   │  ├──browse-thread.tsx
│   │   │  ├──browse-user-details.tsx
│   │   │  ├──button-scroll-to-bottom.tsx
│   │   │  ├──category-main-tabs.tsx
│   │   │  ├──checkout.tsx
│   │   │  ├──clear-history.tsx
│   │   │  ├──empty-screen.tsx
│   │   │  ├──error-content.tsx
│   │   │  ├──external-link.tsx
│   │   │  ├──footer-ct.tsx
│   │   │  ├──footer.tsx
│   │   │  ├──header.tsx
│   │   │  ├──loading-state.tsx
│   │   │  ├──login-button.tsx
│   │   │  ├──markdown.tsx
│   │   │  ├──og-bg-image.tsx
│   │   │  ├──og-image.tsx
│   │   │  ├──payment-information.tsx
│   │   │  ├──plan-card.tsx
│   │   │  ├──plans.tsx
│   │   │  ├──prompt-form.tsx
│   │   │  ├──providers.tsx
│   │   │  ├──receipt.tsx
│   │   │  ├──short-message.tsx
│   │   │  ├──sidebar-actions.tsx
│   │   │  ├──sidebar-category-general.tsx
│   │   │  ├──sidebar-footer.tsx
│   │   │  ├──sidebar-item.tsx
│   │   │  ├──sidebar-items.tsx
│   │   │  ├──sidebar-link.tsx
│   │   │  ├──sidebar-list.tsx
│   │   │  ├──sidebar-mobile.tsx
│   │   │  ├──sidebar-responsive.tsx
│   │   │  ├──sidebar-toggle-wrap.tsx
│   │   │  ├──sidebar-toggle.tsx
│   │   │  ├──sidebar.tsx
│   │   │  ├──stripe-element.tsx
│   │   │  ├──subscription.tsx
│   │   │  ├──succes-content.tsx
│   │   │  ├──tailwind-indicator.tsx
│   │   │  ├──theme-toggle.tsx
│   │   │  ├──thread-date-range-picker.tsx
│   │   │  ├──thread-list.tsx
│   │   │  ├──thread-popup.tsx
│   │   │  ├──thread-user-actions.tsx
│   │   │  └──user-menu.tsx
│   │   ├──lib/
│   │   │  ├──animations/
│   │   │  │  ├──failed-red-1.json
│   │   │  │  ├──loading-blue.json
│   │   │  │  ├──loading-error-2.json
│   │   │  │  ├──loading-error.json
│   │   │  │  └──success-green.json
│   │   │  ├──hooks/
│   │   │  │  ├──use-at-bottom.tsx
│   │   │  │  ├──use-browse.tsx
│   │   │  │  ├──use-click-outside.tsx
│   │   │  │  ├──use-copy-to-clipboard.tsx
│   │   │  │  ├──use-enter-submit.tsx
│   │   │  │  ├──use-local-storage.ts
│   │   │  │  ├──use-model.tsx
│   │   │  │  ├──use-payment.tsx
│   │   │  │  ├──use-sidebar.tsx
│   │   │  │  └──use-thread.tsx
│   │   │  ├──actions.ts
│   │   │  ├──ai-helpers.tsx
│   │   │  ├──avatar-categories.ts
│   │   │  ├──bots-names.ts
│   │   │  ├──metadata.ts
│   │   │  ├──threads.ts
│   │   │  ├──types.ts
│   │   │  ├──url.ts
│   │   │  └──utils.ts
│   │   ├──public/
│   │   │  └──images/
│   │   ├──services/
│   │   │  └──hasura
│   │   │     ├──hasura.service.ts
│   │   │     ├──hasura.service.ts
│   │   │     └──index.ts
│   │   ├──.env
│   │   ├──.env.example
│   │   ├──.eslintrc.json
│   │   ├──.gitignore
│   │   ├──actions.ts
│   │   ├──auth.ts
│   │   ├──components.json
│   │   ├──middleware.ts
│   │   ├──next-env.d.ts
│   │   ├──next.config.js
│   │   ├──package.json
│   │   ├──postcss.config.js
│   │   ├──prettier.config.cjs
│   │   ├──README.md
│   │   ├──tailwind.config.js
│   │   ├──tsconfig.json
│   │   ├──vercel.json
│   │   └──ww-example.json
├── docs/
│   └── working-with-ai.md
├── node_modules/
├── packages/
│   ├──mb-env/
│   │   ├──src/
│   │   │  ├──endpoints.env.ts
│   │   │  ├──env.type.ts
│   │   │  └──index.ts
│   │   ├──package.json
│   │   └──tsconfig.json
│   ├──mb-genql/
│   │   ├──generated/
│   │   │     ├──runtime/
│   │   │     │  ├──batcher.ts
│   │   │     │  ├──createClient.ts
│   │   │     │  ├──error.ts
│   │   │     │  ├──fetcher.ts
│   │   │     │  ├──generateGraphqlOperation.ts
│   │   │     │  ├──index.ts
│   │   │     │  ├──linkTypeMap.ts
│   │   │     │  ├──typeSelection.ts
│   │   │     │  └──types.ts
│   │   │     ├──index.ts
│   │   │     ├──schema.graphql
│   │   │     ├──schema.ts
│   │   │     └──types.ts
│   │   ├──scripts/
│   │   │     ├──local.sh
│   │   │     ├──prod.sh
│   │   │     └──test.sh
│   │   ├──src/
│   │   │     └──index.ts
│   │   ├──.env-sample
│   │   ├──package.json
│   │   └──tsconfig.json
│   ├──mb-lib/
│   │   ├──src/
│   │   │     ├──error/
│   │   │     │  ├──error.lib.ts
│   │   │     │  └──index.ts
│   │   │     ├──fetch/
│   │   │     │  ├──fetch.lib.ts
│   │   │     │  └──index.ts
│   │   │     ├──hasura/
│   │   │     │  ├──hasura.lib.ts
│   │   │     │  └──index.ts
│   │   │     ├──jwt/
│   │   │     │  ├──index.ts
│   │   │     │  ├──jwt.lib.ts
│   │   │     │  └──jwt.type.ts
│   │   │     ├──platform/
│   │   │     │  ├──index.ts
│   │   │     │  └──platform.ts
│   │   │     ├──text/
│   │   │     │  ├──index.ts
│   │   │     │  └──text.lib.ts
│   │   │     └──index.ts
│   │   ├──package.json
│   │   └──tsconfig.json
│   ├──mb-types/
│   │   ├──src/
│   │   │     ├──hasura.type.ts
│   │   │     ├──index.ts
│   │   │     └──jwt.type.ts
│   │   └──package.json
│   └──tsconfig/
│       ├──base.json
│       ├──nextjs.json
│       ├──node16.json
│       ├──package.json
│       ├──react-library.json
│       ├──vite.json
│       └──vite.node.json
├──.deploy
├──.env_sample
├──.gitignore
├──.npmrc
├── bun.lockb
├── docker-compose.yml
├── LICENSE
├── package.json
├── README.md
├── Taskfile.yml  
└── turbo.json







