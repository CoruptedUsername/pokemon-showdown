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
	init() {
		for (const move in this.modData("Learnsets", "groudon").learnset) {
			if (this.modData("Moves", move).category !== 'Status') {
				// this.modData("Learnsets", "groudon").learnset[move] = [];
				console.log(move + " is not a status move");
			} else {
				console.log(move + " is a status move");
			}
		}
	},
};
