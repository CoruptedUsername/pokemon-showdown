export const Rulesets: import('../../../sim/dex-formats').ModdedFormatDataTable = {
	generationitemclause: {
		effectType: 'ValidatorRule',
		name: 'Generation Item Clause',
		desc: "Prevents mons from using items they wouldn't have access to in their game",
		onValidateTeam(team, format) {
			for (const set of team) {
				if (this.dex.items.get(set.item).relevantTiers) {
					// @ts-expect-error
					if (!(this.dex.species.get(set.species).tier in	this.dex.items.get(set.item).relevantTiers)) {
						return [`${set.species} cannot use the item ${set.item}`];
					}
				}
			}
		},
	},
};
