#How to Contribute

## Installing Dependencies
The preferred package manager for this repository is `yarn`. `yarn` is recommended due to the history of version differences in the repository. In case `npm install` runs into some problems, try `yarn install` if that sorts some things out.

## Local Configuration
In the root folder, you can find a .env file containing environment variables. Notice that REACT_APP_SITE is by default set to https://localhost:3000/, `yarn start` runs on a different port other than 3000, change REACT_APP_SITE's trailing port to the port you're running it in.

## Webpack Configuration
Webpack configuration is exposed in this repository, it's important that you do not push or commit changes to the `/config` directory unless you've consulted with the owner of this repo.

## File Structure
`/src` contains all the source files.
  `/assets` - all images, fonts, and other non-JS related resources are placed.
  `/layouts` - wrapper layouts are put. Layouts wrap *pages*.
  `/pages` - goes without saying, it's for pages! Anything you see in the screen is a page.
  `/stores` - all mobX stores are put in here. RootStore compiles all other stores with in the same folder. Creation of a new should mean a new instance of your store is instantiated in the RootStore.
  `/components` - are generic parts of an application. This can be a `Card`, a form, or any of those sort. If you think that portion of the page can be used in other pages or components, create a component and embed it to that page. Read more about [components](https://reactjs.org/docs/components-and-props.html).
  
## Technologies
This repository uses [mobX](https://github.com/mobxjs/mobx) for state management. [Styled-components](https://www.styled-components.com/docs) over CSS.
