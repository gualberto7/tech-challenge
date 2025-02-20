# Coding challenge - Bob’s cats

This project is a coding challenge that consists of a web page where users can view images of cats and vote for their favorite cats. Additionally, users can sort the cats by the most voted ones.

## Architecture

The architecture of this project follows a modular approach. Each module encapsulates its own functionality, including interfaces, store, services, and components. For example, the Cat module contains everything related to the cat functionality:

- Interfaces: Defines the data structures used within the module.
- Store: Manages the state specific to the module.
- Services: Handles the business logic and API calls.
- Components: Contains the Vue components specific to the module.

This modular architecture helps in maintaining a clean and organized codebase, making it easier to manage and scale the application.

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```
