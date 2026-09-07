export const Formats: import('../../../sim/dex-formats').CustomFormatList = [
	{
		name: "[Gen 9] Rock Paper Scissors",
		ruleset: ['Standard AG', 'NatDex Mod', 'RPS Clause', '!! EV Limit=0', 'Max Team Size = 3'],
		banlist: ['Vanilla'],
		section: "Other Solomods",
		teambuilder: {
			defaultLevel: 100,
			tierType: "singles",
			formatType: "singles",
			allowedTiers: ['RPS'],
			isNatDex: true,
		},
	},
];
