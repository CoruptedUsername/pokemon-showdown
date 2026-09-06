export const Rulesets: import('../../../sim/dex-formats').ModdedFormatDataTable = {
	threemusksclause: {
		effectType: 'ValidatorRule',
		name: 'Three Musks Clause',
		desc: "Allows only a maximum of Three Musketeers",
		onValidateTeam(team) {
			let numMusks = 0;
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (['3M Musks', '3M Restricted Musks'].includes(species.tier)) {
					numMusks++;
				}
			}
			if (numMusks > 3) {
				return [`You can only use up to three musketeer Pok\u00E9mon (you have ${numMusks})`];
			}
		},
	},
	onerestrictedclause: {
		effectType: 'ValidatorRule',
		name: 'One Restricted Clause',
		desc: "Allows only a maximum of One Restricted Pok\u00E9mon",
		onValidateTeam(team) {
			let numRestricted = 0;
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (['3M Restricted Musks', '3M Restricted'].includes(species.tier)) {
					numRestricted++;
				}
			}
			if (numRestricted > 1) {
				return [`You can only use up to one Restricted Pok\u00E9mon (you have ${numRestricted})`];
			}
		},
	},
};
