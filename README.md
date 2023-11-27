# Masterbots

## **MasterBots is a UX-focused open-source chatbot aggregator platform and alternative to ChatGPT.**

### **Problem #1: ChatGPT spaghetti threads are hard to organize and most users are not skilled at prompting. The recent custom GPTs may solve some of these problems.**

Solution: However, MasterBots is organized by categories & domain-expert bots that will be prompt-tuned and fine-tuned to give better experiences from the beginning.

### **Problem #2: ChatGPT and LLMs are focused on inference. Inference is slow and costly.**

Re-using generations is far more efficient.

Solution: MasterBots will make all user generations public so people who want answers can browse for answers rather than ‘chat’ and chat requests can be routed via lexical search to existing generations before using an LLM. (Note: In the future private generations will be an option using blackbox inference and to prevent any one company from amassing user data. Generations will either be public for all or private.) Users will also have an option to Share GPT4 thread links to MasterBots to be shared publicly.

### **Problem #3: ChatGPT & GPT4 are expensive and slow.**

Solution: Fine-tuned open-source small models can be cheap and fast. Zepher/Mistral with only 7B parameters is competitive with GPT3.5. The future is thousands of small fine-tuned expert models, not one model to do everything.

### **Problem #4: ChatGPT UX is basic.**

Solution: We plan to improve UX by organizing based 1) on category & domain-expertise 2) easy response customizations on tone/length/type/complexity 3) make responses clickable to facilitate further questions 4) continually focus on easy prompting UX.

MasterBots is open-source. We are building in public!  
Contributors will earn platform credits that can be sold for cash.
(Credits may get more valuable over time)

Here is our public Trello board:
<https://trello.com/b/GDCm18zN/masterbots-chatbot-aggregator-development-board>

Setting up in your local machine:

<ol>
<li>Install Hasura, Postgres, Docker, Nextjs (use yarn)</li>
<li>Set up .env and .env.local files (see .env.sample)</li>
<li>Set up Docker with hasura-graphql & postgres db. </li>
</ol>

### **Local Development:**

### Installing Package Manager

- Install bun <https://bun.sh/docs/installation#macos-and-linux>
- On root folder or to the app that you want to run and execute `bun i # bun install` and then run a script from a `package.json` by executing `bun {script} # bun dev`

bun use similar name convention on functions and options as yarn

#### Deploying only Hasura (see `.env.sample` for reference)

```bash
cd apps/masterbots-hasura
hasura init --endpoint http://localhost:8080
hasura migrate apply
hasura metadata apply
hasura seed apply
```

#### Deploying with Docker (see `.env.sample` and `Taskfile.yml` for reference)

- Install [Docker Desktop](https://docs.docker.com/desktop/) and [Taskfile CLI](https://taskfile.dev/installation/) if you haven't.

```bash
task boot # boot up docker containers. Install if does not find local images. Make migrations and seeds.
task console # open hasura console. ! Make sure to always make changes in console this way.
# * Additional useful commands
task down # stop docker containers
task reboot # reboot docker containers
```

#### Developing the frontend

- **React Native:** [README.md](./apps/masterbots-native/README.md)
- **NextJS:** [README.md](./apps/masterbots-web/README.md)

#### Development Conventions: [conding-style-n-conventions.md](./coding-style-n-conventions.md)

**Robots lovingly delivered by Robohash.org and images created by Zikri Kader**
