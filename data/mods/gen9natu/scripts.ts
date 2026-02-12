export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	teambuilders: {
		"gen9natu": {
			tierType: "tier",
			formats: {
				"gen9natalieused": {
					topSlice: "NatU",
					defaultLevel: 100,
				},
			},
			formatType: "singles",
			isNatDex: true,
			validTiers: ["NatU", "NatU NFE", "NatU LC"],
		},
	},
	side: {
		inherit: true,
		canDynamaxNow() {
			return !this.dynamaxUsed;
		},
	},
};
