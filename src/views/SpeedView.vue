<template>
  <PHeading>Setting speed</PHeading>

  <PCodeImage src="speed.png" alt="" />

  <PControls>
    <PButton @click="toggle">{{ label }}</PButton>
    <input type="range" min="0.1" max="2" step="0.1" v-model="playbackSpeed" />

    <POutput label="Speed" :value="playbackSpeed" />

    <label>
      Ramp to value:
      <input type="checkbox" v-model="rampToValue" />
    </label>
  </PControls>
</template>

<script setup lang="ts">
import PButton from '@/components/PButton.vue';
import PHeading from '@/components/PHeading.vue';
import POutput from '@/components/POutput.vue';
import PControls from '@/components/PControls.vue';
import PCodeImage from '@/components/PCodeImage.vue';
import { playSource, loadBuffer } from '@/utils/audio';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { context } from '@/config/audio';

let audioBuffer: AudioBuffer;
let source: AudioBufferSourceNode | null = new AudioBufferSourceNode(context);

const isPlaying = ref(false);
const label = computed(() => (isPlaying.value ? 'Stop' : 'Play'));
const playbackSpeed = ref(1);
const rampToValue = ref(false);

watch(playbackSpeed, () => updateSpeed());

const toggle = () => {
  if (isPlaying.value && source) {
    source.stop();
    source = null;
    isPlaying.value = false;
  } else {
    source = playSource(audioBuffer);
    isPlaying.value = true;

    updateSpeed();
  }
};

const updateSpeed = () => {
  if (!source) {
    return;
  }

  const { currentTime } = context;

  if (rampToValue.value) {
    source.playbackRate.cancelScheduledValues(currentTime);
    source.playbackRate.linearRampToValueAtTime(playbackSpeed.value, currentTime + 1.5);
  } else {
    source.playbackRate.setValueAtTime(playbackSpeed.value, currentTime);
  }
};

onMounted(async () => {
  ({ audioBuffer } = await loadBuffer('music.mp3'));
});

onUnmounted(() => {
  try {
    source?.stop();
  } catch (e) {
    //
  }
});
</script>
