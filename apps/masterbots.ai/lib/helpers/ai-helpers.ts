import { AIModels } from '@/app/api/chat/models/models'
import type { AiClientType } from '@/types/types'
import type { StreamEntry } from '@/types/wordware-flows.types'
import type { MessageParam } from '@anthropic-ai/sdk/resources'
import { type CoreMessage, generateId } from 'ai'
import type { ChatCompletionMessageParam } from 'openai/resources'

// * This function gets the model client type
export function getModelClientType(model: AIModels) {
  switch (model) {
    case AIModels.GPT4:
    case AIModels.Default:
      return 'OpenAI'
    case AIModels.Claude3:
      return 'Anthropic'
    case AIModels.llama3_7b:
    case AIModels.llama3_8b:
      return 'Perplexity'
    case AIModels.WordWare:
      return 'WordWare'
    default:
      throw new Error('Unsupported model specified')
  }
}

// * This function creates the payload for the AI response
export function createPayload(
  json: { id: string },
  messages: { content: string }[],
  completion: any
) {
  const title = messages[0]?.content.substring(0, 100)
  const id = json.id ?? generateId()
  const createdAt = Date.now()
  const path = `/c/${id}`
  return {
    id,
    title,
    userId: 1,
    createdAt,
    path,
    messages: [
      ...messages,
      {
        content: completion,
        role: 'assistant'
      }
    ]
  }
}

// * This function sets the streamer payload
export function setStreamerPayload(
  model: AiClientType,
  payload: ChatCompletionMessageParam[]
): ChatCompletionMessageParam[] | MessageParam[] {
  switch (model) {
    case 'WordWare':
      return payload
    case 'Anthropic':
      return payload.map(
        (message, index) =>
          ({
            role: index
              ? message.role.replace('system', 'assistant')
              : message.role.replace('system', 'user'),
            content: message.content
          }) as MessageParam
      )
    case 'OpenAI':
    case 'Perplexity':
    default:
      return payload
  }
}

// * This function converts the messages to the core messages
export function convertToCoreMessages(
  messages: ChatCompletionMessageParam[]
): CoreMessage[] {
  return messages.map(msg =>
    msg.role.match(/(user|system|assistant)/)
      ? {
          role: msg.role as 'user' | 'system' | 'assistant',
          content: msg.content as string
        }
      : (() => {
          throw new Error(`Unsupported message role: ${msg.role}`)
        })()
  )
}

// * This function initializes the WordWare model with describe call
export async function fetchPromptDetails(promptId: string) {
  if (!promptId) {
    throw new Error('Prompt ID is required')
  }

  const response = await fetch(`/api/wordware/describe?promptId=${promptId}`)

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to fetch prompt details')
  }

  return response.json()
}

export const processLogEntry = (logEntry: StreamEntry) => {
  const { type, value } = logEntry
  if (type === 'chunk' && value.label) {
    switch (value.label) {
      case 'blogPostSection':
        // Handle blogPostSection specific logic
        break
      case 'generatedImages':
        // Handle generatedImages specific logic
        break
      case 'Image generation':
        // Handle Image generation specific logic
        break
      case 'imageDescription':
        // Handle imageDescription specific logic
        break
      default:
        // Handle default case
        break
    }
  }
}

// ! This is for CodeGuru, to test ICL. Any other test with different bot might get confused due to the context of these examples and labelling.
export const labelMakerMockedRawData = {
  chatbot: 'CodeGuru',
  domain: 'Technology',
  questions: `
  ## Top 50 Common Questions:

  1. How can I optimize the performance of a large-scale distributed system?
  2. What is the most efficient algorithm for processing massive datasets in real time?
  3. How can I debug concurrency issues in a multi-threaded application?
  4. How can I implement an event-driven architecture for high scalability?
  5. What are the best practices for designing microservices in a cloud-native application?
  6. How do I optimize a GraphQL API for performance and security?
  7. How can I refactor legacy code with minimal disruption to production?
  8. What is the optimal way to handle state in a microservices architecture?
  9. How can I implement eventual consistency in a distributed database system?
  10. How do I choose between SQL and NoSQL databases for different use cases?
  11. What are the best practices for implementing security in a serverless architecture?
  12. How can I design a system that scales efficiently during peak loads?
  13. How can I optimize API gateways for performance in a microservices ecosystem?
  14. What are advanced techniques for memory management in low-level programming languages?
  15. How do I implement circuit breakers and retries for fault-tolerant systems?
  16. How can I ensure data consistency in a highly distributed, real-time system?
  17. What is the most effective way to handle large volumes of logs and metrics in production?
  18. How can I use distributed tracing to monitor and debug microservices?
  19. What are the trade-offs between different load balancing strategies in cloud architectures?
  20. How can I implement a message-driven architecture using Kafka or RabbitMQ?
  21. What are the best strategies for optimizing database read/write performance at scale?
  22. How do I implement a secure, scalable OAuth2 authentication system?
  23. What are advanced design patterns for handling asynchronous processing in distributed systems?
  24. How can I optimize container orchestration using Kubernetes for complex deployments?
  25. What are the best practices for scaling real-time analytics applications?
  26. How do I architect a multi-tenant SaaS application with data isolation and scalability?
  27. What techniques can I use to reduce latency in high-performance computing applications?
  28. How do I optimize the performance of machine learning models in production?
  29. How can I design an architecture that supports zero-downtime deployments?
  30. How can I secure communication between microservices in a distributed system?
  31. How do I prevent and mitigate security vulnerabilities in containerized environments?
  32. What are the best practices for managing secrets and credentials in cloud applications?
  33. How can I design a system that gracefully degrades under high load conditions?
  34. How do I implement a robust, scalable CI/CD pipeline for microservices?
  35. How can I reduce the overhead of data serialization in a high-throughput system?
  36. What are the key principles of building an efficient, scalable caching layer?
  37. How do I architect a serverless application for performance and cost optimization?
  38. What are the best practices for implementing streaming data pipelines?
  39. How can I design a data warehouse architecture that supports complex queries at scale?
  40. How do I ensure observability and monitoring in a highly distributed environment?
  41. What are the most effective strategies for mitigating the impact of a DDoS attack?
  42. How can I design a hybrid cloud solution that balances cost, performance, and security?
  43. What are the best practices for handling transactional integrity across microservices?
  44. How do I use distributed databases like Cassandra or DynamoDB for optimal performance?
  45. How can I design an architecture that supports real-time collaboration across users?
  46. What are the strategies for efficient garbage collection in high-performance applications?
  47. How can I optimize application startup times in containerized environments?
  48. How do I handle schema evolution in production databases with minimal downtime?
  49. What are the key considerations for building resilient applications in edge computing environments?
  50. How can I architect a fault-tolerant, geo-distributed application?
  `,
  categories: `
  ## Categories:

  a. Distributed Systems.
  b. Cloud Computing & Scalability.
  c. Security & Fault Tolerance.
  d. Data Management & Optimization.
  e. Microservices & Serverless Architecture.
  f. Performance Optimization.
  g. Testing, Monitoring, & CI/CD.
  h. Real-Time Processing.
  i. Containerization & Orchestration.
  j. Edge Computing & IoT.
  `,
  subCategories: `
  ## Sub-categories: (Examples for each category)

  a. Distributed Systems:
  - Event-Driven Architecture
  - Consistency Models
  - Message Queues
  - Fault-Tolerant Systems
  - Geo-Distributed Systems

  b. Cloud Computing & Scalability:
  - Multi-Tenant Architecture
  - Load Balancing Techniques
  - Serverless Scalability
  - Hybrid Cloud Strategies
  - Resource Optimization

  c. Security & Fault Tolerance:
  - OAuth2 & JWT
  - API Gateway Security
  - Container Security
  - Circuit Breakers & Retries
  - Distributed Security Models

  d. Data Management & Optimization:
  - SQL vs NoSQL
  - Distributed Databases
  - Caching Strategies
  - Data Serialization
  - Schema Evolution

  e. Microservices & Serverless Architecture:
  - Stateless Services
  - Service Meshes
  - API Management
  - Function-as-a-Service (FaaS)
  - Microservice Security

  f. Performance Optimization:
  - Latency Reduction
  - Memory Management
  - Real-Time Performance
  - High-Throughput Systems
  - Load Testing

  g. Testing, Monitoring, & CI/CD:
  - Distributed Tracing
  - CI/CD Pipelines for Microservices
  - Log Aggregation
  - Continuous Deployment
  - Monitoring and Observability

  h. Real-Time Processing:
  - Streaming Data Pipelines
  - Kafka & RabbitMQ
  - Real-Time Analytics
  - In-Memory Databases
  - Event-Driven Systems

  i. Containerization & Orchestration:
  - Kubernetes Best Practices
  - Docker Optimization
  - Service Discovery
  - Orchestration of Complex Workloads
  - Containerized CI/CD Pipelines

  j. Edge Computing & IoT:
  - Fault-Tolerant Edge Architectures
  - Real-Time Data Processing
  - Security in Edge Computing
  - IoT Device Management
  - Hybrid Cloud-Edge Models
  `,
  tags: `
  ## Tags: (Additional keywords for flexibility, examples include)

  - Latency
  - Asynchronous Programming
  - Scalability
  - Distributed Tracing
  - Fault Tolerance
  - Load Balancing
  - Real-Time Analytics
  - Service Mesh
  - Kubernetes
  - CI/CD Pipelines
  - OAuth2
  - Security Auditing
  - Message Queues
  - Streaming Pipelines
  - High-Availability
  - Event-Driven Systems
  - Serverless
  - API Gateways
  - In-Memory Databases
  - Containerization

  ## List of suggested **tags** for each sub-category hierarchy:

  ### 1. **Distributed Systems**
    - **Event-Driven Architecture**: #eventdriven #pubsub #asynchronous #eventsourcing #reactiveprogramming
    - **Consistency Models**: #eventualconsistency #strongconsistency #dataconsistency #CAPtheorem
    - **Message Queues**: #messaging #rabbitmq #kafka #activemq #messagebroker
    - **Fault-Tolerant Systems**: #faulttolerance #failover #redundancy #resilience #highavailability
    - **Geo-Distributed Systems**: #geodistribution #datacenters #cloudregions #replication #multicloud

  ### 2. **Cloud Computing & Scalability**
    - **Multi-Tenant Architecture**: #multitenancy #saas #dataisolation #scalability #tenantmanagement
    - **Load Balancing Techniques**: #loadbalancing #haproxy #nginx #roundrobin #trafficdistribution
    - **Serverless Scalability**: #serverless #faas #lambdafunctions #scalingonDemand #autoscaling
    - **Hybrid Cloud Strategies**: #hybridcloud #multicloud #privatecloud #publiccloud #cloudarchitecture
    - **Resource Optimization**: #resourceallocation #costoptimization #cloudresources #rightscaling #containeroptimization

  ### 3. **Security & Fault Tolerance**
    - **OAuth2 & JWT**: #oauth2 #jwt #tokenbasedauth #openidconnect #authorization
    - **API Gateway Security**: #apiSecurity #oauth2 #apiGateway #jwt #rateLimiting
    - **Container Security**: #containersecurity #dockersecurity #imageScanning #kubernetesSecurity #secretsmanagement
    - **Circuit Breakers & Retries**: #circuitbreaker #resiliencepatterns #faulttolerance #retrylogic #timeoutstrategy
    - **Distributed Security Models**: #distributedSecurity #zeroTrust #networksegmentation #encryption #decentralizedsecurity

  ### 4. **Data Management & Optimization**
    - **SQL vs NoSQL**: #sql #nosql #relationaldatabases #keyvaluestores #documentstores
    - **Distributed Databases**: #cassandra #dynamodb #hbase #cockroachdb #sharding
    - **Caching Strategies**: #caching #redis #memcached #inmemorycaching #cacheinvalidations
    - **Data Serialization**: #protobuf #json #avro #serialization #deserialization
    - **Schema Evolution**: #schemaMigration #datamodeling #schemaversioning #backwardcompatibility #databasemigrations

  ### 5. **Microservices & Serverless Architecture**
    - **Stateless Services**: #stateless #restful #scalableapis #idempotent #statelesscomputing
    - **Service Meshes**: #servicemesh #istio #linkerd #envoy #trafficmanagement
    - **API Management**: #apimanagement #apiVersioning #rateLimiting #apiThrottling #authZ
    - **Function-as-a-Service (FaaS)**: #faas #lambdafunctions #serverlessfunctions #eventdriven #statelessfunctions
    - **Microservice Security**: #microservicesecurity #jwt #tokenAuth #serviceSegmentation #mutualTLS

  ### 6. **Performance Optimization**
    - **Latency Reduction**: #lowlatency #performanceoptimization #latencyreduction #fastdata #lowresponseTime
    - **Memory Management**: #memoryoptimization #garbagecollection #heapmanagement #profiling #memoryleaks
    - **Real-Time Performance**: #realtime #lowlatency #streamprocessing #highthroughput #realtimeapplications
    - **High-Throughput Systems**: #highthroughput #scalability #throughputoptimization #asynchronousprocessing #loadhandling
    - **Load Testing**: #loadtesting #stressTesting #benchmarking #performanceTesting #scalabilitytesting

  ### 7. **Testing, Monitoring, & CI/CD**
    - **Distributed Tracing**: #distributedtracing #jaeger #opentracing #microservicesmonitoring #fullstackobservability
    - **CI/CD Pipelines for Microservices**: #ci_cd #jenkins #githubactions #microservicesdeployment #pipelinemonitoring
    - **Log Aggregation**: #logaggregation #elkstack #splunk #logmanagement #distributedlogging
    - **Continuous Deployment**: #continuousdeployment #cicd #canarydeployments #bluegreenDeployments #automateddeployments
    - **Monitoring and Observability**: #observability #monitoring #prometheus #grafana #applicationmonitoring

  ### 8. **Real-Time Processing**
    - **Streaming Data Pipelines**: #datastreaming #kafka #flink #sparkstreaming #streamprocessing
    - **Kafka & RabbitMQ**: #kafka #rabbitmq #messagingqueue #pubsub #eventstreaming
    - **Real-Time Analytics**: #realtimeanalytics #realtimeprocessing #streamingdata #fastdataprocessing #latencyoptimization
    - **In-Memory Databases**: #inmemorydb #redis #memcached #lowlatencydatabases #realtimedata
    - **Event-Driven Systems**: #eventdrivenarchitecture #eventsourcing #eventprocessing #eventstreams #reactiveprogramming

  ### 9. **Containerization & Orchestration**
    - **Kubernetes Best Practices**: #kubernetes #k8s #containerorchestration #clusterscaling #containerdeployments
    - **Docker Optimization**: #docker #dockercontainers #containerization #dockerfile #imageOptimization
    - **Service Discovery**: #servicediscovery #dns #kubernetes #consul #serviceRegistry
    - **Orchestration of Complex Workloads**: #orchestration #kubernetes #containerworkloads #scheduler #autoscaling
    - **Containerized CI/CD Pipelines**: #cicdpipelines #dockerpipelines #containerdeployments #continuousIntegration #pipelineautomation

  ### 10. **Edge Computing & IoT**
    - **Fault-Tolerant Edge Architectures**: #edgecomputing #faulttolerance #distributedEdge #edgenodes #iot
    - **Real-Time Data Processing**: #edgeprocessing #realtimedata #edgedata #lowlatency #iotprocessing
    - **Security in Edge Computing**: #edgeSecurity #iotSecurity #distributedSecurity #zerotrust #decentralizedSecurity
    - **IoT Device Management**: #iotmanagement #iotdeployment #deviceManagement #mqtt #remotemanagement
    - **Hybrid Cloud-Edge Models**: #hybridcloud #edgecloud #distributedcloud #cloudedgeintegration #cloudtosensor
  `
}
