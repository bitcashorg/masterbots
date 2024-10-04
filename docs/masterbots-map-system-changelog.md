# Masterbots ICL System Changelog

## Version 1.1 - 2024-08-28

### Major Changes

1. Merged Metadata DB and Vector Database into a single ICL System
   - Reflects the understanding that these components serve the same purpose in the system
   - Simplifies the overall architecture

2. Expanded ICL System details
   - Added subcomponents: Examples, Domain, Category, Sub-Category, and Tags
   - Clarified the store/retrieve relationship between ICL System and its subcomponents

3. Renamed "Bot Network" to "Selected Domain Bot"
   - Improves clarity on the role of this component in the system

4. Split task identification process
   - Separated into parallel steps: Category Identifier and Tool Selector
   - Allows for more focused and potentially more accurate processing

### Minor Changes

1. Added "Tool Set" component
   - Represents the available tools that can be selected for task execution

2. Adjusted the flow to show ICL System and Tool Set informing the Task Executor
   - Provides a clearer representation of how these components interact

3. Simplified overall flow while maintaining key steps
   - Improves readability and understanding of the system architecture

### Key Points for Versioning Control

1. ICL System is now central to the architecture, replacing separate Metadata and Vector databases
2. Task identification is now a two-step process, potentially improving accuracy
3. The system now has a clearer representation of tool selection and usage
4. The role of domain-specific bots is more clearly defined
5. The diagram now provides more detail on the contents and usage of the ICL System

## Version 1.0 - Initial Release

### Key Components

1. User Interface and Language Processor
2. Request Analyzer
3. Task Identifier
4. Tool Selector
5. Bot Selector
6. Vector Database for example search
7. Metadata DB for filtering
8. Example Matcher
9. Task Executor
10. Bot Network for task execution
11. Result Aggregator and Response Generator

### Notable Features

- Separate Metadata DB and Vector Database
- Single-step task identification process
- Less detailed representation of ICL system contents
- "Bot Network" terminology for execution component
