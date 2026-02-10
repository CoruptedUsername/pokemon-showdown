export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	teambuilders: [
		{
			tierType: "tier",
			builderTable: "gen9natu",
			tierNames: ["gen9natalieused"],
			tierSlices: ["NatU"],
			isNatDex: true,
			validTiers: ["NatU", "NatU NFE", "NatU LC"],
		},
	],
	side: {
		inherit: true,
		canDynamaxNow() {
			return !this.dynamaxUsed;
		},
	},
};
