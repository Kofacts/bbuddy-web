<template>
    <div class="flex w-5/6 justify-between gap-20 mx-auto"> 
        <div class="flex flex-col items-center relative justify-center w-1/4 ki">
            <span class="text-[20px] absolute top-0">days</span>
            <div class="flex">
                <h1 class="text-[150px] text-semi  text-center mx-auto">{{days}}</h1>
                <!-- <h1 class="text-[150px]">:</h1> -->
            </div>
        </div>
        <div class="flex flex-col items-center relative justify-center w-1/4 ki">
            <span class="text-[20px] absolute top-0">hours</span>
            <div class="flex">
                <h1 class="text-[150px] text-semi  text-center mx-auto">{{hours}}</h1>
                <!-- <h1 class="text-[150px]">:</h1> -->
            </div>
        </div>
        <div class="flex flex-col items-center relative justify-center w-1/4 ki">
            <span class="text-[20px] absolute top-0">minutes</span>
            <div class="flex">
                <h1 class="text-[150px] text-semi  text-center mx-auto">{{minutes}}</h1>
                <!-- <h1 class="text-[150px]">:</h1> -->
            </div>
        </div>
        <div class="flex flex-col items-center relative justify-center w-1/4">
            <span class="text-[20px] absolute top-0">seconds</span>
            <div class="flex">
                <h1 class="text-[150px] text-semi  text-center mx-auto">{{seconds}}</h1>
                <!-- <h1 class="text-[150px]">:</h1> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      targetTime: null,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      interval: null,
    };
  },
  mounted() {
    this.targetTime = new Date().getTime() + 45 * 24 * 60 * 60 * 1000; // 45 days from now
    this.startCountdown();
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    startCountdown() {
      this.interval = setInterval(this.updateCountdown, 1000);
    },
    updateCountdown() {
      const now = new Date().getTime();
      const distance = this.targetTime - now;

      if (distance < 0) {
        clearInterval(this.interval);
        this.days = this.hours = this.minutes = this.seconds = 0;
      } else {
        this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      }
    },
  },
};
</script>

<style scoped>
.countdown-timer {
  display: flex;
  gap: 10px;
  font-size: 2rem;
}
.countdown-timer .time-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.countdown-timer .number {
  display: block;
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
}
.countdown-timer .number-enter-active {
  transform: translateY(-100%);
  opacity: 0;
}
.countdown-timer .number-leave-active {
  transform: translateY(100%);
  opacity: 0;
}
.ki {
    position: relative;
}
.ki::after {
    content: ':';
    position: absolute;
    font-size: 150px;
    right: -85px
}
</style>
