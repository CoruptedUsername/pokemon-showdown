export const Rulesets: import('../../../sim/dex-formats').ModdedFormatDataTable = {
	rpsclause: {
		effectType: 'ValidatorRule',
		name: 'RPS Clause',
		desc: "Ensures that all pokemon have all 3 RPS moves",
		onValidateTeam(team, format) {
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				const moves = set.moves;
				console.log(moves);
				if (!('Upper Hand' in moves) || !('Mach Punch' in moves) || !('Focus Punch' in moves)) {
					return [`Your ${species.baseSpecies} does not have all moves necessary to play Rock Paper Scissors'`];
				}
			}
		},
	},
};
