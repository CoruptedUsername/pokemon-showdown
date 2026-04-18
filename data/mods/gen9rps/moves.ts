export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	machpunch: {
		inherit: true,
		basePower: 9999,
		pp: 99,
		onTry(source, target) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if (!move || move.name === 'Mach Punch') {
				return false;
			}
		},
	},
	focuspunch: {
		inherit: true,
		basePower: 9999,
		pp: 99,
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile('focuspunch');
		},
		beforeMoveCallback(pokemon) {
			if (pokemon.volatiles['focuspunch']?.lostFocus) {
				this.add('cant', pokemon, 'Focus Punch', 'Focus Punch');
				return true;
			}
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Focus Punch');
			},
			onHit(pokemon, source, move) {
				if (move.category !== 'Status') {
					this.effectState.lostFocus = true;
				}
			},
			onBeforeMove(source, target, move) {
				if (target.volatiles['focuspunch']) {
					this.effectState.lostFocus = true;
				}
			},
			onTryAddVolatile(status, pokemon) {
				if (status.id === 'flinch') return null;
			},
		},
	},
	upperhand: {
		inherit: true,
		basePower: 9999,
		pp: 99,
		onTry(source, target) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if (!move || move.priority <= 0.1 || move.category === 'Status' || move.name === 'Upper Hand') {
				return false;
			}
		},
	},
};
