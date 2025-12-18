import Fact from "../engine/Fact";
import fs from "fs";
import path from "path";
import Rule from "../engine/Rule";
import rules from "../rules";
import topics from "../topics";

/**
 * The actual playing happens in discord/playAudioQueue
 * All audio files should be .mp3 files in resources/audio/
 */
export default new Rule({
    label: rules.effect.playAudio,
    trigger: [topics.discordAudioEnabled, topics.playPublicAudio],
    given: [topics.publicAudioQueue],
    then: ([enabled, audio], [publicAudioQueue]) => {
        const queue = [...publicAudioQueue];

        if (enabled && audio) {
            const audioFile = path.join(__dirname, "../../", audio);
            if (fs.existsSync(audioFile)) {
                queue.push(audioFile);
            }
        }

        return [
            new Fact(topics.publicAudioQueue, queue),
            new Fact(topics.playPublicAudio, undefined),
        ];
    },
});
