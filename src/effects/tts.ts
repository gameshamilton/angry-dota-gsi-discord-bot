// TTS functionality removed - all audio now uses pre-recorded .mp3 files
// This file is kept for backwards compatibility but is no longer used
export default {
    create: () => Promise.resolve(),
    path: (ttsString: string) => `resources/audio/tts-cache/${ttsString}.mp3`,
};
