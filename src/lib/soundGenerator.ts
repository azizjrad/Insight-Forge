// Sound generation utilities using Web Audio API
export class SoundGenerator {
  private audioContext: AudioContext | null = null;
  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      const AudioContextConstructor =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      this.audioContext = new AudioContextConstructor();
    }
    return this.audioContext;
  }

  // Generate door opening sound - heavy wooden door with creaking
  public generateDoorOpenSound(): Promise<string> {
    return new Promise((resolve) => {
      const audioContext = this.getAudioContext();
      const duration = 1.2; // seconds
      const sampleRate = audioContext.sampleRate;
      const length = sampleRate * duration;
      const buffer = audioContext.createBuffer(1, length, sampleRate);
      const data = buffer.getChannelData(0);

      // Create complex door opening sound
      for (let i = 0; i < length; i++) {
        const t = i / sampleRate;

        // Base creaking frequency that changes over time
        const baseFreq = 80 + Math.sin(t * 3) * 20;

        // Wood stress sounds
        const creak1 =
          Math.sin(t * baseFreq * Math.PI * 2) * Math.exp(-t * 2) * 0.3;
        const creak2 =
          Math.sin(t * (baseFreq * 1.5) * Math.PI * 2) *
          Math.exp(-t * 1.5) *
          0.2;

        // Mechanical door sounds (hinges)
        const mechanical =
          Math.sin(t * 150 * Math.PI * 2) * Math.exp(-t * 3) * 0.1;

        // Air movement sound
        const air = (Math.random() - 0.5) * Math.exp(-t * 0.5) * 0.05;

        // Heavy door thud at the end
        const thud =
          t > 1.0
            ? Math.sin(t * 50 * Math.PI * 2) * Math.exp(-(t - 1.0) * 10) * 0.4
            : 0;

        data[i] = creak1 + creak2 + mechanical + air + thud;
      }

      // Convert to data URL
      this.bufferToDataUrl(buffer).then(resolve);
    });
  }

  // Generate door closing sound - softer than opening
  public generateDoorCloseSound(): Promise<string> {
    return new Promise((resolve) => {
      const audioContext = this.getAudioContext();
      const duration = 0.8; // seconds
      const sampleRate = audioContext.sampleRate;
      const length = sampleRate * duration;
      const buffer = audioContext.createBuffer(1, length, sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < length; i++) {
        const t = i / sampleRate;

        // Softer creaking for closing
        const baseFreq = 70 + Math.sin(t * 4) * 15;
        const creak =
          Math.sin(t * baseFreq * Math.PI * 2) * Math.exp(-t * 2.5) * 0.2;

        // Soft mechanical sound
        const mechanical =
          Math.sin(t * 120 * Math.PI * 2) * Math.exp(-t * 4) * 0.08;

        // Final soft click
        const click =
          t > 0.6
            ? Math.sin(t * 200 * Math.PI * 2) * Math.exp(-(t - 0.6) * 15) * 0.3
            : 0;

        data[i] = creak + mechanical + click;
      }

      this.bufferToDataUrl(buffer).then(resolve);
    });
  }

  // Generate footstep sounds - professional dress shoes on marble
  public generateFootstepSound(stepNumber: number): Promise<string> {
    return new Promise((resolve) => {
      const audioContext = this.getAudioContext();
      const duration = 0.15; // seconds - short sharp footstep
      const sampleRate = audioContext.sampleRate;
      const length = sampleRate * duration;
      const buffer = audioContext.createBuffer(1, length, sampleRate);
      const data = buffer.getChannelData(0);

      // Slight variation for each step
      const variation = (stepNumber % 2) * 0.1 + 1;

      for (let i = 0; i < length; i++) {
        const t = i / sampleRate;

        // Sharp initial impact (shoe hitting marble)
        const impact =
          Math.sin(t * 800 * variation * Math.PI * 2) * Math.exp(-t * 25) * 0.4;

        // Leather creaking
        const leather =
          Math.sin(t * 200 * variation * Math.PI * 2) *
          Math.exp(-t * 15) *
          0.15;

        // Marble echo
        const echo =
          Math.sin(t * 400 * variation * Math.PI * 2) * Math.exp(-t * 12) * 0.1;

        // Heel click (for dress shoes)
        const heel =
          t < 0.05
            ? Math.sin(t * 1200 * Math.PI * 2) * Math.exp(-t * 30) * 0.2
            : 0;

        data[i] = impact + leather + echo + heel;
      }

      this.bufferToDataUrl(buffer).then(resolve);
    });
  }

  // Generate ambient hotel lobby sound
  public generateAmbientSound(): Promise<string> {
    return new Promise((resolve) => {
      const audioContext = this.getAudioContext();
      const duration = 2.5; // Match animation duration
      const sampleRate = audioContext.sampleRate;
      const length = sampleRate * duration;
      const buffer = audioContext.createBuffer(1, length, sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < length; i++) {
        const t = i / sampleRate;

        // Gentle air conditioning hum
        const ac = Math.sin(t * 60 * Math.PI * 2) * 0.02;

        // Distant conversations (very subtle)
        const conversations =
          (Math.random() - 0.5) *
          Math.exp(-Math.abs(Math.sin(t * 0.5)) * 2) *
          0.01;

        // Elevator ding in distance (very subtle)
        const elevator =
          t > 2.0 && t < 2.1 ? Math.sin(t * 800 * Math.PI * 2) * 0.03 : 0;

        data[i] = ac + conversations + elevator;
      }

      this.bufferToDataUrl(buffer).then(resolve);
    });
  }

  private async bufferToDataUrl(buffer: AudioBuffer): Promise<string> {
    return new Promise((resolve) => {
      const offlineContext = new OfflineAudioContext(
        1,
        buffer.length,
        buffer.sampleRate
      );
      const source = offlineContext.createBufferSource();
      source.buffer = buffer;
      source.connect(offlineContext.destination);
      source.start();

      offlineContext.startRendering().then((renderedBuffer) => {
        // Convert to WAV format
        const wav = this.bufferToWav(renderedBuffer);
        const blob = new Blob([wav], { type: "audio/wav" });
        const url = URL.createObjectURL(blob);
        resolve(url);
      });
    });
  }

  private bufferToWav(buffer: AudioBuffer): ArrayBuffer {
    const length = buffer.length;
    const arrayBuffer = new ArrayBuffer(44 + length * 2);
    const view = new DataView(arrayBuffer);
    const sampleRate = buffer.sampleRate;

    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, "RIFF");
    view.setUint32(4, 36 + length * 2, true);
    writeString(8, "WAVE");
    writeString(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, "data");
    view.setUint32(40, length * 2, true);

    // Convert float samples to 16-bit PCM
    const channelData = buffer.getChannelData(0);
    let offset = 44;
    for (let i = 0; i < length; i++) {
      const sample = Math.max(-1, Math.min(1, channelData[i]));
      view.setInt16(offset, sample * 0x7fff, true);
      offset += 2;
    }

    return arrayBuffer;
  }
}

export const soundGenerator = new SoundGenerator();
