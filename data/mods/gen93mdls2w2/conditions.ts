export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	silvally: {
		name: 'Silvally',
		onTypePriority: 1,
		onType(types, pokemon) {
			if (pokemon.transformed || pokemon.ability !== 'rkssystem' && this.gen >= 8) return types;
			let type: string | undefined = 'Normal';
			if (pokemon.ability === 'rkssystem') {
				type = pokemon.getItem().onMemory;
				switch (type) {
				case 'Bug':
					return ['Bug', 'Rock'];
				case 'Dark':
					return ['Dark', 'Rock'];
				case 'Dragon':
					return ['Dragon', 'Fairy'];
				case 'electric':
					return ['Electric', 'Fire'];
				case 'Fairy':
					return ['Fairy', 'Bug'];
				case 'Fighting':
					return ['Fighting', 'Fairy'];
				case 'Fire':
					return ['Fire', 'Rock'];
				case 'Flying':
					return ['Flying', 'Dark'];
				case 'Ghost':
					return ['Ghost', 'Fire'];
				case 'Grass':
					return ['Grass', 'Flying'];
				case 'Ground':
					return ['Ground', 'Dark'];
				case 'Ice':
					return ['Ice', 'Water'];
				case 'Poison':
					return ['Poison', 'Dark'];
				case 'Psychic':
					return ['Psychic', 'Steel'];
				case 'Rock':
					return ['Rock', 'Normal'];
				case 'Steel':
					return ['Steel', 'Electric'];
				case 'Water':
					return ['Water', 'Poison'];
				default:
					return ['Normal', 'Bug'];
				}
			}
			return ['Normal', 'Bug'];
		},
	},
};
