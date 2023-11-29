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
- Bun package manager https://bun.sh 
- [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/)

## Running in your local machine:


In root folder (set up .env.local file - see .env_sample):<br>
run docker-compose up -d<br>

In frontend folder (set up .env.local file - see .env_sample):<br>
cd apps/frontend<br>
yarn build<br>
yarn dev<br>

In hasura folder (set up .env.local file - see .env_sample):<br>
cd apps/hasura<br>
hasura init --endpoint http://localhost:8080<br>
hasura migrate apply<br>
hasura metadata apply<br>
hasura seed apply<br>



