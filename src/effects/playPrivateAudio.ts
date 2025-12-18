import Fact from "../engine/Fact";
import fs from "fs";
import path from "path";
import Rule from "../engine/Rule";
import rules from "../rules";
import topics from "../topics";

/**
 * The actual playing happens in server /coach/:studentId/poll
 * All audio files should be .mp3 files in resources/audio/
 */
export default new Rule({
    label: rules.effect.playPrivateAudio,
    trigger: [topics.playPrivateAudio],
    given: [topics.privateAudioQueue],
    then: ([audio], [privateAudioQueue]) => {
        // if the audio is already in queue, do not add it again
        if (privateAudioQueue.includes(audio)) {
            return;
        }

        const queue = [...privateAudioQueue];
        if (audio) {
            const audioFile = path.join(__dirname, "../../", audio);
            if (fs.existsSync(audioFile)) {
                queue.push(audio);
            }
        }

        return [
            new Fact(topics.privateAudioQueue, queue),
            new Fact(topics.playPrivateAudio, undefined),
        ];
    },
});
