export const Formats: import('../../../sim/dex-formats').CustomFormatList = {
	gen9donotuselegacy: {
		name: "[Gen 9] Do Not Use Legacy",
		ruleset: ['Standard NatDex', 'Mega Rayquaza Clause', 'Terastal Clause', 'Z-Move Clause'],
		banlist: ['Vanilla', 'Huge Power', 'Pure Power', 'Shadow Tag', 'Arena Trap', 'Baton Pass', 'Moody'],
		section: "Do Not Use OMs",
		teambuilder: {
			defaultLevel: 100,
			tierType: "singles",
			formatType: "singles",
			allowedTiers: ["DoNU OU", "DoNU UUBL", "DoNU UU", "DoNU RUBL", "DoNU RU"],
			isNatDex: true,
		},
	},
	gen9donotuserulegacy: {
		name: "[Gen 9] Do Not Use RU Legacy",
		ruleset: ['Standard NatDex', 'Mega Rayquaza Clause', 'Terastal Clause', 'Z-Move Clause'],
		banlist: ['Vanilla', 'DNU OU', 'DNU UUBL', 'DNU UU', 'DNU RUBL', 'Huge Power', 'Pure Power', 'Shadow Tag', 'Arena Trap', 'Baton Pass', 'Moody'],
		section: "Do Not Use OMs",
		teambuilder: {
			defaultLevel: 100,
			tierType: "singles",
			formatType: "singles",
			allowedTiers: ["DoNU RU"],
			isNatDex: true,
		},
	},
};
