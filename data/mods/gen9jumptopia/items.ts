export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	naturalorb: {
		num: 1001,
		name: "Natural Orb",
		shortDesc: "If held by a Wildera, this item triggers its Awakening in battle.",
		itemUser: ["Wildera"],
		isPrimalOrb: true,
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Wildera' && !pokemon.transformed) {
				pokemon.formeChange('Wildera-Awakened', this.effect, true);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Wildera') return false;
			return true;
		},
	},
	artificialorb: {
		num: 1002,
		name: "Artificial Orb",
		shortDesc: "If held by a Mechinda, this item triggers its Awakening in battle.",
		itemUser: ["Mechinda"],
		isPrimalOrb: true,
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Mechinda' && !pokemon.transformed) {
				pokemon.formeChange('Mechinda-Awakened', this.effect, true);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Mechinda') return false;
			return true;
		},
	},
};
