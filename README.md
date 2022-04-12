# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Develop](#develop)
  - [Init Project](#init-project)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties using pre-processor SCSS
- Flexbox
- CSS Grid
- [Vue.js](https://vuejs.org/) - Framework JavaScript
- [Sass](https://sass-lang.com/) - CSS Pre-processor
- [Vuex](https://vuex.vuejs.org/) - Manage global states

### What I learned

<details>
<summary>Vue</summary>

- `component` element at Vue is possible create new dynamic elements based in other component (example below is `reply-card`)

  ```html
  <div v-for="rep in reply" :key="rep.id">
    <component :is="'reply-card'" />
  </div>
  ```

  - see the use of loop to render N elements
  - the attribute `is` is very important (is who tell what component is to render)
  - [documentation](https://vuejs.org/api/built-in-special-elements.html#component)

</details>

<details>
<summary>Vuex</summary>

- About modules: Is ease split modules at project, just use the `module` property.
  ```js
  export default {
    module: { modA: { state: {}, actions: {} /*...*/ } },
  };
  ```

</details>

<details>
<summary>SCSS</summary>

- `mixins` help on reuse of CSS properties in SCSS files. [see mixin](./src/assets//styles//_mixins.scss) in use on [Container](./src/layout/CardContainer.vue#L27)

</details>

### Continued development

TODO: futuras alterações ou algo que poderia ser melhorado/implementado

### Useful resources

TODO: sites que ajudaram em algo, e explicar como ajudou

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- Vue
  - [Configuration Reference](https://cli.vuejs.org/config/)
  - [Dynamic component](https://vuejs.org/api/built-in-special-elements.html#component)

## Author

- Frontend Mentor - [@brian-izaki](https://www.frontendmentor.io/profile/brian-izaki)

## Develop

### Init Project

- use Node version >=16
- First init

  ```shell
  # to install project dependency
  npm install

  # to start
  npm run serve
  ```

- Others

  ```shell
  # Unit tests
  npm run test:unit

  # Lint
  npm run lint

  # Build
  npm run build
  ```

## Acknowledgments

TODO: Créditos para quem ajudou
