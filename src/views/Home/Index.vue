<template>
  <main>
     <pre-loader @animationDone="animationDone"></pre-loader>
  </main>
</template>

<script>
import PreLoader from '@/components/PreLoader.vue'
import StarsComponent from '@/components/Stars.vue'
import animateTextReveal from '@/helpers/textReveal.js';
import locomotiveScroll from 'locomotive-scroll';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ZoomableImage from '@/components/Zoomable.vue';
// import mediumZoom from 'medium-zoom'
import mediumZoom from 'medium-zoom/dist/pure'
import 'medium-zoom/dist/style.css'

import gsap from 'gsap'
export default {
  components: { PreLoader, StarsComponent, ZoomableImage },
  data() {
    return {
      showMainContent: false, //change
      currentSection: 'section1',
      animationPlayed: false,
      showMobileMenu: false,
      gradientColor: 'linear-gradient(to right, #97A09A, #8C857C)', // Default gradient color
      stopColor1: '#97A09A', // Default stop color 1
      stopColor2: '#8C857C', // Default stop color 2
      longitude: '',
      latitude: '',
      weather: '',
      sunset: '',
      sunrise: '',
      country: '',
      visibility: '',
      time: '',
      locationDenied: '',
      temp: '',
      facts: [
        "Big Bang: 13.787B yrs ago",
        "Stars: 100B in Milky Way",
        "Milky Way age: 13.6B yrs",
        "Rotation time: 24 hrs",
        "Astronauts (2024): 681",
        "Sun's diameter: 1.4M km",
        "Light speed: 299,792 km/s",
        "Avg. Earth temp: 15°C",
        "Human bones: 206",
        "Mount Everest: 8,848m",
        "Mariana Trench: 10,994m deep",
        "Sound speed: 343 m/s",
        "Species: 8.7M known",
        "Brain neurons: 86B",
        "Moon's distance: 384,400 km",
        "Great Wall: 21,196 km",
        "Languages: 7,000",
        "Sahara Desert: 9.2M sq km",
        "Water on Earth: 71%",
        "Universe age: 435B trillion secs"
      ]
    }
  },
  computed: {
    randomFacts() {
      const shuffledFacts = this.shuffleArray(this.facts);
      return shuffledFacts.slice(0, 6); // Get the first 6 shuffled facts
    },
  },
  methods: {
    shuffleArray(array) {
      let currentIndex = array.length, randomIndex;
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]
        ];
      }
      return array;
    },
    formatTime(timestamp) {
      const date = new Date(parseInt(timestamp, 10)); // Convert timestamp to milliseconds
      if (isNaN(date.getTime())) {
        return 'Invalid Date'; // Return if the timestamp is invalid
      }

      const hours = date.getHours();
      const minutes = date.getMinutes();
      const period = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

      return `${formattedHours}:${formattedMinutes} ${period}`;
    },
    scrollToSection(sectionId) {
      const section = this.$refs[sectionId];
      console.log(section)
      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        console.log('Skrewed')
      }
    },
    animationDone(isDone) {
      // console.log(isDone)
      // console.log('Thanks')
      // isDone = false //remember false on test, comment out

      if(isDone) {
        this.showMainContent = true
        this.$nextTick(() => {
          const tl = gsap.timeline();

          animateTextReveal('.mlogo__text .char', {
              reverse: false,
              duration: 0.5,
              delay: 0.5, // Adjust the delay as needed
              stagger: 0.1,
              y: '20px',
              opacity: 0,
              onComplete: () => {
                  // Animation complete callback if needed
              },
          });
          tl.set('.nano-main', {opacity: 1, zIndex: '2'})
          .from('.mlogo__icons div:first-child', { opacity:0, duration: 0.7 },'+=2')
          .from('.mlogo__icons div:nth-child(2)', { opacity:0, duration: 0.7 },'-=0.7')
          .from('.mlogo__icons div:nth-child(3)', { opacity:0,duration: 0.7 },'-=0.7') 
          // .to('.stars', {opacity: 1, y: '50px'},'+=0.5',)
          
          // Animate Vision menu item
          animateTextReveal('.menu__list a:nth-child(1)', {
            reverse: false,
            duration: 0.5,
            delay: 4.5,
            stagger: 0.1,
            y: '20px',
            opacity: 0,
          });
          animateTextReveal('.menu__list a:nth-child(2)', {
            reverse: false,
            duration: 0.5,
            delay: 4.6,
            stagger: 0.1,
            y: '20px',
            opacity: 0,
          });
          animateTextReveal('.menu__list a:nth-child(3)', {
            reverse: false,
            duration: 0.5,
            delay: 4.7,
            stagger: 0.1,
            y: '20px',
            opacity: 0,
          });

          tl.from('.camera__icon', {opacity: 0, duration: .7})
          tl.from('.stars-container', {opacity: 0, duration: .7})
          tl.from('.main-content', {opacity: 0, duration: .7})

          this.longitude = localStorage.getItem('longitude') || '989e78rq7º';
          this.locationDenied = localStorage.getItem('locationDenied');
          this.latitude = localStorage.getItem('latitude') || '989e78rq7º';
          this.weather = localStorage.getItem('weather') || 'SUNNY';
          this.sunrise = this.formatTime(localStorage.getItem('sunrise'));
          this.sunset = this.formatTime(localStorage.getItem('sunset'));
          this.temp = localStorage.getItem('temp');
          this.country = localStorage.getItem('country');
          this.time = this.formatTime(localStorage.getItem('timestamp')) || '3:12PM';
          this.visibility = localStorage.getItem('visibility') || '';
          // tl.from('.foot', {opacity: 0, duration: .7})

          this.initLocomotiveScroll();

          setTimeout(() => {
          const scrollContainer = document.querySelector('[data-scroll-container]');
          if (scrollContainer) {
            // Use GSAP to animate opacity from 0 to 1
            gsap.to(scrollContainer, { opacity: 1, duration: 0.3 });
          }
        }, 5000);
        });
      }
    },
    scrollLeft(to) {
      const scrollContainer = this.$refs.scrollContainer;
      const scrollTwoContainer = this.$refs.scrollTwoContainer;

      let v = to == 1 ? scrollContainer : scrollTwoContainer;
      // scrollContainer.scrollLeft -= 100; 
      v.scrollBy({
        left: -100,
        behavior: 'smooth'
      })
    },
    scrollRight(from) {
      const scrollContainer = this.$refs.scrollContainer;
      const scrollTwoContainer = this.$refs.scrollTwoContainer;

      let v = from == 1 ? scrollContainer : scrollTwoContainer;
      v.scrollBy({
        left: 100, // Scroll right by the width of the container
        behavior: 'smooth', // Smooth scrolling
      });
    },
    handleStickyScroll(scrollArgs) {

      const h1Elements = document.querySelectorAll('h1');
      const spanElements = document.querySelectorAll('span')
      const { scroll } = scrollArgs;
      console.log(scrollArgs)

      // Loop through h1 elements to apply gradient changes based on scroll position
      h1Elements.forEach(h1Element => {
        if (scroll.y > 1582) {
          h1Element.classList.remove('h1-gradient1');
          h1Element.classList.add('h1-gradient2');
          console.log('change 100 great')
          this.stopColor1 = '#7C6F6E'; // New stop color 1
          this.stopColor2 = '#CFA6AA';
        } else {
          console.log('no change')
          h1Element.classList.remove('h1-gradient2');
          h1Element.classList.add('h1-gradient1');
          this.stopColor1 = '#97A09A'; // New stop color 1
          this.stopColor2 = '#8C857C';
        }
      });

    spanElements.forEach(spanElement => {
    if (scroll.y > 1582) {
      spanElement.classList.remove('span-gradient1');
      spanElement.classList.add('span-gradient2');
    } else {
      spanElement.classList.remove('span-gradient2');
      spanElement.classList.add('span-gradient1');
    }
  });
      const sectionsToWatch = [this.$refs.sectionToWatch1, this.$refs.sectionToWatch2];
      let tl = gsap.timeline()

      sectionsToWatch.forEach(section => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top top', // Adjust as needed
          end: 'bottom top', // Adjust as needed
          onEnter: () => {
            if (!this.animationPlayed) {
              let tl = gsap.timeline()
              // console.log('Section entered sticky position:', section.id);
              tl.to(`#${section.id} .proj-hide`, { opacity: 1 });
              this.animationPlayed = true; // Set flag to true after animation plays
          }
            
          },
          onLeave: () => {
            this.animationPlayed = false;
          },
          onLeaveBack: () => {
            // Do something when the section leaves the sticky position
            tl.to('.proj-hide', { opacity: 0 });
          },
          onUpdate: (self) => {
            // Check if the element is in a sticky state
            const isSticky = section.classList.contains('is-sticky');
          },
        });
      });

    },
    initLocomotiveScroll() {
      // Example initialization code (adjust as per your setup)
      const scroll = new locomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        direction: 'vertical',
        offset: ['20%',0],
        // Add other options here
      });
              const zoomableImages = document.querySelectorAll('[data-zoomable] img');
      zoomableImages.forEach(img => {
        const zoomInstance = mediumZoom(img, { /* options */ });
      });
      gsap.registerPlugin(ScrollTrigger);

      scroll.on('scroll', (scrollArgs) => this.handleStickyScroll(scrollArgs));
    },
    handleScroll() {
      const sections = document.querySelectorAll('[data-scroll-section]');
      let currentSection = null;

      // Iterate through each section and check if it's in view
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
          // Set the current section if it's in view
          currentSection = section.id;
        }
      });

      // Update the currentSection data
      this.currentSection = currentSection;
      console.log(this.currentSection)
      if(this.currentSection == 'section1') {
        console.log('Suck Dick')
      }
    },
  },
  mounted() {
    gsap.set('.nano-main', {opacity: 1, zIndex: '2'}) //change
    mediumZoom('[data-zoomable]')
    // Initial setup to add class to h1 elements
    const h1Elements = document.querySelectorAll('h1');
    const spanElements = document.querySelectorAll('span');
    h1Elements.forEach(h1Element => {
        h1Element.classList.add('h1-gradient1');
    });
    spanElements.forEach(spanElement => {
        spanElement.classList.add('span-gradient1');
    });



    // console.log(this.$locomotive)
    // this.$locomotive.init()
    // this.initLocomotiveScroll();
    // window.addEventListener('scroll', function() {
    //   this.animationDone();
    // });
    this.$nextTick(() => {

    })
  }
}
</script>

<style scoped>
.gradient-overlay {
  /* background: var(--Linear, linear-gradient(180deg, rgba(22, 25, 41, 0.40) 0%, rgba(2, 125, 141, 0.40) 27.5%, rgba(217, 81, 39, 0.40) 100%)); */
  mix-blend-mode: multiply;
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 20000;
}
.h1-gradient1 {
    background: linear-gradient(0deg, #ACB2A4 0%, #C6AC9A 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* Other gradient styles */
.h1-gradient2 {
    background: linear-gradient(180deg, #E5B4B9 0%, #E5C8C4 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.span-gradient1{
  background: linear-gradient(0deg, #C6AC9A 0%, #DDA890 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.span-gradient2 {
  background: linear-gradient(180deg, #E5C8C4 0%, #F6E4CF 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.scroll-snappy {
  display: flex;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory; /* Optional: Add scroll snapping */
  max-width: 90vw;
  margin: 0 auto;
  padding-left: 60px;
  padding-right: 100px;
}
.scroll-snappy::-webkit-scrollbar {
    display: none; /* Hide scrollbar for WebKit browsers (Chrome, Safari, etc.) */
}
.proj-hide {
  opacity: 0;
}
/* Optional: Add scroll snapping behavior to items */
.scroll-snappy > div {
  scroll-snap-align: center;
}
.scroll-trig {
  background: linear-gradient(90deg, rgba(16, 18, 26, 0.00) 0%, #10121A 69.09%);
  position: absolute;
  height: 100%;
  z-index: 20;
}
.scroll-trig--left {
  background: linear-gradient(270deg, rgba(16, 18, 26, 0.00) 0%, #10121A 69.09%);
  left: -25px;
}
.scroll-trig--right {
  right: -25px;
}
.menu {
  background: linear-gradient(0deg, rgba(16, 18, 26, 0.00) 0%, #10121A 69.09%);

  /* Background blur */
  backdrop-filter: blur(1px);
  
  padding-bottom: 60px;
}
.foot {
  background:linear-gradient(170deg, rgba(48, 20, 42, 0.50) 2.61%, rgba(25, 15, 23, 0.50) 22.29%, rgba(226, 141, 193, 0.50) 43.72%, rgba(190, 152, 201, 0.50) 60.34%, rgba(255, 247, 251, 0.50) 90.08%);
}
.m__menu {
  height: 0;
  max-height: 0;
  width: 100%;
  transition: 5s max-height cubic-bezier(0.075, 0.82, 0.165, 1);
}
.m__menu--active {
  height: 100vh;
  max-height: 100vh;
  transition:.5s max-height cubic-bezier(0.075, 0.82, 0.165, 1);
}
</style>