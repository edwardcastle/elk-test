<script setup>
import { ref, onMounted, onUnmounted, computed, reactive, watch } from "vue";

// *** Hooks ***
onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));

// *** Variables ***
const scrollPercentage = ref(0);
const methodHaveBeenCalled = ref(false);
let clock = reactive({
  duration: 120,
  minutes: "02",
  seconds: "00",
});

// *** Computed Properties ***
const isOnTheFirstSection = computed(() => scrollPercentage.value < 50);
const clockDimensions = computed(() => 400 - scrollPercentage.value * 2.7);

// *** Methods ***
/**
 * Get and set the scroll porcentage depending on `Y` position
 * @returns void
 *
 **/
const handleScroll = () => {
  const windowHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight; // window height

  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop; // scroll in px

  scrollPercentage.value = (scrollTop / windowHeight) * 100; // scroll on porcentage

  // check if user is on the first screen section
  if (!isOnTheFirstSection.value) {
    const svg = document.getElementById("clock-svg");
    const text = document.getElementById("text");
    if (svg && text) {
      svg.style.top = Math.max(100 - scrollTop / 20, 0) + "%";
      text.style.top = Math.max(100 - scrollTop / 20, 0) + "%";
    }
  }
};

/**
 * Call startCountDown method as soon the user enter on the second section
 * @return void
 **/
watch(isOnTheFirstSection, (value) => {
  if (!methodHaveBeenCalled.value && !value) startCountDown();
  else if (value) resetClock();
});

/**
 * Start count down clock, starting from 2 minutes
 * @return void
 **/
const startCountDown = () => {
  if (!methodHaveBeenCalled.value) {
    setInterval(() => {
      clock.minutes = Math.floor(clock.duration / 60)
        .toString()
        .padStart(2, "0");
      clock.seconds = (clock.duration % 60).toString().padStart(2, "0");
      if (clock.duration > 0) {
        clock.duration--;
      } else {
        // clearInterval();
      }
    }, 1000);
  }
  methodHaveBeenCalled.value = true;
};
const resetClock = () => {
  clock = reactive({
    duration: 120,
    minutes: 2,
    seconds: 0,
  });
};
</script>

<template>
  <div
    :class="`body-background ${
      isOnTheFirstSection ? 'first-image' : 'second-image'
    }`"
  >
    <!-- First screen section -->
    <section v-if="isOnTheFirstSection">
      <h2 class="initial-text" style="margin-top: -20px">
        Every 2 minutes, a woman <br />
        dies giving birth
      </h2>
      <!-- Circle svg -->
      <svg
        id="circle-svg"
        width="522"
        height="522"
        viewBox="0 0 522 522"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          opacity="0.269244"
          cx="261"
          cy="261"
          r="260"
          stroke="#D0D0D0"
          stroke-dasharray="4 5"
        />
        <circle
          cx="261"
          cy="261"
          r="261"
          :stroke-dasharray="1800"
          :stroke-dashoffset="1800 - scrollPercentage * 35"
          stroke="url(#paint0_linear_0_106)"
          stroke-width="2"
        />
        <defs>
          <linearGradient
            id="paint0_linear_0_106"
            x1="83.9694"
            y1="19.486"
            x2="109.138"
            y2="173.886"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#81F75D" />
            <stop offset="1" stop-color="#F0D956" />
          </linearGradient>
        </defs>
      </svg>
      <!-- end Circle svg -->
    </section>
    <!-- end First screen section -->

    <!-- Second screen section -->
    <section v-else>
      <transition name="fade">
        <h2
          v-if="scrollPercentage === 100"
          class="initial-text"
          key="title"
          style="margin-top: -20px"
        >
          That's 830 women every day. <br />
          Most of them didn't have to die
        </h2>
      </transition>

      <transition name="fade">
        <a v-if="scrollPercentage === 100" class="next-page" href="https://www.state.gov/countries-areas/liberia/">Next</a>
      </transition>

      <!-- Timer -->
      <span id="text" class="initial-text" :style="`font-size: ${25}px`">
        {{ clock.minutes }}:{{ clock.seconds }}
      </span>
      <!-- End Timer -->

      <!-- Clock svg -->
      <svg
        id="clock-svg"
        :width="clockDimensions"
        :height="clockDimensions"
        viewBox="0 0 64 69"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="26.5"
          y="0.5"
          width="11"
          height="4"
          rx="1.5"
          stroke="#BCBCBC"
        />
        <path d="M32.2844 7V5.06527" stroke="#BCBCBC" stroke-linecap="square" />
        <ellipse
          id="paint-ellipse"
          cx="32"
          cy="37.4076"
          rx="28"
          ry="28"
          stroke="url(#paint0_linear_0_127)"
          stroke-dasharray="0, 188.5"
          stroke-dashoffset="0"
          stroke-width="2"
        >
          <animate
            attributeName="stroke-dasharray"
            dur="120s"
            to="188.5, 0"
            begin="0s"
          />
        </ellipse>

        <ellipse cx="32" cy="37.4076" rx="30" ry="29.8578" stroke="#BCBCBC" />

        <defs>
          <linearGradient
            id="paint0_linear_0_127"
            x1="64.2539"
            y1="50.4633"
            x2="58.0576"
            y2="-12.4409"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#FFDC26" />
            <stop offset="1" stop-color="#2EFFAE" />
          </linearGradient>
        </defs>
      </svg>
    <!--End Clock svg -->

    </section>
    <!-- end Second screen section -->
  </div>
</template>

<style>
.first-image {
  background-image: url(first-image.svg);
}

.second-image {
  background-image: url(second-image.svg);
}

.body-background {
  width: 100%;
  height: 300vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.initial-text,
#circle-svg,
#clock-svg {
  text-align: center;
  color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.next-page {
  text-align: center;
  color: white;
  position: fixed;
  bottom: 20%;
  left: 48%;
  opacity: 0.5;
  font-size: 30px;
  cursor: pointer;
  font-weight: bold;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
