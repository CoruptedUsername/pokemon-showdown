export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	scavenge: {
		num: 1000,
		name: "Scavenge",
		onStart(source) {
			if (this.effectState.itemReturn === undefined) {
				if (source.item) {
					this.effectState.itemReturn = -1;
				} else {
					this.effectState.itemReturn = 0;
				}
			}
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.effectState.itemReturn === 1) {
				if (pokemon.hp && !pokemon.item) {
					pokemon.setItem(pokemon.lastItem);
					pokemon.lastItem = '';
					this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Scavenge');
					this.effectState.itemReturn = 0;
				}
			} else if (this.effectState.itemReturn === 0 && !pokemon.item) {
				this.effectState.itemReturn = 1;
			}
		},
		desc: "If this Pokemon loses its item, it recycles it at the end of the next turn, Even if it was Eaten, Knocked Off, Stolen, or Used",
		shortDesc: "If this Pokemon loses its item, it recycles it at the end of the next turn.",
	},
	royalguard: {
		num: 1001,
		name: "Royal Guard",
		onStart(source) {
			if (source.swordBoost) return; // Using sword boost so I don't have to overwrite Pokemon datatype
			source.swordBoost = true;
			if (source.volatiles['substitute']) {
				this.add('-fail', source, 'move: Substitute');
				return this.NOT_FAIL;
			}
			if (source.hp <= source.maxhp / 4 || source.maxhp === 1) { // Shedinja clause
				this.add('-fail', source, 'move: Substitute', '[weak]');
				return this.NOT_FAIL;
			}
			source.damage(source.maxhp / 4);
			source.addVolatile('substitute');
			this.add('-start', source, 'Substitute', '[from] ability: Royal Guard');
		},
		shortDesc: "On switch-in, this Pokemon attempts to use Substitute. Once per battle.",
	},
	nightvision: {
		num: 1002,
		name: "Night Vision",
		onStart(pokemon) {
			this.boost({ accuracy: 1 }, pokemon);
		},
		shortDesc: "On switch-in, this Pokemon's Accuracy is raised by 1 stage.",
	},
	goodnutrition: {
		num: 1003,
		name: "Good Nutrition",
		onModifySpAPriority: 5,
		onModifySpA(spa) {
			return this.chainModify(2);
		},
		shortDesc: "This Pokemon's Special Attack is doubled.",
	},
	airdominance: {
		num: 1004,
		name: "Air Dominance",
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === "Flying" && defender.hasType("Flying")) {
				this.debug('Air Dominance boost');
				return this.chainModify(1.2);
			}
		},
		desc: "This Pokemon's Flying-Type attacks have their power multiplied by 1.2 when used against Flying-Type pokemon.",
		shortDesc: "This Pokemon's Flying-type moves have 1.2x power against a Flying-Type pokemon.",
	},
	crackedopen: {
		num: 1005,
		name: "Cracked Open",
		onDamagingHit(damage, target, source, move) {
			if (move.flags.contact) {
				if (this.effectState.crackedopen) return;
				this.effectState.crackedopen = true;
				this.boost({ def: -1, spa: 1, spe: 1 }, target, target);
			}
		},
		desc: "The first time a contact move hits this Pokemon, its Defense is lowered by 1 stage, its Special Attack is raised by 1 stage, and its Speed is raised by 2 stages.",
		shortDesc: "The first time a contact move hits this Pokemon; -1 Def, +1 SpA, +1 Spe.",
	},
	crosspollinator: {
		num: 1006,
		name: "Cross Pollinator",
		onStart(pokemon) {
			let numPollinators = -1;
			for (const i of pokemon.side.pokemon) {
				if (i.hasAbility("Cross Pollinator")) {
					numPollinators++;
				}
			}
			if (numPollinators > 0) {
				this.add('-active', pokemon, 'ability: Cross Pollinator');
				this.add('-start', pokemon, `pollinators${numPollinators}`, '[silent]');
				this.effectState.pollinators = numPollinators;
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, `fallen${this.effectState.pollinators}`, '[silent]');
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.effectState.pollinators) {
				const powMod = 1 + 0.2 * this.effectState.pollinators;
				this.debug(`Cross Pollinators boost: ${powMod}`);
				return this.chainModify(powMod);
			}
		},
		desc: "This Pokemon's moves have their power multiplied by 1+(X*0.2), where X is the total number of Pokemon on this user's side with the Cross Pollination ability.",
		shortDesc: "This Pokemon's moves have 20% more power for each ally with this ability.",
	},
	kingpin: {
		num: 1007,
		name: "Kingpin",
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.activeMoveActions !== 1 && attacker.lastMove && attacker.lastMove.category !== move.category) {
				return this.chainModify(1.3);
			}
		},
		desc: "If this pokemon's previously used move differs from the one it is currently using, the power of its current move will be multiplied by 1.3.",
		shortDesc: "The power of this pokemon's moves are multiplied by 1.3 if a different category than its previous move.",
	},
	paintedshell: {
		num: 1008,
		name: "Painted Shell",
		onStart(pokemon) {
			const coverageMoves = [];
			for (const i of pokemon.moves) {
				if (Dex.moves.get(i) !== undefined && typeof Dex.moves.get(i) !== "string" &&
					!(Dex.moves.get(i).type in ["Water", "Ground", "Rock"]) && Dex.moves.get(i).category === "Special") {
					coverageMoves.push(i);
				}
			}
			if (coverageMoves.length === 1) {
				this.add('-message', `  You see a sign of ${coverageMoves[0]} on ${pokemon}'s painted shell!`, '[from] ability: ' + pokemon.ability, `[of] ${pokemon}`);
			} else if (coverageMoves.length === 2) {
				this.add('-message', `  You see signs of ${coverageMoves[0]} and ${coverageMoves[1]} on ${pokemon}'s painted shell!`, '[from] ability: ' + pokemon.ability, `[of] ${pokemon}`);
			} else if (coverageMoves.length === 3) {
				this.add('-message', `  You see signs of ${coverageMoves[0]}, ${coverageMoves[1]}, and ${coverageMoves[2]} on ${pokemon}'s painted shell!`, '[from] ability: ' + pokemon.ability, `[of] ${pokemon}`);
			} else if (coverageMoves.length === 4) {
				this.add('-message', `  You see signs of ${coverageMoves[0]}, ${coverageMoves[1]}, ${coverageMoves[2]}, and ${coverageMoves[3]} on ${pokemon}'s painted shell!`, '[from] ability: ' + pokemon.ability, `[of] ${pokemon}`);
			}
		},
		onBasePowerPriority: 22,
		onBasePower(basePower, attacker, defender, move) {
			if (!(move.type in ["Water", "Ground", "Rock"]) && move.category === "Special") {
				return this.chainModify(1.3);
			}
		},
		desc: "The power of this pokemon's Special moves that are not Ground-type, Rock-type, or Water-type will be multiplied by 1.3 and these moves will be announced when the Pokemon switches in.",
		shortDesc: "Announces and boosts by 1.3x special moves of Non-Ground, Rock, or Water typing.",
	},
	metallize: {
		num: 1009,
		name: "Metallize",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && (!noModifyType.includes(move.id) || this.activeMove?.isMax) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Steel';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		desc: "This Pokemon's Normal-type moves become Steel-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Steel type and have 1.2x power.",
	},
	plaguewarning: {
		num: 1010,
		name: "Plague Warning",
		flags: { breakable: 1 },
		onTryHit(target, source, move) {
			if (target !== source && move.type === "Bug" || move.type === "Poison") {
				this.add('-immune', target, '[from] ability: Plague Warning');
				return null;
			}
		},
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['futuremove']) {
				this.debug('Plague Warning boost');
				return this.chainModify(1.2);
			}
		},
		desc: "This pokemon is immune to Bug-Type and Poison-Type moves. The power of its Future Moves (Doom Desire, Future Sight, Prophecize) are multiplied by 1.2.",
		shortDesc: "This Pokemon's Future Moves do 1.2x damage; Bug, Poison immunity.",
	},
	lunarreflection: {
		num: 1011,
		name: "Lunar Reflection",
		onStart(pokemon) {
			pokemon.side.addSideCondition('lightscreen');
		},
		desc: "On switch-in, the user attempts to set up a Light Screen on their side of the field.",
		shortDesc: "On switch-in, attempts to set Light Screen.",
	},
	forceofnature: {
		num: 1012,
		name: "Force of Nature",
		onStart(source) {
			this.field.addPseudoWeather('Force of Nature', source);
		},
		onPseudoWeatherChange(target, source, pseudoWeather) {
			if (pseudoWeather.name === "Industry Standard") {
				this.field.removePseudoWeather("Force of Nature");
			}
		},
		onEnd(pokemon) {
			if (this.field.pseudoWeather["Force of nature"].source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('forceofnature')) {
					this.field.pseudoWeather["Force of nature"].source = target;
					return;
				}
			}
			this.field.removePseudoWeather('Force of Nature');
		},
		desc: "On switch-in, nature's power is felt, which prevents damaging Steel-type and Electric-Type moves from executing. This standard remains in effect until this Ability is no longer active for any Pokemon, or Industry's Standard is set.",
		shortDesc: "On switch-in, nature's power is felt until this Ability is not active in battle.",
	},
	industrystandard: {
		num: 1013,
		name: "Industry Standard",
		onStart(source) {
			this.field.addPseudoWeather('Industry Standard', source);
		},
		onPseudoWeatherChange(target, source, pseudoWeather) {
			if (pseudoWeather.name === "Force of nature") {
				this.field.removePseudoWeather('Industry Standard');
			}
		},
		onEnd(pokemon) {
			if (this.field.pseudoWeather["Industry Standard"].source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('industrystandard')) {
					this.field.pseudoWeather["Industry Standard"].source = target;
					return;
				}
			}
			this.field.removePseudoWeather('Industry Standard');
		},
		desc: "On switch-in, an industry standard is enforced, which prevents damaging Grass-type and Ground-Type moves from executing. This standard remains in effect until this Ability is no longer active for any Pokemon, or the Force of Nature is felt.",
		shortDesc: "On switch-in, an industry standard is enforced until this Ability is not active in battle.",
	},
	stancechange: {
		inherit: true,
		onModifyMove(move, attacker, defender) {
			if (attacker.species.baseSpecies !== 'Aegibash' || attacker.transformed) return;
			if (move.category !== 'Status' && !move.flags.punch) return;
			const targetForme = (move.flags.punch ? 'Aegibash' : 'Aegibash-Block');
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
		},
		desc: "If this Pokemon is an Aegibash, it changes to Jab Forme before using a punching move, and changes to Block Forme before using status moves.",
		shortDesc: "If Aegibash, changes Forme to Jab before punches and Block before status moves.",
	},
};
