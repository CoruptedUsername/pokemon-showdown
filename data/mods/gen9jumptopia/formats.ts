export const Formats: import('../../../sim/dex-formats').CustomFormatList = {
	gen9jumptopia: {
		name: "[Gen 9] Jumptopia",
		ruleset: ['Standard NatDex', 'Mega Rayquaza Clause', 'Terastal Clause', 'Z-Move Clause'],
		banlist: ['Vanilla', 'Shadow Tag', 'Arena Trap', 'Baton Pass', 'Moody', 'Jumptopia Ubers'],
		section: "Other Solomods",
		teambuilder: {
			defaultLevel: 100,
			tierType: "singles",
			formatType: "singles",
			allowedTiers: ["Jumptopia", "Jumptopia NFE", "Jumptopia LC"],
			isNatDex: true,
		},
	},
};
