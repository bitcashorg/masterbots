# MasterBots System Diagram - Main DB + ICL (Metadata DB) v1.1a

```mermaid
graph TB
    User((User)) --> |1. Makes request| UI[User Interface]
    UI --> |2. Send request| LangProcessor[Language Processor]
    LangProcessor --> |3. Translate to English| RequestAnalyzer[Request Analyzer]
    
    subgraph "Request Analysis"
        RequestAnalyzer --> |4. Analyze request| CategoryIdentifier[Category Identifier]
        RequestAnalyzer --> |5. Analyze request| ToolSelector[Tool Selector]
        CategoryIdentifier --> |6. Identify categories| ICLSystem[(ICL System)]
        ToolSelector --> |7. Identify required tools| ToolSet[Tool Set]
    end
    
    subgraph "ICL System"
        ICLSystem --> |Store/Retrieve| Examples[Examples]
        ICLSystem --> |Store/Retrieve| Domain[Domain]
        ICLSystem --> |Store/Retrieve| Category[Category]
        ICLSystem --> |Store/Retrieve| SubCategory[Sub-Category]
        ICLSystem --> |Store/Retrieve| Tags[Tags]
    end
    
    subgraph "ICL and Tool Selection"
        ICLSystem --> |8. Provide relevant examples| ExampleMatcher[Example Matcher]
        ToolSet --> |9. Select appropriate tools| TaskExecutor[Task Executor]
    end
    
    subgraph "Task Execution"
        ExampleMatcher --> |10. Provide context| TaskExecutor
        TaskExecutor --> |11. Execute task| SelectedDomainBot[Selected Domain Bot]
        SelectedDomainBot --> |12. Return results| ResultAggregator[Result Aggregator]
    end
    
    ResultAggregator --> |13. Compile results| ResponseGenerator[Response Generator]
    ResponseGenerator --> |14. Translate to user language| LangProcessor
    LangProcessor --> |15. Send response| UI
    UI --> |16. Display results| User
    
    subgraph "Data Storage"
        MainDB[(Main Database)]
        MainDB --> |Store/Retrieve| SelectedDomainBot
        MainDB --> |Store/Retrieve| User
        MainDB --> |Store/Retrieve| ICLSystem
    end
    
    ICLSystem -.-> |Filter by| CategoryIdentifier
    ToolSet -.-> |Inform| TaskExecutor
```
