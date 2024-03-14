# Factory Method Pattern Example

This project is an example of the Factory Method Pattern implemented in TypeScript. It includes a `UserFactory` class that creates instances of different user types.

This is one of my first projects in TypeScript, so I'm using it to learn the language and its features, as well as to practice design patterns.

## What is the Factory Method Pattern?

The Factory Method Pattern is a creational design pattern that provides an interface for creating objects, but allows subclasses to alter the type of objects that will be created.

In this project, the `UserFactory` class provides a method `getUser`, which creates and returns instances of different user types based on the input key.

## Installation

To install the project, you need to have Node.js and npm installed on your machine. Then, you can clone the repository and install the dependencies:

```sh
git clone
cd FactoryImplIdea
npm install
```

## Building the Project

To build the project, you can run the following command:

```sh
npm run build
```

This will run webpack to create the entrypoint file in `dist`, `bundle.js`, and generate TypeScript definition files in the `dist/types` folder.

## Running the Project

To run the project after building, simply run the following command:

```sh
npm run start
```

## Running from the entrypoint file/Webpack bundle

If you want to run the project from the entrypoint file/Webpack bundle, you can run the following command:

```sh
node dist/bundle.js
```

or

```sh
npm run start
```

## Running from transpiled TypeScript files (JavaScript)

If you want to run the project from the transpiled TypeScript files, you can run the following command:

Make sure you have run the build command before running this command:

```sh
npm run build:all
```

Then, you can run the following command:

```sh
node dist/js/index.js
```

## Problems with running transpiled TypeScript files - FIXED!

After `tsc` is used to compile the TypeScript files, the import/export paths after TypeScript transpilation are not compatible with Node.js CommonJS module resolution...

I.e. [`import { UserService } from './service/userService';`](src/index.ts#L1) becomes `import { UserService } from './service/userService';` in `dist/js/index.js`...

You would think it would work fine when doing `node dist/js/index.js` but it doesn't...

```sh
aidan@localhost:~/projects/work/FactoryImplIdea$ node dist/js/index.js
node:internal/errors:496
    ErrorCaptureStackTrace(err);
    ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/aidan/FactoryImplIdea/dist/js/service/userService' imported from /aidan/FactoryImplIdea/dist/js/index.js
    at new NodeError (node:internal/errors:405:5)
    at finalizeResolution (node:internal/modules/esm/resolve:327:11)
    at moduleResolve (node:internal/modules/esm/resolve:980:10)
    at defaultResolve (node:internal/modules/esm/resolve:1193:11)
    at ModuleLoader.defaultResolve (node:internal/modules/esm/loader:403:12)
    at ModuleLoader.resolve (node:internal/modules/esm/loader:372:25)
    at ModuleLoader.getModuleJob (node:internal/modules/esm/loader:249:38)
    at ModuleWrap.<anonymous> (node:internal/modules/esm/module_job:76:39)
    at link (node:internal/modules/esm/module_job:75:36) {
  url: 'file:///aidan/FactoryImplIdea/dist/js/service/userService',
  code: 'ERR_MODULE_NOT_FOUND'
}

Node.js v18.19.0

aidan@localhost:~/projects/work/FactoryImplIdea$ echo "i'm going to lose it"
i'm going to lose it
```

So an alternative is doing `node dist/js/index.js --experimental-specifier-resolution=node` [Stack Overflow Solution](https://stackoverflow.com/questions/68111434/how-to-run-node-js-cli-with-experimental-specifier-resolution-node)

But using `--experimental-specifier-resolution=node` is not a good solution because it is experimental and may not be supported in the future, as mentioned if you run it...

Another solution I personally found was adding `"type": "module"` to `package.json` and appending `.js` to every import statement in the transpiled JavaScript files.

So I made a script to do this for me in [js-file-import-fixer.cjs](js-file-import-fixer.cjs) and it is **automatically ran after the build command in the `build:all` or `build:types:js` script in `package.json`**.
