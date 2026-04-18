export const Rulesets: import('../../../sim/dex-formats').ModdedFormatDataTable = {
	rpsclause: {
		effectType: 'ValidatorRule',
		name: 'RPS Clause',
		desc: "Ensures that all pokemon have all 3 RPS moves",
		onValidateTeam(team, format) {
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				const moves = set.moves;
				if (!('upperhand' in moves) || !('machpunch' in moves) || !('focuspunch' in moves)) {
					return [`Your ${species.baseSpecies} does not have all moves necessary to play Rock Paper Scissors'`];
				}
			}
		},
	},
};
