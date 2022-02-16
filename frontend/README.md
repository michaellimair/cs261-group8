# CS261 Frontend App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

### Development Environment

This project has been set up to play nicely with Visual Studio Code, hence the availability of the `.vscode` folder. However, if you use another IDE or editor, please ensure that the experience will be equivalent. You will need the following extensions:
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [JavaScript and TypeScript Nightly](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)
- [TypeScript React code snippets](https://marketplace.visualstudio.com/items?itemName=infeng.vscode-react-typescript)

### Steps

1. Ensure you have Node.js 16 and Yarn installed on your system.
   1. Verify by typing `npm -v` and `yarn -v` in your command line.
   2. You can install [Node.js](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/) if you do not have it.
2. Run `yarn` to install all the project dependencies.
3. Run `yarn start` to start the React project. Your browser should open automatically.

You can verify your test cases with `yarn test`. This will automatically run all test cases in the project and run the coverage test.

## Internationalization (i18n)

**DO NOT** place any plain text strings within component text files. If you have anything that resembles plain text (sentences, words, phrases), please add them to the `src/i18n/[locale].json` file so that it will support further localization.

Localization is something that has been implemented from the ground up so that no future extra effort is needed.

If you feel like it, feel free to add a locale to your own liking. For file name formatting of the locale file, please visit the reference [here](https://www.i18next.com/how-to/faq#how-should-the-language-codes-be-formatted).

## Routing

All routing is done with React Router v6. Please refer to the [new documentation](https://reactrouter.com/docs/en/v6/getting-started/overview), as a Google search might lead you to the old version (v5) which has a different set of APIs.
