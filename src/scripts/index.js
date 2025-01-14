import 'regenerator-runtime';
import '../styles/main.css';
import '../styles/responsive.css';
import '../styles/detailPage.css';
import '../styles/favoritePage.css';
import '../styles/message-styles.css';
import '../styles/skip-to-content.css';
import '../styles/swall.css';

import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import App from './views/app';
import './utils/skip-to-content';

import swRegister from './utils/sw-register';

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
