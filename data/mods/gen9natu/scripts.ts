export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	side: {
		inherit: true,
		canDynamaxNow() {
			// Dynamaxing is not in BDSP
			return true;
		},
	},
};
