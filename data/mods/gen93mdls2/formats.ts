export const Formats: import('../../../sim/dex-formats').CustomFormatList = {
	gen93mdraftleagues2w4: {
		name: "[Gen 9] 3M Draft League s2w4",
		gameType: 'singles',
		ruleset: ['Standard NatDex', 'Z-Move Clause', 'Tera Type Preview', 'Inverse Mod'],
		banlist: ['Moody', 'Baton Pass', 'Swagger', 'Flatter', 'move:Metronome', 'Last Respects', 'Shed Tail', 'Rage Fist',
			'Hidden Power', 'Power Construct', 'Revival Blessing + Leppa Berry', 'Shell Smash + Blastoise Mega'],
		section: "Three Musketeers",
		teambuilder: {
			defaultLevel: 100,
			tierType: "tier",
			formatType: "singles",
			allowedTiers: ['3M Musks', '3M'],
			isNatDex: true,
		},
	},
	gen93mdraftleagues2w5: {
		name: "[Gen 9] 3M Draft League s2w5",
		gameType: 'singles',
		ruleset: ['Standard NatDex', 'Z-Move Clause', 'Tera Type Preview', '!Obtainable Abilities', 'Ability Clause = 1'],
		banlist: ['Baton Pass', 'Swagger', 'Flatter', 'move:Metronome', 'Last Respects', 'Shed Tail', 'Rage Fist',
			'Hidden Power', 'Power Construct', 'Revival Blessing + Leppa Berry', 'Shell Smash + Blastoise Mega', 'Arena Trap',
			'Comatose', 'Contrary', 'Fur Coat', 'Gorilla Tactics', 'Good as Gold', 'Hadron Engine', 'Huge Power', 'Ice Scales',
			'Illusion', 'Imposter', 'Innards Out', 'Intrepid Sword', 'Magic Bounce', 'Magnet Pull', 'Moody', 'Neutralizing Gas',
			'Orichalcum Pulse', 'Parental Bond', 'Poison Heal', 'Pure Power', 'Regenerator', 'Shadow Tag', 'Simple', 'Speed Boost',
			'Stakeout', 'Triage', 'Unburden', 'Water Bubble', 'Wonder Guard', 'Assist', 'Electrify', 'Take Heart'],
		// validateSet(set, teamHas) {
		// 	const dex = this.dex
		// 	const moves = set.moves;
		// 	for (const move in moves) {
		// 		const dexMove = dex.moves.get(move);
		// 		if (dexMove.)
		// 	}
		// },
		section: "Three Musketeers",
		teambuilder: {
			defaultLevel: 100,
			tierType: "tier",
			formatType: "singles",
			allowedTiers: ['3M Musks', '3M'],
			isNatDex: true,
		},
	},
};
