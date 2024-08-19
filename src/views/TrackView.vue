<template>
  <PHeading>Track it</PHeading>

  <PCodeImage src="track.png" alt="" />
  <PButton @click="toggle">{{ label }}</PButton>
  <input type="range" min="-2" max="2" step="0.1" v-model.number="playbackSpeed" />

  <br />
  {{ playbackSpeed }}

  <br />
  {{ playingTimeDisplay }}
</template>

<script setup lang="ts">
import PButton from '@/components/PButton.vue';
import PHeading from '@/components/PHeading.vue';
import PCodeImage from '@/components/PCodeImage.vue';
import { playSource, loadBuffer } from '@/utils/audio';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { context } from '@/config/audio';

let audioBuffer: AudioBuffer;
let audioBufferReversed: AudioBuffer;
let audioBufferPlaying: AudioBuffer;

let source: AudioBufferSourceNode | null;

const isPlaying = ref(false);
const label = computed(() => (isPlaying.value ? 'Stop' : 'Play'));
const playbackSpeed = ref(1);
const playingTime = ref(0);

const playbackSpeedCorrected = computed(() => {
  let speed = Math.abs(playbackSpeed.value);

  return speed || 0.001;
});

const playingTimeDisplay = computed(() => playingTime.value.toFixed(2));

let rafId: number | null = null;
let previousUpdateTime: number;

watch(playbackSpeed, (newSpeed, oldSpeed) => {
  const changedToReverse = newSpeed < 0 && oldSpeed >= 0;
  const changedToForwards = newSpeed > 0 && oldSpeed <= 0;

  if (changedToReverse || changedToForwards) {
    audioBufferPlaying = newSpeed > 0 ? audioBuffer : audioBufferReversed;

    start();
  }

  setPlaybackSpeed();
});

const trackTime = () => {
  if (!previousUpdateTime) {
    previousUpdateTime = performance.now();
  } else {
    const currentUpdateTime = performance.now();
    const elapsedTime = currentUpdateTime - previousUpdateTime;
    const elapsedTimeScaled = elapsedTime * playbackSpeed.value;

    playingTime.value += elapsedTimeScaled * 0.001;

    previousUpdateTime = currentUpdateTime;
  }

  rafId = requestAnimationFrame(trackTime);
};

const stop = () => {
  if (!source) {
    return;
  }

  source.stop();
  source = null;
  isPlaying.value = false;
  cancelAnimationFrame(rafId!);
};

const start = () => {
  stop();

  source = playSource(audioBufferPlaying, playingTime.value);
  isPlaying.value = true;

  setPlaybackSpeed();

  rafId = requestAnimationFrame(trackTime);
};

const toggle = () => {
  if (source) {
    stop();
  } else {
    start();
  }
};

const setPlaybackSpeed = () => {
  if (!source) {
    return;
  }

  source.playbackRate.setValueAtTime(playbackSpeedCorrected.value, context.currentTime);
};

onMounted(async () => {
  ({ audioBuffer, audioBufferReversed } = await loadBuffer('audio.mp3'));

  audioBufferPlaying = audioBuffer;
});

onUnmounted(() => {
  try {
    source?.stop();
    cancelAnimationFrame(rafId!);
  } catch (e) {
    //
  }
});
</script>
