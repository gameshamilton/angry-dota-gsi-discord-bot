import roshHelper from "./helpers/roshan";
import ConfigInfo from "../ConfigInfo";
import configurable from "../engine/rules/configurable";
import EffectConfig from "../effects/EffectConfig";
import { EventType } from "../gsi-data-classes/Event";
import Fact from "../engine/Fact";
import inRegularGame from "../engine/rules/inRegularGame";
import Rule from "../engine/Rule";
import rules from "../rules";
import topicManager from "../engine/topicManager";
import topics from "../topics";

export const configInfo = new ConfigInfo(
    rules.assistant.roshan,
    "Roshan timer",
    "Tracks roshan respawn time and plays reminder when roshan may be up",
    EffectConfig.PUBLIC
);

const lastRoshDeathTimeTopic = topicManager.createTopic<number>(
    "lastRoshDeathTimeTopic",
    {
        persistAcrossRestarts: true,
    }
);

export default [
    new Rule({
        label: "when we get an event that says rosh is killed, add time to allRoshanDeathTimesTopic array",
        trigger: [topics.event],
        given: [topics.time, topics.allRoshanDeathTimes],
        when: ([event]) => event.type === EventType.RoshanKilled,
        then: (_, [time, deathTimes]) =>
            new Fact(topics.allRoshanDeathTimes, [...deathTimes, time]),
    }),

    new Rule({
        label: "last roshan death time from array of all roshan death times",
        trigger: [topics.allRoshanDeathTimes],
        then: ([deathTimes]) =>
            new Fact(lastRoshDeathTimeTopic, deathTimes.at(-1)),
    }),
    new Rule({
        label: "set minimum rosh respawn time",
        trigger: [lastRoshDeathTimeTopic],
        then: ([deathTime]) =>
            new Fact(
                topics.roshanMinimumSpawnTime,
                roshHelper.minimuSpawnTime(deathTime)
            ),
    }),

    new Rule({
        label: "when rosh may be up, play reminder",
        trigger: [topics.time],
        given: [topics.roshanMinimumSpawnTime],
        when: ([time], [minimumSpawnTime]) => time === minimumSpawnTime,
        then: () =>
            new Fact(
                topics.configurableEffect,
                "resources/audio/roshan-may-be-up.mp3"
            ),
    }),
]
    .map(inRegularGame)
    .map((rule) => configurable(configInfo.ruleIndentifier, rule));
