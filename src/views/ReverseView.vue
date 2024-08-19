<template>
  <PHeading>Reverse it</PHeading>

  <PCodeImage src="reverse.png" alt="" />
  <PButton @click="toggle">{{ label }}</PButton>
  <input type="range" min="0.1" max="2" step="0.1" v-model="playbackSpeed" />

  <div class="footer">
    <a
      href="https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer/getChannelData"
      target="_blank"
    >
      getChannelData MDN
    </a>
  </div>
</template>

<script setup lang="ts">
import PButton from '@/components/PButton.vue';
import PHeading from '@/components/PHeading.vue';
import PCodeImage from '@/components/PCodeImage.vue';
import { playSource, loadBuffer } from '@/utils/audio';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { context } from '@/config/audio';

let audioBufferReversed: AudioBuffer;
let source: AudioBufferSourceNode | null;

const isPlaying = ref(false);
const label = computed(() => (isPlaying.value ? 'Stop' : 'Play'));
const playbackSpeed = ref(1);

watch(playbackSpeed, () => updateSpeed());

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

  source = playSource(audioBufferReversed);
  isPlaying.value = true;

  updateSpeed();
};

const toggle = () => {
  if (source) {
    stop();
  } else {
    start();
  }
};

const updateSpeed = () => {
  if (!source) {
    return;
  }

  source.playbackRate.setValueAtTime(playbackSpeed.value, context.currentTime);
};

onMounted(async () => {
  ({ audioBufferReversed } = await loadBuffer('music.mp3'));
});

onUnmounted(() => {
  try {
    source?.stop();
  } catch (e) {
    // oohhh!
  }
});
</script>
