export const Rulesets: import('../../../sim/dex-formats').FormatDataTable = {
	rvcmons: {
		effectType: 'ValidatorRule',
		name: 'RVC Mons Clause',
		desc: "Enforces tier mons only",
		onValidateTeam(team) {
			const bannedMons = [];
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (!(species.tier in ['RVC', 'RVC NFE', 'RVC LC'])) bannedMons.push(species.name);
			}
			if (bannedMons.length > 0) {
				return [`You may not use Pok\u00E9mon not part of Regional Variants Cup (you have: ${bannedMons.join(', ')})`];
			}
		},
	},
};
