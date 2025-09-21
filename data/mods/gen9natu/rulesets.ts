export const Rulesets: import('../../../sim/dex-formats').FormatDataTable = {
	rellorclause: {
		effectType: 'ValidatorRule',
		name: 'Rellor Clause',
		desc: "Prevents teams from having more than one Pok&eacute;mon from the same non-Rellor species",
		onBegin() {
			this.add('rule', 'Species Clause: Limit one of each Pokémon (Rellor excluded)');
		},
		onValidateTeam(team, format) {
			const speciesTable = new Set<number>();
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (speciesTable.has(species.num) && species.num !== 953) {
					return [`You are limited to one of each non-Rellor Pokémon by Species Clause.`, `(You have more than one	${species.baseSpecies})`];
				}
				speciesTable.add(species.num);
			}
		},
	},
	paralysisclause: {
		effectType: 'ValidatorRule',
		name: 'Paralysis Clause',
		desc: "Bans all effects with high change to paralyze, such as Thunder Wave",
		banlist: ['Thunder Wave', 'Nuzzle', 'Stun Spore', 'Static'],
		onBegin() {
			this.add('rule', 'Paralysis Clause: Effects with high chance to paralyze are banned');
		},
	},
};
