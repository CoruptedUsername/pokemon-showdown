export const Rulesets: import('../../../sim/dex-formats').FormatDataTable = {
	dnumons: {
		effectType: 'ValidatorRule',
		name: 'DNU Mons Clause',
		desc: "Enforces tier mons only",
		onValidateTeam(team) {
			const bannedMons = [];
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (!(species.tier in ['DoNU AG', 'DoNU Ubers', 'DoNU OU', 'DoNU UUBL', 'DoNU UU', 'DoNU RUBL',
					'DoNU RU'])) bannedMons.push(species.name);
			}
			if (bannedMons.length > 0) {
				return [`You may not use Pok\u00E9mon not part of DNU (you have: ${bannedMons.join(', ')})`];
			}
		},
	},
};
