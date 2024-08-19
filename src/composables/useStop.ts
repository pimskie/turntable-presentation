import { onUnmounted } from 'vue';

const useStop = (source: AudioBufferSourceNode) => {
  onUnmounted(() => {
    // AudioBuffer can only be started and stopped once
    try {
      source.stop();
    } catch (e) {
      // swallow
    }
  });
};

export { useStop };
