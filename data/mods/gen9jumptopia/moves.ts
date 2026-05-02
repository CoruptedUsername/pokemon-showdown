export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	lastrespects: {
		inherit: true,
		basePower: 45,
		basePowerCallback(pokemon, target, move) {
			return 45 + 15 * pokemon.side.totalFainted;
		},
		desc: "Power is equal to 45+(X*15), where X is the total number of times any Pokemon has fainted on the user's side, and X cannot be greater than 100.",
		shortDesc: "+15 power for each time a party member fainted.",
	},
	shedtail: {
		inherit: true,
		onTryHit(source) {
			if (!this.canSwitch(source.side) || source.volatiles['commanded']) {
				this.add('-fail', source);
				return this.NOT_FAIL;
			}
			if (source.volatiles['substitute']) {
				this.add('-fail', source, 'move: Shed Tail');
				return this.NOT_FAIL;
			}
			if (source.hp <= Math.ceil(source.maxhp * 2 / 3)) {
				this.add('-fail', source, 'move: Shed Tail', '[weak]');
				return this.NOT_FAIL;
			}
		},
		onHit(target) {
			this.directDamage(Math.ceil(target.maxhp * 2 / 3));
		},
		desc: "The user takes 2/3 of its maximum HP, rounded up, and creates a substitute that has 1/4 of the user's maximum HP, rounded down. The user is replaced with another Pokemon in its party and the selected Pokemon has the substitute transferred to it. Fails if the user would faint, or if there are no unfainted party members.",
		shortDesc: "User takes 2/3 its max HP to pass a substitute.",
	},
	jumpstart: {
		num: 1000,
		accuracy: 100,
		basePower: 40,
		category: 'Physical',
		name: "Jumpstart",
		pp: 30,
		priority: 1,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		target: "normal",
		type: 'Electric',
		desc: "No additional effect.",
		shortDesc: "Usually goes first.",
	},
	crystallights: {
		num: 1001,
		accuracy: 100,
		basePower: 65,
		basePowerCallback(pokemon, target, move) {
			const bp = move.basePower * (pokemon.hp * 2 <= pokemon.maxhp ? 2 : 1);
			this.debug(`BP: ${bp}`);
			return bp;
		},
		category: "Special",
		name: "Crystal Lights",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		target: "normal",
		type: "Rock",
		secondary: {
			chance: 10,
			boosts: {
				accuracy: -1,
			},
		},
		desc: "Power is doubled when user's current HP is below half. If this move is successful, the accuracy of the target is lowered by 1 stage.",
		shortDesc: "10% chance to lower the target's Acc by 1. 2x BP when user below 1/2 HP.",
	},
	rawcouscall: {
		num: 1002,
		accuracy: 100,
		basePower: 25,
		category: "Special",
		name: "Rawcous Call",
		pp: 30,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, sound: 1 },
		multihit: [2, 5],
		target: "normal",
		type: "Poison",
		desc: "Hits two to five times. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times. If the user is holding Loaded Dice, this move will hit 4-5 times.",
		shortDesc: "Hits 2-5 times in one turn.",
	},
	brassyslide: {
		num: 1003,
		accuracy: 100,
		basePower: 25,
		category: "Special",
		name: "Brassy Slide",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, sound: 1 },
		multihit: [2, 5],
		target: "normal",
		type: "Electric",
		desc: "Hits two to five times. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times. If the user is holding Loaded Dice, this move will hit 4-5 times.",
		shortDesc: "Hits 2-5 times in one turn.",
	},
	smokeout: {
		num: 1004,
		accuracy: true,
		basePower: 85,
		category: "Special",
		name: "Smoke Out",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		target: "normal",
		type: "Fire",
		secondary: {
			chance: 100,
			boosts: {
				evasion: -1,
			},
		},
		desc: "This move does not check accuracy. If this move is successful, the evasiveness of the target is lowered by 1 stage.",
		shortDesc: "This move does not check accuracy. Target: -1 evasiveness.",
	},
	colorsplash: {
		num: 1005,
		accuracy: true,
		basePower: 60,
		category: "Special",
		name: "Color Splash",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		onTryHit(target) {
			if (target.getAbility().flags['cantsuppress'] || target.ability === 'colorchange' || target.ability === 'truant') {
				return false;
			}
		},
		onHit(target, source) {
			const oldAbility = target.setAbility('colorchange');
			if (!oldAbility) return oldAbility as false | null;
		},
		target: "normal",
		type: "Water",
		desc: "Causes the target's Ability to become Color Change. Fails if the target's Ability is As One, Battle Bond, Color Change, Comatose, Disguise, Gulp Missile, Ice Face, Multitype, Power Construct, RKS System, Schooling, Shields Down, Stance Change, Tera Shift, Truant, Zen Mode, or Zero to Hero.",
		shortDesc: "The target's Ability becomes Color Change.",
	},
	whetstone: {
		num: 1006,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Whetstone",
		pp: 10,
		priority: 0,
		flags: { snatch: 1, metronome: 1 },
		volatileStatus: 'whetstone',
		condition: {
			onStart(pokemon, source, effect) {
				this.add('-start', pokemon, 'Whetstone');
			},
			onAfterMove(source, target, move) {
				if (move.flags.slicing) {
					target.boosts.def -= 1;
				}
			},
		},
		boosts: {
			atk: 1,
		},
		target: "self",
		type: "Steel",
		desc: "Raises the user's Attack by 1 stage. The user's Slicing moves will lower the target's Defense by 1 stage; the effect ends when the user is no longer active.",
		shortDesc: "+1 Atk, user's Slicing moves lower the target's Def by 1.",
	},
	prophecize: {
		num: 1007,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Prophecize",
		pp: 10,
		priority: 0,
		flags: { allyanim: 1, metronome: 1, futuremove: 1 },
		ignoreImmunity: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'prophecize',
				source,
				moveData: {
					id: 'prophecize',
					name: "Prophecize",
					accuracy: 100,
					basePower: 120,
					category: "Special",
					priority: 0,
					flags: { allyanim: 1, metronome: 1, futuremove: 1 },
					ignoreImmunity: false,
					effectType: 'Move',
					type: 'Dark',
				},
			});
			this.add('-start', source, 'move: Prophecize');
			return this.NOT_FAIL;
		},
		target: "normal",
		type: "Dark",
		desc: "Deals damage two turns after this move is used. At the end of that turn, the damage is calculated at that time and dealt to the Pokemon at the position the target had when the move was used. If the user is no longer active at the time, damage is calculated based on the user's natural Special Attack stat, types, and level, with no boosts from its held item or Ability. Fails if this move, Doom Desire, or Future Sight is already in effect for the target's position.",
		shortDesc: "Hits two turns after being used.",
	},
	meteorassault: {
		num: 1008,
		accuracy: true,
		basePower: 150,
		category: "Physical",
		name: "Meteor Assault",
		pp: 5,
		priority: 0,
		flags: { contact: 1, recharge: 1, protect: 1, mirror: 1, metronome: 1 },
		onAfterMove(pokemon, target, move) {
			if (target && target.hp <= 0) {
				delete pokemon.volatiles['mustrecharge'];
				return;
			}
			this.add('-mustrecharge', pokemon);
		},
		target: "normal",
		type: "Fighting",
		desc: "If this move is successful and does not Knock Out the target, the user must recharge on the following turn and cannot select a move.",
		shortDesc: "User cannot move next turn unless the target is KOd.",
	},
	refreeze: {
		num: 1009,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Refreeze",
		pp: 10,
		priority: 0,
		flags: { snatch: 1, heal: 1, metronome: 1 },
		heal: [1, 3],
		boosts: {
			def: 1,
		},
		onAfterMove(pokemon, target, move) {
			if (!pokemon.hasType('Ice')) {
				pokemon.setStatus('frz');
			}
		},
		target: "self",
		type: "Ice",
		desc: "Raises the user's Defense by 1 stage. The user restores 1/3 of its maximum HP, rounded half up. Freezes the user if it is not an Ice type.",
		shortDesc: "+1 Def, Heals the user by 33% of its max HP. Freezes user if not Ice type.",
	},
	antiquitywave: {
		num: 1010,
		accuracy: 85,
		basePower: 110,
		category: "Special",
		name: "Antiquity Wave",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		target: "normal",
		type: "Grass",
		secondary: {
			chance: 20,
			boosts: {
				spe: -1,
			},
		},
		desc: "Has a 20% chance to lower the target's Speed by 1 stage.",
		shortDesc: "20% chance to lower the target's Speed by 1.",
	},
	technocrash: {
		num: 1011,
		accuracy: 85,
		basePower: 110,
		category: "Physical",
		name: "Techno Crash",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, contact: 1 },
		target: "normal",
		type: "Steel",
		secondary: {
			chance: 20,
			status: 'psn',
		},
		desc: "Has a 20% chance to poison the target.",
		shortDesc: "20% chance to poison adjacent Pokemon.",
	},
};
