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
    "Pull reminder",
    "Reminds you to pull every 40 seconds",
    EffectConfig.PUBLIC
);

const PULL_START_TIME = 100; // First trigger at 1:40
const MINUTE_INTERVAL = 60; // Every 60 seconds (every minute)

export default [
    new Rule({
        label: "Pull reminder",
        trigger: [topics.time],
        then: () => new Fact(topics.configurableEffect, "resources/audio/pull.mp3"),
    }),
]
    .map((rule) => configurable(configInfo.ruleIndentifier, rule))
    .map((rule) =>
        everyIntervalSeconds(
            PULL_START_TIME,
            undefined,
            MINUTE_INTERVAL,
            rule
        )
    )
    .map(inRegularGame);

