export const Rulesets: import('../../../sim/dex-formats').ModdedFormatDataTable = {
	rellorclause: {
		effectType: 'ValidatorRule',
		name: 'Rellor Clause',
		desc: "Prevents teams from having more than one Pok&eacute;mon from the same non-Rellor species",
		onBegin() {
			this.add('rule', 'Rellor Clause: Limit one of each Pokémon (Rellor excluded)');
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
	powerplantclause: {
		effectType: 'ValidatorRule',
		name: 'Power Plant Clause',
		desc: "All teams must have at least one Electric type Pokémon.",
		onBegin() {
			this.add('rule', 'Power Plant Clause: All teams must have at least one Electric type Pokémon');
		},
		onValidateTeam(team, format) {
			let hasElectric = false;
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (species.types.includes('Electric')) {
					hasElectric = true;
				}
			}
			if (!hasElectric) {
				return [`You are required to have at least one Pokémon with the Electric typing`];
			}
		},
	},
	kyuremballclause: {
		effectType: 'ValidatorRule',
		name: 'Kyurem Ball Clause',
		desc: 'Any Kyurem form must hold a Poké Ball',
		onValidateTeam(team, format) {
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (species.baseSpecies === 'Kyurem' && set.item !== 'Poke Ball') {
					return [`${species.name} is required to hold a Poké Ball`];
				}
			}
		},
	},
	batonpasstwoclause: {
		effectType: 'ValidatorRule',
		name: 'Baton Pass Two Clause',
		desc: 'Pokémon may only have the move Baton Pass if they also have an empty move slot',
		onBegin() {
			this.add('rule', 'Pokémon may only have the move Baton Pass if they also have an empty move slot');
		},
		onValidateTeam(team, format) {
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				const moves = set.moves;
				if (moves.length === 4 && moves.includes("Baton Pass")) {
					return [`${species.name} cannot have the move Baton Pass without an empty move slot`];
				}
			}
		},
	},
	pdonstatusclause: {
		effectType: 'ValidatorRule',
		name: 'Pdon Status Clause',
		desc: 'Pdon may only use Status moves',
		onValidateTeam(team, format) {
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (species.name === 'Groudon-Primal') {
					for (const move of set.moves) {
						if (this.dex.moves.get(move).category !== 'Status') {
							return [`${species.name} cannot use any non-status moves`];
						}
					}
				}
			}
		},
	},
};
