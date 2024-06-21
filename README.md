# masterbots

**MasterBots is a UX-focused open-source chatbot aggregator platform and alternative to ChatGPT.**

**Problem #1: ChatGPT spaghetti threads are hard to organize and most users are not skilled at prompting.  The recent custom GPTs may solve some of these problems.**

Solution: However, MasterBots is organized by categories & domain-expert bots that will be prompt-tuned and fine-tuned to give better experiences from the beginning.

**Problem #2: ChatGPT and LLMs are focused on inference.  Inference is slow and costly.**  
Re-using generations is far more efficient. 

Solution: MasterBots will make all user generations public so people who want answers can browse for answers rather than ‘chat’ and chat requests can be routed via lexical search to existing generations before using an LLM. (Note: In the future private generations will be an option using blackbox inference and to prevent any one company from amassing user data. Generations will either be public for all or private.)  Users will also have an option to Share GPT4 thread links to MasterBots to be shared publicly. 

**Problem #3: ChatGPT & GPT4 are expensive and slow.**

Solution: Fine-tuned open-source small models can be cheap and fast.  Zepher/Mistral with only 7B parameters is competitive with GPT3.5.  The future is thousands of small fine-tuned expert models, not one model to do everything. 

**Problem #4: ChatGPT UX is basic.**  

Solution:  We plan to improve UX by organizing based 1) on category & domain-expertise 2) easy response customizations on tone/length/type/complexity 3)  make responses clickable to facilitate further questions 4) continually focus on easy prompting UX.

MasterBots is open-source.  We are building in public!  
Contributors will earn platform credits that can be sold for cash.
(Credits may get more valuable over time)

Here is our public Trello board: 
https://trello.com/b/GDCm18zN/masterbots-chatbot-aggregator-development-board

## Requirements

- NodeJS. We recommend [nvm](https://github.com/nvm-sh/nvm) for version switching.
- Hasura Cli https://hasura.io/docs/latest/hasura-cli/overview.
- pnpm package manager https://pnpm.io/
- [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/)
- Task manager https://taskfile.dev

## Running the Backend:

In root folder, create an .env file based of .env_sample and the use `task` to execute the following commands to operate Hasura locally.

- **boot**: Boots up the database and Hasura services, with a delay to ensure proper startup, followed by running migrations.
- **reboot**: Shuts down and then restarts the services.
- **seed**: Applies seed data to the Hasura project.
- **console**: Launches the Hasura console for the specified project.
- **migrate**: Applies database migrations and updates Hasura metadata. 
- **reload**: Restarts the Postgres service, then all services, and tails the Hasura logs.
- **up**: Starts all services defined in the Docker Compose file with a build.
- **down**: Shuts down all services and removes any orphaned containers.

## Running the Frontend

In apps/masterbots.ai folder (set up .env file - see .env_sample):

```
bun install
turbo run dev --scope="masterbots.ai" 
# task app will execute the same command
```
## Site Map Diagram

![Masterbots Site Map](https://www.mermaidchart.com/raw/4b1761c6-e3fd-4e0b-8efb-aed6b3ff89ef?theme=light&version=v0.1&format=svg)

