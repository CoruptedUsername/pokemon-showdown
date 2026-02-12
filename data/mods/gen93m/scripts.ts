export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	teambuilders: {
		"gen93m": {
			tierType: "tier",
			formats: {
				"gen9threemusketeersdraftweek3": {
					topSlice: "3M Musketeer",
					defaultLevel: 50,
				},
			},
			formatType: "singles",
			isNatDex: true,
			validTiers: ["3M Musketeer", "3M Drafted", "3M Mascot", "3M Undrafted"],
		},
		"gen93mw5": {
			tierType: "tier",
			formats: {
				"gen9threemusketeersdraftweek5": {
					topSlice: "3M Musketeer",
					defaultLevel: 100,
				},
			},
			formatType: "singles",
			isNatDex: true,
			validTiers: ["3M Musketeer", "3M Drafted", "3M Mascot", "3M Undrafted"],
			bonusRules: ["Broken Record"],
		},
	},
};
