<template>
  <div class="zoomable-image" @click="toggleZoom">
    <img :src="imageUrl" :alt="altText">
    <div v-if="isZoomed" class="zoomed-overlay" @click="closeZoom"></div>
  </div>
</template>

<script>
export default {
  props: {
    imageUrl: String,
    altText: String,
  },
  data() {
    return {
      isZoomed: false,
    };
  },
  methods: {
    toggleZoom() {
      this.isZoomed = !this.isZoomed;
    },
    closeZoom(event) {
      // Close zoom if clicked outside the image
      if (event.target.classList.contains('zoomed-overlay')) {
        this.isZoomed = false;
      }
    },
  },
};
</script>

<style scoped>
.zoomable-image {
  position: relative;
  cursor: pointer;
}

.zoomed-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
}
.zoomed-overlay img {
  max-width: 90%;
  max-height: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
