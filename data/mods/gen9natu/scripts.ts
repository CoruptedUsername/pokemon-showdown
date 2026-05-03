export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	side: {
		inherit: true,
		canDynamaxNow() {
			return !this.dynamaxUsed;
		},
	},
};
