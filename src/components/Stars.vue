<template>
<div class="relative">
  <div class="stars-container w-screen h-screen -z-10"></div>
  <div class="fixed right-20 top-40 constellation">
    <svg width="218" height="195" viewBox="0 0 218 195" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M216 153C217.105 153 218 152.105 218 151C218 149.895 217.105 149 216 149C214.895 149 214 149.895 214 151C214 152.105 214.895 153 216 153Z" fill="#F2E6D6"/>
      <path d="M188 195C189.105 195 190 194.105 190 193C190 191.895 189.105 191 188 191C186.895 191 186 191.895 186 193C186 194.105 186.895 195 188 195Z" fill="#F2E6D6"/>
      <path d="M123 158C124.105 158 125 157.105 125 156C125 154.895 124.105 154 123 154C121.895 154 121 154.895 121 156C121 157.105 121.895 158 123 158Z" fill="#F2E6D6"/>
      <path d="M134.5 115C135.881 115 137 113.881 137 112.5C137 111.119 135.881 110 134.5 110C133.119 110 132 111.119 132 112.5C132 113.881 133.119 115 134.5 115Z" fill="#F2E6D6"/>
      <path d="M99.5 71C100.881 71 102 69.8807 102 68.5C102 67.1193 100.881 66 99.5 66C98.1193 66 97 67.1193 97 68.5C97 69.8807 98.1193 71 99.5 71Z" fill="#F2E6D6"/>
      <path d="M76 32C76.5523 32 77 31.5523 77 31C77 30.4477 76.5523 30 76 30C75.4477 30 75 30.4477 75 31C75 31.5523 75.4477 32 76 32Z" fill="#F2E6D6"/>
      <path d="M2.5 5C3.88071 5 5 3.88071 5 2.5C5 1.11929 3.88071 0 2.5 0C1.11929 0 0 1.11929 0 2.5C0 3.88071 1.11929 5 2.5 5Z" fill="#F2E6D6"/>
    </svg>
  </div>

</div>
</template>

<script>
import gsap from 'gsap';

export default {
  mounted() {
    this.createStars();
  },
  methods: {
    randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    },
    createStars() {
      const container = document.querySelector('.stars-container');
      const numStars = 20; // Adjust as needed

      for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        container.appendChild(star);

        // Set random size and position for each star
        const size = this.randomInRange(2, 7); // Size between 5px and 11px
        const posX = this.randomInRange(0, 150);
        const posY = this.randomInRange(0, 100);
        // star.stype.display = 'flex';
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${posX}vw`;
        star.style.top = `${posY}vh`;
        star.style.background = '#F2E6D6'
        star.style.opacity = this.randomInRange(0, 1)

        // console.log(star)
        // Zoom effect animation
        gsap.fromTo(star, { scale: 2 }, { scale: 4, duration: 0.5, delay: this.randomInRange(0, 2), ease: 'power2.inOut', repeat: 1, yoyo: true });

        // Twinkle animation
        gsap.to(star, { opacity: .6, duration: this.randomInRange(0.5, 1.5), delay: this.randomInRange(2, 5), repeat: -1, yoyo: true });
      }
      gsap.to('.constellation', {opacity: 1})
    },
  },
};
</script>

<style>
.stars-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.star {
  position: absolute;
  background-color: #fff;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
}
</style>
