# Masterbots Backend Development Guidelines

## Database Metadata

The database metadata for the Hasura database is defined in the provided YAML files within the monorepo. The metadata includes:

- Table definitions for various entities such as `chatbot`, `category`, `chat`, `message`, `thread`, `user`, etc.
- Relationships between tables using foreign key constraints.
- Permissions for different user roles (anonymous and authenticated) to control access to tables and columns.
- Enum definitions for attributes like complexity, length, tone, and type.

## Backend Development and Deployment

The monorepo is structured to facilitate backend development and deployment using the following components:

- **Docker**: The Hasura console is built within a Docker image, allowing for containerization and easy deployment.
- **Docker Compose**: The `docker-compose.yml` file defines the services required for the backend, including the PostgreSQL database and the Hasura GraphQL engine. It sets up the necessary configurations, ports, and volumes.
- **Taskfile**: The `Taskfile.yml` file provides a set of tasks that can be executed using the Taskfile tool. These tasks automate common development and deployment operations, such as booting up the services, applying migrations and metadata, seeding the database, and managing the Docker Compose services.

## API Query/Mutation

To interact with the Hasura GraphQL API, a GraphQL client is generated using the `genql` library. The `packages.mb-genql.md` file contains the package structure with the code for creating a client instance that can be used to make queries and mutations.

The `createMbClient` function in the client file accepts various options, including:

- `config`: Additional configuration options for the GraphQL request.
- `jwt`: JWT token for authentication.
- `env`: Environment (e.g., production, development).
- `adminSecret`: Admin secret for accessing the Hasura console.
- `debug`: Flag to enable debug logging.

The client instance sets up the necessary headers and configurations for making GraphQL requests and also establishes a WebSocket connection for real-time subscriptions using the `graphql-ws` library.

To make API requests, you can use the generated client instance and its methods corresponding to the defined GraphQL operations. The client provides a type-safe way to construct and execute queries and mutations.

## Guidelines for Backend Development

1. **Utilize Taskfile Commands**: Leverage the provided Taskfile commands to streamline development and deployment tasks, such as booting up services, applying migrations, and managing the Docker Compose setup.

2. **Use Generated GraphQL Client**: Utilize the generated GraphQL client (`packages.mb-genql.md`) to interact with the Hasura API in a type-safe manner. Import the necessary types and functions from the generated client file and use them in your application code.

3. **Adhere to Database Schema**: Follow the defined database schema and relationships when creating new tables or modifying existing ones. Ensure consistency and integrity of the data.

4. **Leverage Hasura Console**: Use the Hasura console for managing database migrations, metadata, and permissions. It provides a user-friendly interface for performing these tasks.

5. **Implement Authentication and Authorization**: Ensure proper authentication and authorization mechanisms are in place using JWT tokens and role-based access control. Protect sensitive data and restrict access based on user roles.

6. **Optimize GraphQL Queries**: Optimize GraphQL queries and mutations to minimize data transfer and improve performance. Fetch only the necessary fields and use appropriate filters and pagination.

7. **Error Handling and Logging**: Implement proper error handling and logging mechanisms to aid in debugging and monitoring. Log relevant information and provide meaningful error messages to assist in troubleshooting.

8. **Maintain Dependencies and Docker Images**: Regularly update and maintain the dependencies and Docker images to ensure security and compatibility. Keep the backend system up to date with the latest patches and versions.

By following these guidelines and leveraging the provided tools and setup, you can effectively develop and maintain the backend system for the Masterbots project. The combination of Hasura, PostgreSQL, Docker, and the generated GraphQL client provides a robust and scalable foundation for building efficient APIs.
