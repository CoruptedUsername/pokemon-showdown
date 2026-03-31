/**
 * A lot of Gen 1 moves have to be updated due to different mechanics.
 * Some moves have had major changes, such as Bite's typing.
 */

export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	tacklegen14: {
		num: 33,
		accuracy: 95,
		basePower: 35,
		category: "Physical",
		name: "Tackle (Gen 1-4)",
		pp: 35,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
	tacklegen56: {
		num: 33,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Tackle (Gen 5-6)",
		pp: 35,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
	tacklegen78: {
		num: 33,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Tackle (Gen 7-8)",
		pp: 35,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
	bitegen1: {
		num: 44,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Bite (Gen 1)",
		pp: 25,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1 },
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
};
