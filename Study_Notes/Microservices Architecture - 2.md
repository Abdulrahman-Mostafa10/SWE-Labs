2025-01-13 11:15

Tags: [[Software Engineering (SWE)]]

# Microservices Architecture - 2

### **I. Introduction to Microservices**

- **Microservices**: Small, stateless services with a single responsibility that can be combined to create larger applications. They are self-contained, managing their own data and user interfaces, and are designed to be independent.
- **Software Services**: Components accessible remotely via the internet, which process inputs and provide outputs without side effects. They are stateless, meaning they do not store data internally; any state is stored externally.
- **Key Characteristics**:
    - Self-contained, with no external dependencies.
    - Use lightweight communication protocols.
    - Implementation-independent, allowing for different technologies or languages for each service.
    - Independently deployable, running in isolated processes.
    - Business-oriented, aligned with business capabilities rather than technical services.

---

### **II. Monolith vs. Microservices**

- **Monolithic Architecture**: A single, unified application. Changing any part of the system requires redeploying the entire system.
- **Microservices Architecture**: A set of small services, each with a clear business responsibility, running in their own processes.
    - **Benefits of Microservices**:
        - Independent failure handling, as one service can fail without affecting others.
        - Easy to scale out services, as replicas can be deployed on different servers without requiring powerful hardware, or to reallocate the service on other servers, since it is portable because it is containerized.

---

### **III. Microservice Communication**

- **Message Exchange**: Microservices communicate through messages that include data and the origin of the request.
    - Example: An authentication service sends a message to the login service with the username.
- **Communication Considerations**:
    - **Synchronous vs. Asynchronous**: Services may communicate synchronously (immediate response) or asynchronously (delayed response).
    - **Direct Communication vs. Message Broker**: Services can either communicate directly or through a message broker (e.g., Kafka, Redis, or RabbitMQ).
    - **Protocol**: Protocols like HTTP, RESTful, or gRPC are used for service communication.

---

### **IV. Cohesion and Coupling**

- **Cohesion**: The degree to which the components of a service are closely related. High cohesion means that all parts of the service are tightly focused on a single responsibility.
- **Coupling**: The degree of interdependence between services. Low coupling means services are minimally dependent on each other, allowing for greater flexibility and easier maintenance.

---

### **V. API Gateway**

- **Functionality**: The API Gateway acts as a single entry point for client requests, handling:
    - Rate limiting
    - Error handling
    - Caching
- **Customization**:
    - Reverse Proxy (e.g., using Nginx).
    - Fully customized solution (e.g., using NodeJS).

---

### **VI. Decomposition Guidelines**

- **Single vs. Multiple Function Services**: Balancing between fine-grain functionality (small services) and performance.
- **Common Closure Principle**: Services should be grouped by elements that change together `remeber in the software architecture leccture, when we have said that the software elements (components), that are changing regulary together at the same time to be within a single software component, to reach the single-concern, but here we aslo need the operational inpedence of each service not the functional only, so it is an updated charactersitics called 'self-contained'`.
- **Business Capabilities**: Align services with business needs, as each service should represent a specific business capability.
- **Data Access**: Services should only have access to the data they need, and mechanisms should be in place for propagating changes when multiple services need the same data.

---

### **VII. Microservice Data Design**

- **Data Isolation**: Each service should manage its own data with minimal sharing.
- **Read-Only Sharing**: When data sharing is needed, it should be read-only for most services, with a minimal number of services allowed to perform updates.
- **Eventual Consistency**: Data across services may not be immediately consistent but will eventually align. This can be managed with transaction logs and eventual  saving the updates across replicas.

---

### **VIII. Inconsistency Management**

- **Types of Inconsistency**:
    - **Dependent Data Inconsistency**: Changes in one service can affect the data in another service.
    - **Replica Inconsistency**: Multiple service replicas may update their own copies of data, leading to temporary discrepancies.
- **Eventual Consistency**: Ensures that, over time, all services will align their data using transactions log.

---

### **IX. Service Coordination**

- **Workflow Implementation**: Microservices can coordinate their operations using two methods:
    - **Orchestration**: A central controller directs the flow of the service interactions.
	    - It is easy for debugging and bugs detection.
	    - The orchestrator's implementation is complex
    - **Choreography**: Services autonomously interact with each other based on predefined rules.
	    - It is difficult for debugging, as you can't know which service has failed or caused the system stall.

---

### **X. Failure Handling**

- **Failure Types**:
    - **Internal Service Failure**: Detected within the service and reported via an error.
    - **External Service Failure**: Caused by dependencies outside the service.
    - **Performance Failure**: Service performance degrades due to high load or internal issues.
- **Timeouts and Circuit Breakers**:
    - **Timeouts**: A service call is considered a failure if it exceeds a predefined time limit.
    - **Circuit Breakers**: Prevent delays by immediately halting requests to a failing service, avoiding system-wide slowdowns.

---

### **XI. RESTful Services**

- **Principles**:
    - **Stateless**: Services do not maintain internal state.
    - **URI Addressable**: Resources are accessed via unique URIs.
    - **Use of HTTP Verbs**: Common HTTP methods (GET, POST, PUT, DELETE) are used to perform operations on resources.
- **Operations**:
    - **Create**: POST to create a resource.
    - **Read**: GET to fetch a resource.
    - **Update**: PUT to modify an existing resource.
    - **Delete**: DELETE to remove a resource.

---

### **XII. Service Deployment**

- **Challenges**: Deploying microservices is more complex than monolithic systems due to the independence of each service.
- **Continuous Deployment**: Services are continuously deployed as changes are made and validated, using an automated pipeline.
    - The pipeline includes stages like checkout and run unit tests, build, run integration testing, containerization, and running acceptance and E2E tests before deployment.

---

### **XIII. Key Points**

- Microservices are self-contained, independent, and designed for scalability.
- They communicate using lightweight protocols and should follow RESTful principles.
- Microservices architecture is well-suited for cloud environments, and continuous deployment enables efficient updates.
- The primary challenges include service coordination, failure management, and data consistency.

---

This organized summary captures the essence of **microservices architecture** while ensuring all key points from the slides are included. Let me know if you'd like more detailed explanations on specific sections!



