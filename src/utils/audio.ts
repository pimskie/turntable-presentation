import { context, mainVolume } from '../config/audio';

const loadBuffer = async (filename: string) => {
  const path = `/turntable-presentation/audio/${filename}`;

  const response = await fetch(path);

  const buffer = await response.arrayBuffer();
  const audioBuffer = await context.decodeAudioData(buffer);

  const channelDataReversed = audioBuffer.getChannelData(0).slice(0).reverse();

  const audioBufferReversed = new AudioBuffer({
    numberOfChannels: 1,
    length: audioBuffer.length,
    sampleRate: audioBuffer.sampleRate
  });

  audioBufferReversed.getChannelData(0).set(channelDataReversed);

  return {
    audioBuffer,
    audioBufferReversed
  };
};

const createSource = () => {
  const source = new AudioBufferSourceNode(context);

  return source;
};

const playSource = (
  audioBuffer: AudioBuffer,
  offset: number = 0,
  isReversed = false
): AudioBufferSourceNode => {
  const source = createSource();
  source.buffer = audioBuffer;
  source.connect(mainVolume);

  const offsetFixed = isReversed ? audioBuffer.duration - offset : offset;

  source.start(context.currentTime, offsetFixed);

  return source;
};

export { loadBuffer, createSource, playSource };
