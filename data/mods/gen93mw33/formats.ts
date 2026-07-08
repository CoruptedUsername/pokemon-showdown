export const Formats: import('../../../sim/dex-formats').CustomFormatList = [
	{
		name: "[Gen 9] Three Musks Week 33",
		gameType: 'singles',
		ruleset: ['Standard NatDex', '!Species Clause', 'Forme Clause', 'Sleep Moves Clause', 'Terastal Clause',
			'DryPass Clause', 'Mega Rayquaza Clause', 'Three Musks Clause', 'One Restricted Clause'],
		banlist: ['Battle Bond', 'Moody', 'Power Construct', 'Shadow Tag', 'Tangled Feet', 'Berserk Gene',
			'Booster Energy', 'King\'s Rock', 'Quick Claw', 'Razor Fang', 'Hidden Power', 'Last Respects', 'Shed Tail',
			'Baton Pass + Contrary', 'Baton Pass + Rapid Spin', 'Baton Pass + Well-Baked Body', 'Eviolite', 'Analytic',
			'Huge Power', 'Hustle', 'Dynamic Punch'],
		unbanlist: ['Yawn'],
		section: "Three Musketeers",
		restricted: [
			'Assurance', 'Baneful Bunker', 'Bounce', 'Burning Bulwark', 'Copycat', 'Detect', 'Dig', 'Dive', 'Encore', 'Endeavor', 'Fake Out', 'Fly', 'Imprison', 'Nasty Plot',
			'Phantom Force', 'Protect', 'Ruination', 'Shadow Force', 'Shell Smash', 'Silk Trap', 'Spiky Shield', 'Sunny Day', 'Super Fang', 'Swords Dance', 'Taunt', 'Trick Room',
		],
		onValidateSet(set) {
			const problems = [];
			for (const [i, moveid] of set.moves.entries()) {
				const move = this.dex.moves.get(moveid);
				if ([0, 1].includes(i) && this.ruleTable.isRestricted(`move:${move.id}`)) {
					problems.push(`${set.name || set.species}'s move ${move.name} cannot be linked.`);
				}
			}
			return problems;
		},
		onValidateTeam(team) {
			const itemTable = new Set<ID>();
			for (const set of team) {
				const item = this.dex.items.get(set.item);
				if (!(item.forcedForme && !item.zMove) && !item.megaStone &&
					!item.isPrimalOrb && !item.name.startsWith('Rusted')) continue;
				const natdex = this.ruleTable.has('natdexmod');
				if (natdex && item.id !== 'ultranecroziumz') continue;
				const species = this.dex.species.get(set.species);
				if (species.isNonstandard && !this.ruleTable.has(`+tag:${this.toID(species.isNonstandard)}`)) {
					return [`${species.baseSpecies} does not exist in gen 9.`];
				}
				if (((item.itemUser?.includes(species.name) || item.forcedForme === species.name) &&
					!item.megaStone && !item.isPrimalOrb) || (natdex && species.name.startsWith('Necrozma-') &&
						item.id === 'ultranecroziumz')) {
					continue;
				}
				if (itemTable.has(item.id)) {
					return [
						`You are limited to one of each Mega Stone/Primal Orb/Rusted item/Origin item/Ogerpon Mask/Arceus Plate/Silvally Memory.`,
						`(You have more than one ${item.name})`,
					];
				}
				itemTable.add(item.id);
			}
		},
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				pokemon.m.originalSpecies = pokemon.baseSpecies.name;
			}
		},
		onSwitchIn(pokemon) {
			const originalSpecies = this.dex.species.get((pokemon.species as any).originalSpecies);
			if (originalSpecies.exists && pokemon.m.originalSpecies !== originalSpecies.baseSpecies) {
				// Place volatiles on the Pokémon to show its mega-evolved condition and details
				this.add('-start', pokemon, originalSpecies.requiredItems?.[0] || originalSpecies.requiredItem || originalSpecies.requiredMove, '[silent]');
				const oSpecies = this.dex.species.get(pokemon.m.originalSpecies);
				if (oSpecies.types.join('/') !== pokemon.species.types.join('/')) {
					this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]', '[from] format: Mix and Mega');
				}
			}
		},
		onSwitchOut(pokemon) {
			const originalSpecies = this.dex.species.get((pokemon.species as any).originalSpecies);
			if (originalSpecies.exists && pokemon.m.originalSpecies !== originalSpecies.baseSpecies) {
				this.add('-end', pokemon, originalSpecies.requiredItems?.[0] || originalSpecies.requiredItem || originalSpecies.requiredMove, '[silent]');
			}
		},
	},
];
