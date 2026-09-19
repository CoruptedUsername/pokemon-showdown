export const Formats: import('../../../sim/dex-formats').CustomFormatList = {
	gen93mdraftleagues2w2: {
		name: "[Gen 9] 3M Draft League s2w2",
		gameType: 'singles',
		ruleset: ['Standard NatDex', 'Z-Move Clause', 'Tera Type Preview'],
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
};
