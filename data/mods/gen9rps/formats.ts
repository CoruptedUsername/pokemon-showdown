export const Formats: import('../../../sim/dex-formats').CustomFormatList = {
	gen9rockpaperscissors: {
		name: "[Gen 9] Rock Paper Scissors",
		ruleset: ['Standard AG', 'NatDex Mod', 'RPS Clause', '!! EV Limit=0', 'Max Team Size = 3'],
		banlist: ['Vanilla'],
		section: "Other Solomods",
		teambuilder: {
			defaultLevel: 100,
			tierType: "tier",
			formatType: "singles",
			allowedTiers: ['RPS'],
			isNatDex: true,
		},
	},
};
