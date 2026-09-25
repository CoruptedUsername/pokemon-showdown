export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	coruptedblast: {
		num: 1011,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Corupted Blast",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, mustpressure: 1 },
		onPrepareHit(target, source, move) {
			this.attrLastMove('[anim] Tera Blast ' + source.types[source.types.length() - 1]);
		},
		onModifyType(move, pokemon, target) {
			move.type = pokemon.types[pokemon.types.length() - 1];
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) {
				move.category = 'Physical';
			}
		},
		target: "normal",
		type: "Normal",
	},
};
