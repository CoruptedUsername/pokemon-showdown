export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	teambuilders: {
		"gen9dnu": {
			tierType: "tier",
			formats: {
				"gen9donotuse": {
					topSlice: "DoNU OU",
					defaultLevel: 100,
				},
				"gen9donotuseuu": {
					topSlice: "DoNU UU",
					defaultLevel: 100,
				},
				"gen9donotuseru": {
					topSlice: "DoNU RU",
					defaultLevel: 100,
				},
				"gen9donotuseubers": {
					topSlice: "DoNU Uber",
					defaultLevel: 100,
				},
				"gen9donotuseag": {
					topSlice: "DoNU AG",
					defaultLevel: 100,
				},
			},
			formatType: "singles",
			isNatDex: true,
			validTiers: ["DoNU AG", "DoNU Uber", "DoNU OU", "DoNU UUBL", "DoNU UU", "DoNU RUBL", "DoNU RU"],
		},
		"gen9dnuvgc": {
			tierType: "doublesTier",
			formats: {
				"gen9donotusevgc": {
					topSlice: "DoNU Restricted",
					defaultLevel: 50,
				},
			},
			formatType: "doubles",
			isNatDex: true,
			validTiers: ["DoNU Restricted", "DoNU Unrestricted"],
		},
	},
};
