export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	teambuilders: {
		"gen9dnu": {
			tierType: "tier",
			formats: {
				"gen9donotuse": {
					topSlice: "DoNU OU",
				},
				"gen9donotuseuu": {
					topSlice: "DoNU UU",
				},
				"gen9donotuseru": {
					topSlice: "DoNU RU",
				},
				"gen9donotuseubers": {
					topSlice: "DoNU Uber",
				},
				"gen9donotuseag": {
					topSlice: "DoNU AG",
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
				},
			},
			formatType: "doubles",
			isNatDex: true,
			validTiers: ["DoNU Restricted", "DoNU Unrestricted"],
		},
	},
};
