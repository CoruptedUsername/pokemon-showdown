export const Formats: import('../../../sim/dex-formats').CustomFormatList = [
	{
		name: "[Gen 9] 3M Draft League s2w1",
		gameType: 'singles',
		ruleset: ['Standard NatDex', '!Obtainable Formes', '!Evasion Clause', 'Evasion Moves Clause', 'Evasion Items Clause', 'Terastal Clause'],
		banlist: ['Gengar-Mega', 'Miraidon', 'Assist', 'Baton Pass'],
		section: "Three Musketeers",
		teambuilder: {
			defaultLevel: 100,
			tierType: "singles",
			formatType: "singles",
			allowedTiers: ['3M Musks', '3M'],
			isNatDex: true,
		},
	},
];
