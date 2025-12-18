import ConfigInfo from "../ConfigInfo";
import configurable from "../engine/rules/configurable";
import EffectConfig from "../effects/EffectConfig";
import everyIntervalSeconds from "../engine/rules/everyIntervalSeconds";
import Fact from "../engine/Fact";
import inRegularGame from "../engine/rules/inRegularGame";
import Rule from "../engine/Rule";
import rules from "../rules";
import topics from "../topics";

export const configInfo = new ConfigInfo(
    rules.assistant.pull,
    "40 second reminder",
    "Executes at the 40 second mark of every minute",
    EffectConfig.PUBLIC
);

const MINUTE_40_START_TIME = 40; // First trigger at 0:40
const MINUTE_INTERVAL = 60; // Every 60 seconds (every minute)

export default [
    new Rule({
        label: "40 second mark reminder",
        trigger: [topics.time],
        then: () => new Fact(topics.configurableEffect, "resources/audio/40-seconds.mp3"),
    }),
]
    .map((rule) => configurable(configInfo.ruleIndentifier, rule))
    .map((rule) =>
        everyIntervalSeconds(
            MINUTE_40_START_TIME,
            undefined,
            MINUTE_INTERVAL,
            rule
        )
    )
    .map(inRegularGame);

