export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	forceofnature: {
		name: 'Force of Nature',
		duration: 0,
		onTryMovePriority: 1,
		onTryMove(attacker, defender, move) {
			if (move.type === "Steel" && move.category !== "Status") {
				this.debug('Force of Nature steel suppress');
				this.add('-message', "  The Steel-Type attack was turned to rust by nature's power!");
				this.attrLastMove('[still]');
				return null;
			} else if (move.type === "Electric" && move.category !== "Status") {
				this.debug('Force of Nature electric suppress');
				this.add('-message', "  The Electric Type attack was dissipated by nature's resilience!");
				this.attrLastMove('[still]');
				return null;
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-message', "  Nature has begun to show her wrath!", '[from] ability: ' + effect.name, `[of] ${source}`);
		},
		onFieldEnd() {
			this.add('-message', "  Nature has returned to her slumber.");
		},
	},
	industrystandard: {
		name: 'Industry Standard',
		duration: 0,
		onTryMovePriority: 1,
		onTryMove(attacker, defender, move) {
			if (move.type === "Grass" && move.category !== "Status") {
				this.debug('Industry Standard grass suppress');
				this.add('-message', "  The Grass-Type attack couldn't take root with the industry's lands!");
				this.attrLastMove('[still]');
				return null;
			} else if (move.type === "Ground" && move.category !== "Status") {
				this.debug('Industry Standard ground suppress');
				this.add('-message', "  The Ground-Type attack failed to shake industry's might!");
				this.attrLastMove('[still]');
				return null;
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-message', "  An Industry Standard has been established!", '[from] ability: ' + effect.name, `[of] ${source}`);
		},
		onFieldEnd() {
			this.add('-message', "  The Industry Standard has been abandoned.");
		},
	},
};
