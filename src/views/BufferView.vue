<template>
  <PHeading>Buffer it</PHeading>

  <PCodeImage src="loading.png" alt="" />

  <PControls>
    <PButton @click="toggle">{{ label }}</PButton>
  </PControls>
</template>

<script setup lang="ts">
import { useStop } from '@/composables/useStop';
import PButton from '@/components/PButton.vue';
import PHeading from '@/components/PHeading.vue';
import PControls from '@/components/PControls.vue';
import PCodeImage from '@/components/PCodeImage.vue';
import { playSource, loadBuffer } from '@/utils/audio';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { context } from '@/config/audio';

let audioBuffer: AudioBuffer;
let source: AudioBufferSourceNode = new AudioBufferSourceNode(context);

useStop(source);

const isPlaying = ref(false);
const label = computed(() => (isPlaying.value ? 'Stop' : 'Play'));

const toggle = () => {
  if (isPlaying.value) {
    source.stop();
    isPlaying.value = false;
  } else {
    source = playSource(audioBuffer);
    isPlaying.value = true;
  }
};

onMounted(async () => {
  ({ audioBuffer } = await loadBuffer('music.mp3'));
});

onUnmounted(() => {
  try {
    source.stop();
  } catch (e) {
    // oohhh!
  }
});
</script>
