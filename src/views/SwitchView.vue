<template>
  <PHeading>Switch it</PHeading>

  <PCodeImage src="switch.png" alt="" />

  <PControls>
    <PButton @click="toggle">{{ label }}</PButton>
    <input type="range" min="-2" max="2" step="0.1" v-model.number="playbackSpeed" />

    <POutput label="Speed" :value="playbackSpeed" />
  </PControls>
</template>

<script setup lang="ts">
import PButton from '@/components/PButton.vue';
import PHeading from '@/components/PHeading.vue';
import POutput from '@/components/POutput.vue';
import PCodeImage from '@/components/PCodeImage.vue';
import { playSource, loadBuffer } from '@/utils/audio';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { context } from '@/config/audio';
import PControls from '@/components/PControls.vue';

let audioBuffer: AudioBuffer;
let audioBufferReversed: AudioBuffer;
let audioBufferPlaying: AudioBuffer;

let source: AudioBufferSourceNode | null;

const isPlaying = ref(false);
const label = computed(() => (isPlaying.value ? 'Stop' : 'Play'));
const playbackSpeed = ref(1);

const playbackSpeedCorrected = computed(() => {
  let speed = Math.abs(playbackSpeed.value);

  return speed || 0.001;
});

watch(playbackSpeed, (newSpeed, oldSpeed) => {
  const changedToReverse = newSpeed < 0 && oldSpeed >= 0;
  const changedToForwards = newSpeed > 0 && oldSpeed <= 0;

  if (changedToReverse || changedToForwards) {
    audioBufferPlaying = newSpeed > 0 ? audioBuffer : audioBufferReversed;

    start();
  }

  setPlaybackSpeed();
});

const stop = () => {
  if (!source) {
    return;
  }

  source.stop();
  source = null;
  isPlaying.value = false;
};

const start = () => {
  stop();

  source = playSource(audioBufferPlaying);
  isPlaying.value = true;

  setPlaybackSpeed();
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
  } catch (e) {
    //
  }
});
</script>
