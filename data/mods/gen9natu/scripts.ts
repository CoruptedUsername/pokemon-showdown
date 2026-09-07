export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	teambuilder: true,
	side: {
		inherit: true,
		canDynamaxNow() {
			return !this.dynamaxUsed;
		},
	},
};
