<template>
  <PHeading>Reverse it</PHeading>

  <PCodeImage src="reverse2.png" alt="" />
  <PControls>
    <PButton @click="toggle">{{ label }}</PButton>
    <input type="range" min="0.1" max="2" step="0.1" v-model="playbackSpeed" />

    <POutput label="Speed" :value="playbackSpeed" />

    <label>
      Reverse:
      <input type="checkbox" v-model="reverse" />
    </label>
  </PControls>
</template>

<script setup lang="ts">
import PButton from '@/components/PButton.vue';
import PHeading from '@/components/PHeading.vue';
import PControls from '@/components/PControls.vue';
import POutput from '@/components/POutput.vue';
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
const reverse = ref(false);

watch(playbackSpeed, () => setPlaybackSpeed());

watch(reverse, () => {
  audioBufferPlaying = reverse.value ? audioBufferReversed : audioBuffer;

  start();

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

  source.playbackRate.setValueAtTime(playbackSpeed.value, context.currentTime);
};

onMounted(async () => {
  ({ audioBufferReversed, audioBuffer } = await loadBuffer('music.mp3'));

  audioBufferPlaying = audioBuffer;
});

onUnmounted(() => {
  try {
    source?.stop();
  } catch (e) {
    // oohhh!
  }
});
</script>
