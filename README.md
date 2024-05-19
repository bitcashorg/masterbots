# MasterBots README

Welcome to the MasterBots repository! This document provides a comprehensive overview of our open-source chatbot aggregator platform, which offers an enhanced user experience and efficient, scalable solutions compared to traditional large language models.

## Introduction

MasterBots is designed to address common issues in user experience and efficiency in interacting with large language models. Our platform categorizes and utilizes domain-expert bots, which are prompt-tuned and fine-tuned, to provide superior user interactions right from the start.

## Features

- **Categorized Domain-Expert Bots**: Bots are organized by categories for ease of access and tailored responses.
- **Efficient Use of Generations**: Reuses previous generations to minimize cost and response time, with an option for private generations using blackbox inference.
- **Enhanced User Experience**: Offers easy customization of response tone, length, type, and complexity. Integrates clickable responses for seamless user interaction.
- **Open-Source Community**: Encourages collaboration and contribution, offering credits that can be exchanged for cash.

### What problem are we solving?

**MasterBots is a UX-focused open-source chatbot aggregator platform and alternative to ChatGPT.**

**Problem #1: ChatGPT spaghetti threads are hard to organize and most users are not skilled at prompting. The recent custom GPTs may solve some of these problems.**

Solution: However, MasterBots is organized by categories & domain-expert bots that will be prompt-tuned and fine-tuned to give better experiences from the beginning.

**Problem #2: ChatGPT and LLMs are focused on inference. Inference is slow and costly.**  
Re-using generations is far more efficient.

Solution: MasterBots will make all user generations public so people who want answers can browse for answers rather than ‘chat’ and chat requests can be routed via lexical search to existing generations before using an LLM. (Note: In the future private generations will be an option using blackbox inference and to prevent any one company from amassing user data. Generations will either be public for all or private.) Users will also have an option to Share GPT4 thread links to MasterBots to be shared publicly.

**Problem #3: ChatGPT & GPT4 are expensive and slow.**

Solution: Fine-tuned open-source small models can be cheap and fast. Zepher/Mistral with only 7B parameters is competitive with GPT3.5. The future is thousands of small fine-tuned expert models, not one model to do everything.

**Problem #4: ChatGPT UX is basic.**

Solution: We plan to improve UX by organizing based 1) on category & domain-expertise 2) easy response customizations on tone/length/type/complexity 3) make responses clickable to facilitate further questions 4) continually focus on easy prompting UX.

MasterBots is open-source. We are building in public!  
Contributors will earn platform credits that can be sold for cash.
(Credits may get more valuable over time)

## Requirements

- **NodeJS**: We recommend using [nvm](https://github.com/nvm-sh/nvm) for managing versions.
- **Bun**: A modern JavaScript runtime like Node.js but designed for speed. [Install Bun](https://bun.sh/)
- **Supabase CLI**: Tool for local development and database schema management. [Install Supabase CLI](https://supabase.com/docs/guides/cli)
- **Docker**: Necessary for containerization of your development environment. [Install Docker](https://docs.docker.com/engine/install/)

## Tech Stack

### Backend & APIs

- **Supabase & pgVector**

  - Authentication and real-time subscriptions.
  - **Advanced Vector Search**: Utilizing pgVector for enhanced query capabilities, crucial for AI-driven searches and data relations in large datasets.

- **OpenAI**
  - Integration with advanced AI models like GPT-3.5, known for its deep understanding and generative capabilities.
  - Scalable and reliable via RESTful APIs.
  - **Future Integrations**: Plans to incorporate additional cutting-edge LLMs such as open-source Mistral and LLama to diversify capabilities and access.

### Frontend & Design

- **Next.js 14**

  - Efficient routing with App Router.
  - Server-side data fetching with the Actions framework.
  - [Learn more about Next.js](https://nextjs.org/docs/routing/introduction)

- **Shadcn & Radix**
  - Pre-designed UI components for rapid development.
  - Highly accessible and customizable.
  - [Learn more about Shadcn](https://shadcn.com/)
  - [Learn more about Radix](https://www.radix-ui.com/)

### DevOps and Tools

- **Turbo Monorepo**

  - Optimizes build performance through dependency management and caching.
  - Supports scalable architectures with cohesive component organization.

- [Learn more about Turbo Monorepo](https://turborepo.org/)

- **Lighthouse CI**
  - Automated performance metrics for web apps, integrating with CI/CD pipelines.
  - Provides detailed optimization reports.
  - [Learn more about Lighthouse CI](https://developers.google.com/web/tools/lighthouse#ci)

### Prototyping

- **v0.dev**

  - Real-time collaboration tools for quick prototyping.
  - [Learn more about v0.dev](https://v0.dev/)

- **Tailwind Figma Plugins**
  - Integrates Tailwind CSS in Figma for design consistency.
  - [Learn more about Tailwind Figma Plugins](https://www.figma.com/community/file/1203061493325953101/shadcn-ui-design-system)

### Animation

- **Framer Motion for React**

  - Animation tools designed for React applications.
  - [Learn more about Framer Motion](https://www.framer.com/motion/)

- **UseAnimations React Library**
  - Customizable animations ready for use in React.
  - [Learn more about UseAnimations](https://useanimations.github.io/react-useanimations/)

## Installation

To get started with MasterBots, clone the repository and install the dependencies:

```bash
git clone https://github.com/bitcashorg/masterbots.git
cd masterbots
bun install
```

## Usage

Start the development server:

```bash
bun run dev
```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

We encourage contributors to join our Discord server for collaboration. [Join us on Discord!](https://discord.com/invite/a4gwhT9G)

Please ensure to update tests as appropriate and follow the code of conduct and contribution guidelines.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments
