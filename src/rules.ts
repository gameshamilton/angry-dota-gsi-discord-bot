/* eslint-disable sort-keys */

// Cannot add a slash if we are sending the id over to front end
// Due to network thinking the slash is the start of a new route
// NOTE: IF YOU CHANGE THESE STRINGS WITHOUT MIGRATION
// ALL THE USER'S SAVED PREFERENCES WILL BE RESET
// SO MAYBE JUST NEVER CHANGE THESE STRINGS EVER AGAIN, MMMK?
const assistant = {
    arcaneBoots: "assistant-mana_boots",
    bloodGrenade: "assistant-blood_grenade",
    buyback: "assistant-buyback",
    buyDetection: "assistant-buy_detection",
    emptyInventory: "assistant-empty_inventory",
    enemyInventoryCheck: "assistant-enemy_inventory_check",
    freeFortification: "assistant-free_fortification",
    glhf: "assistant-glhf",
    goldReminder: "assistant-gold",
    lotus: "assistant-lotus",
    manaDraught: "assistant-mana_draught",
    midas: "assistant-midas",
    neutralItemDigReminder: "assistant-neutral_item-dig",
    neutralItemReminder: "assistant-neutral_item",
    newNeutralTokens: "assistant-new_neutral_tokens",
    polliwogCharm: "assistant-polliwog_charm",
    pull: "assistant-pull",
    regenReminder: "assistant-regen_reminder",
    roshan: "assistant-roshan",
    runeBounty: "assistant-rune_bounty",
    runePower: "assistant-rune_power",
    runePowerWarn: "assistant-rune_power_warn",
    runeWater: "assistant-rune_water",
    runeWisdom: "assistant-rune_wisdom",
    runeWisdomScan: "assistant-rune_wisdom_scan",
    shard: "assistant-shard",
    tormenter: "assistant-tormenter",
    tp: "assistant-tp",
    wards: "assistant-wards",
};

const discord = {
    playNext: "discord/play_next",
    startVoiceSubscription: "discord/startVoiceSubscription",
};

const effect = {
    playTts: "effect/playTts",
    playAudio: "effect/playAudio",
    playPrivateAudio: "effect/playPrivateAudio",
    playInterruptingAudio: "effect/playInterruptingAudio",
    stopAudio: "effect/stopAudio",
};

const gsi = {
    buildings: "gsi/buildings",
    events: {
        new: "gsi/events/new",
        reset: "gsi/events/reset_all",
    },
    hero: "gsi/hero",
    playerItems: "gsi/items->PlayerItems",
    map: "gsi/map",
    minimap: "gsi/minimap",
    player: "gsi/player",
    provider: "gsi/provider",
};

export default {
    assistant,
    discord,
    effect,
    gsi,
};
