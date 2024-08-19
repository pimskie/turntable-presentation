const context = new AudioContext();
const mainVolume = new GainNode(context);

mainVolume.connect(context.destination);

export { context, mainVolume };
