/**
 * A lot of Gen 1 moves have to be updated due to different mechanics.
 * Some moves have had major changes, such as Bite's typing.
 */

export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	tacklegen1: {
		num: 33,
		accuracy: 95,
		basePower: 35,
		category: "Physical",
		name: "Tackle (Gen 1)",
		pp: 35,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
};
