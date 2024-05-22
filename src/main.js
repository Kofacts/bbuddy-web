import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router file
import LocomotiveScroll from 'locomotive-scroll';
import './style.css'
import splitTextPlugin from './plugins/splitTextPlugin';
// import LocomotiveScrollPlugin from './plugins/loco'

const app = createApp(App);

// Wait for the window to load before initializing Locomotive Scroll
window.onload = () => {
  const scrollContainer = document.querySelector('[data-scroll-container]');
  if (scrollContainer) {
    app.config.globalProperties.$scroll = new LocomotiveScroll({
      el: scrollContainer,
      smooth: true,
    });
  }

  app.use(router); // Use the imported router
  app.use(splitTextPlugin);
  // app.use(LocomotiveScrollPlugin)
  app.mount('#app');
};
