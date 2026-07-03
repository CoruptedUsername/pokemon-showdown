export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	init() {
		// Since twoturnmove isn't currently implemented using linked volatiles,
		// patch related moves so that 'twoturnmove' and e.g. 'skullbash' end simultaneously.
		const removeTwoTurnMove = function (target: Pokemon) {
			// Cannot use target.removeVolatile, since it would cause stack overflow.
			delete target.volatiles['twoturnmove'];
		};
		for (const id in this.data.Moves) {
			if (this.data.Moves[id].flags['charge'] && id !== 'skydrop') {
				this.modData("Moves", id).condition ||= {};
				if ('onEnd' in this.modData("Moves", id).condition) throw new Error(`onEnd needs manual override for move ${id}`);
				this.modData("Moves", id).condition.onEnd = removeTwoTurnMove;
			}
		}
		this.modData('Abilities', 'dragonize').isNonstandard = null;
		this.modData('Abilities', 'megasol').isNonstandard = null;
		this.modData('Abilities', 'piercingdrill').isNonstandard = null;
		this.modData('Abilities', 'spicyspray').isNonstandard = null;
		for (const i in this.data.Items) {
			const item = this.data.Items[i];
			if (!item.megaStone && !item.onDrive && !(item.onPlate && !item.zMove) && !item.onMemory) continue;
			this.modData('Items', i).onTakeItem = false;
			if (item.isNonstandard === "Past" || item.isNonstandard === "Future") this.modData('Items', i).isNonstandard = null;
			if (item.megaStone) {
				for (const megaEvo of Object.values(item.megaStone)) {
					this.modData('FormatsData', this.toID(megaEvo)).isNonstandard = null;
				}
			}
		}
	},
	start() {
		// Deserialized games should use restart()
		if (this.deserialized) return;
		// need all players to start
		if (!this.sides.every(side => !!side)) throw new Error(`Missing sides: ${this.sides}`);

		if (this.started) throw new Error(`Battle already started`);

		const format = this.format;
		this.started = true;
		if (this.gameType === 'multi') {
			this.sides[1].foe = this.sides[2]!;
			this.sides[0].foe = this.sides[3]!;
			this.sides[2]!.foe = this.sides[1];
			this.sides[3]!.foe = this.sides[0];
			this.sides[1].allySide = this.sides[3]!;
			this.sides[0].allySide = this.sides[2]!;
			this.sides[2]!.allySide = this.sides[0];
			this.sides[3]!.allySide = this.sides[1];
			// sync side conditions
			this.sides[2]!.sideConditions = this.sides[0].sideConditions;
			this.sides[3]!.sideConditions = this.sides[1].sideConditions;
		} else {
			this.sides[1].foe = this.sides[0];
			this.sides[0].foe = this.sides[1];
			if (this.sides.length > 2) { // ffa
				this.sides[2]!.foe = this.sides[3]!;
				this.sides[3]!.foe = this.sides[2]!;
			}
		}

		this.add('gen', this.gen);

		this.add('tier', format.name);
		if (this.rated) {
			if (this.rated === 'Rated battle') this.rated = true;
			this.add('rated', typeof this.rated === 'string' ? this.rated : '');
		}

		format.onBegin?.call(this);
		for (const rule of this.ruleTable.keys()) {
			if ('+*-!'.includes(rule.charAt(0))) continue;
			const subFormat = this.dex.formats.get(rule);
			subFormat.onBegin?.call(this);
		}
		for (const pokemon of this.getAllPokemon()) {
			const item = pokemon.getItem();
			if (item.forcedForme && !item.zMove && item.forcedForme !== pokemon.species.name) {
				const rawSpecies = (this.actions as any).getMixedSpecies(pokemon.m.originalSpecies, item.forcedForme, pokemon);
				const species = pokemon.setSpecies(rawSpecies);
				if (!species) continue;
				pokemon.baseSpecies = rawSpecies;
				pokemon.details = pokemon.getUpdatedDetails();
				pokemon.ability = this.toID(species.abilities['0']);
				pokemon.baseAbility = pokemon.ability;
			}
		}

		if (this.sides.some(side => !side.pokemon[0])) {
			throw new Error('Battle not started: A player has an empty team.');
		}

		if (this.debugMode) {
			this.checkEVBalance();
		}

		if (format.customRules) {
			const plural = format.customRules.length === 1 ? '' : 's';
			const open = format.customRules.length <= 5 ? ' open' : '';
			this.add(`raw|<div class="infobox"><details class="readmore"${open}><summary><strong>${format.customRules.length} custom rule${plural}:</strong></summary> ${format.customRules.join(', ')}</details></div>`);
		}

		this.runPickTeam();
		this.queue.addChoice({ choice: 'start' });
		this.midTurn = true;
		if (!this.requestState) this.turnLoop();
	},
	getActionSpeed(action) {
		if (action.choice === 'move') {
			let move = action.move;
			if (action.zmove) {
				const zMoveName = this.actions.getZMove(action.move, action.pokemon, true);
				if (zMoveName) {
					const zMove = this.dex.getActiveMove(zMoveName);
					if (zMove.exists && zMove.isZ) {
						move = zMove;
					}
				}
			}
			if (action.maxMove) {
				const maxMoveName = this.actions.getMaxMove(action.maxMove, action.pokemon);
				if (maxMoveName) {
					const maxMove = this.actions.getActiveMaxMove(action.move, action.pokemon);
					if (maxMove.exists && maxMove.isMax) {
						move = maxMove;
					}
				}
			}
			// Linked mod
			const { linkIndex, linkedMoves } = action.pokemon.queryLinkMove(action.move);
			if (linkIndex >= 0 && action.pokemon.getCanLinkMove(action.move)) {
				const linkedActions = action.linked || linkedMoves;
				const originalMove = linkedActions[linkIndex];
				const altMove = linkedActions[1 - linkIndex];
				let thisPriority = this.dex.moves.get(originalMove.id).priority;
				thisPriority = this.singleEvent('ModifyPriority', originalMove, null, action.pokemon, null, null, thisPriority);
				thisPriority = this.runEvent('ModifyPriority', action.pokemon, null, originalMove, thisPriority);
				let thatPriority = this.dex.moves.get(altMove.id).priority;
				thatPriority = this.singleEvent('ModifyPriority', altMove, null, action.pokemon, null, null, thatPriority);
				thatPriority = this.runEvent('ModifyPriority', action.pokemon, null, altMove, thatPriority);
				const priority = Math.min(thisPriority, thatPriority);
				action.priority = priority + action.fractionalPriority;
				if (this.gen > 5) {
					// Gen 6+: Quick Guard blocks moves with artificially enhanced priority.
					// This also applies to Psychic Terrain.
					originalMove.priority = priority;
					altMove.priority = priority;
				}
			} else {
				// take priority from the base move, so abilities like Prankster only apply once
				// (instead of compounding every time `getActionSpeed` is called)
				let priority = this.dex.moves.get(move.id).priority;
				priority = this.singleEvent('ModifyPriority', move, null, action.pokemon, null, null, priority);
				priority = this.runEvent('ModifyPriority', action.pokemon, null, move, priority);
				action.priority = priority + action.fractionalPriority;
				// In Gen 6, Quick Guard blocks moves with artificially enhanced priority.
				if (this.gen > 5) action.move.priority = priority;
			}
		}

		if (!action.pokemon) {
			action.speed = 1;
		} else {
			action.speed = action.pokemon.getActionSpeed();
		}
	},
	runAction(action) {
		const pokemonOriginalHP = action.pokemon?.hp;
		let residualPokemon: (readonly [Pokemon, number])[] = [];
		// returns whether or not we ended in a callback
		switch (action.choice) {
		case 'start': {
			for (const side of this.sides) {
				if (side.pokemonLeft) side.pokemonLeft = side.pokemon.length;
				this.add('teamsize', side.id, side.pokemon.length);
			}

			this.add('start');

			for (const pokemon of this.getAllPokemon()) {
				let rawSpecies: Species | null = null;
				const item = pokemon.getItem();
				if (item.id === 'rustedsword') {
					rawSpecies = (this.actions as any).getMixedSpecies(pokemon.m.originalSpecies, 'Zacian-Crowned', pokemon);
				} else if (item.id === 'rustedshield') {
					rawSpecies = (this.actions as any).getMixedSpecies(pokemon.m.originalSpecies, 'Zamazenta-Crowned', pokemon);
				}
				if (!rawSpecies) continue;
				const species = pokemon.setSpecies(rawSpecies);
				if (!species) continue;
				pokemon.baseSpecies = rawSpecies;
				pokemon.details = pokemon.getUpdatedDetails();
				pokemon.ability = this.toID(species.abilities['0']);
				pokemon.baseAbility = pokemon.ability;

				const behemothMove: { [k: string]: string } = {
					'Rusted Sword': 'behemothblade', 'Rusted Shield': 'behemothbash',
				};
				const ironHeadIndex = pokemon.baseMoves.indexOf('ironhead');
				if (ironHeadIndex >= 0) {
					const move = this.dex.moves.get(behemothMove[pokemon.getItem().name]);
					const pp = this.calculatePP(move, pokemon.ppUps[ironHeadIndex]);
					pokemon.baseMoveSlots[ironHeadIndex] = {
						move: move.name,
						id: move.id,
						pp,
						maxpp: pp,
						target: move.target,
						disabled: false,
						disabledSource: '',
						used: false,
					};
					pokemon.moveSlots = pokemon.baseMoveSlots.slice();
				}
			}

			this.format.onBattleStart?.call(this);
			for (const rule of this.ruleTable.keys()) {
				if ('+*-!'.includes(rule.charAt(0))) continue;
				const subFormat = this.dex.formats.get(rule);
				subFormat.onBattleStart?.call(this);
			}

			for (const side of this.sides) {
				for (let i = 0; i < side.active.length; i++) {
					if (!side.pokemonLeft) {
						// forfeited before starting
						side.active[i] = side.pokemon[i];
						side.active[i].fainted = true;
						side.active[i].hp = 0;
					} else {
						this.actions.switchIn(side.pokemon[i], i);
					}
				}
			}
			for (const pokemon of this.getAllPokemon()) {
				this.singleEvent('Start', this.dex.conditions.getByID(pokemon.species.id), pokemon.speciesState, pokemon);
			}
			this.midTurn = true;
			break;
		}

		case 'move':
			if (!action.pokemon.isActive) return false;
			if (action.pokemon.fainted) return false;
			// Linked moves
			// @ts-expect-error modded
			if (action.linked) {
				// @ts-expect-error modded
				const linkedMoves: ActiveMove[] = action.linked;
				for (let i = linkedMoves.length - 1; i >= 0; i--) {
					// @ts-expect-error modded
					const targetLoc = this.resolveTargetLoc(action.targetLoc, action, linkedMoves[i]);
					const pseudoAction: Action = {
						choice: 'move', priority: action.priority, speed: action.speed, pokemon: action.pokemon,
						targetLoc, moveid: linkedMoves[i].id, move: linkedMoves[i], mega: action.mega,
						order: action.order, fractionalPriority: action.fractionalPriority,
						// @ts-expect-error modded
						originalTarget: action.linkedTargets[i],
						// @ts-expect-error modded
						sorted: i === 1,
					};
					this.queue.unshift(pseudoAction);
				}
				return;
			}
			this.actions.runMove(action.move, action.pokemon, action.targetLoc, {
				sourceEffect: action.sourceEffect, zMove: action.zmove,
				maxMove: action.maxMove, originalTarget: action.originalTarget,
			});
			break;
		case 'megaEvo':
			this.actions.runMegaEvo(action.pokemon);
			break;
		case 'runDynamax':
			action.pokemon.addVolatile('dynamax');
			action.pokemon.side.dynamaxUsed = true;
			if (action.pokemon.side.allySide) action.pokemon.side.allySide.dynamaxUsed = true;
			break;
		case 'terastallize':
			this.actions.terastallize(action.pokemon);
			break;
		case 'beforeTurnMove':
			if (!action.pokemon.isActive) return false;
			if (action.pokemon.fainted) return false;
			this.debug('before turn callback: ' + action.move.id);
			const target = this.getTarget(action.pokemon, action.move, action.targetLoc);
			if (!target) return false;
			if (!action.move.beforeTurnCallback) throw new Error(`beforeTurnMove has no beforeTurnCallback`);
			action.move.beforeTurnCallback.call(this, action.pokemon, target);
			break;
		case 'priorityChargeMove':
			if (!action.pokemon.isActive) return false;
			if (action.pokemon.fainted) return false;
			this.debug('priority charge callback: ' + action.move.id);
			if (!action.move.priorityChargeCallback) throw new Error(`priorityChargeMove has no priorityChargeCallback`);
			action.move.priorityChargeCallback.call(this, action.pokemon);
			break;

		case 'event':
			this.runEvent(action.event!, action.pokemon);
			break;
		case 'team':
			if (action.index === 0) {
				action.pokemon.side.pokemon = [];
			}
			action.pokemon.side.pokemon.push(action.pokemon);
			action.pokemon.position = action.index;
			// we return here because the update event would crash since there are no active pokemon yet
			return;

		case 'pass':
			return;
		case 'instaswitch':
		case 'switch':
			if (action.choice === 'switch' && action.pokemon.status) {
				this.singleEvent('CheckShow', this.dex.abilities.getByID('naturalcure' as ID), null, action.pokemon);
			}
			if (this.actions.switchIn(action.target, action.pokemon.position, action.sourceEffect) === 'pursuitfaint') {
				// a pokemon fainted from Pursuit before it could switch
				if (this.gen <= 4) {
					// in gen 2-4, the switch still happens
					this.hint("Previously chosen switches continue in Gen 2-4 after a Pursuit target faints.");
					action.priority = -101;
					this.queue.unshift(action);
					break;
				} else {
					// in gen 5+, the switch is cancelled
					this.hint("A Pokemon can't switch between when it runs out of HP and when it faints");
					break;
				}
			}
			break;
		case 'revivalblessing':
			action.pokemon.side.pokemonLeft++;
			if (action.target.position < action.pokemon.side.active.length) {
				this.queue.addChoice({
					choice: 'instaswitch',
					pokemon: action.target,
					target: action.target,
				});
			}
			action.target.fainted = false;
			action.target.faintQueued = false;
			action.target.subFainted = false;
			action.target.status = '';
			action.target.hp = 1; // Needed so hp functions works
			action.target.sethp(action.target.maxhp / 2);
			this.add('-heal', action.target, action.target.getHealth, '[from] move: Revival Blessing');
			action.pokemon.side.removeSlotCondition(action.pokemon, 'revivalblessing');
			break;
		case 'runSwitch':
			this.actions.runSwitch(action.pokemon);
			break;
		case 'shift':
			if (!action.pokemon.isActive) return false;
			if (action.pokemon.fainted) return false;
			this.swapPosition(action.pokemon, 1);
			break;

		case 'beforeTurn':
			this.eachEvent('BeforeTurn');
			break;
		case 'residual':
			this.add('');
			this.clearActiveMove(true);
			this.updateSpeed();
			residualPokemon = this.getAllActive().map(pokemon => [pokemon, pokemon.getUndynamaxedHP()] as const);
			this.fieldEvent('Residual');
			this.add('upkeep');
			break;
		}

		// phazing (Roar, etc)
		for (const side of this.sides) {
			for (const pokemon of side.active) {
				if (pokemon.forceSwitchFlag) {
					if (pokemon.hp) this.actions.dragIn(pokemon.side, pokemon.position);
					pokemon.forceSwitchFlag = false;
				}
			}
		}

		this.clearActiveMove();

		// fainting

		this.faintMessages();
		if (this.ended) return true;

		// switching (fainted pokemon, U-turn, Baton Pass, etc)

		if (!this.queue.peek() || (this.gen <= 3 && ['move', 'residual'].includes(this.queue.peek()!.choice))) {
			// in gen 3 or earlier, switching in fainted pokemon is done after
			// every move, rather than only at the end of the turn.
			this.checkFainted();
		} else if (action.choice === 'megaEvo' && this.gen === 7) {
			this.eachEvent('Update');
			// In Gen 7, the action order is recalculated for a Pokémon that mega evolves.
			for (const [i, queuedAction] of this.queue.list.entries()) {
				if (queuedAction.pokemon === action.pokemon && queuedAction.choice === 'move') {
					this.queue.list.splice(i, 1);
					queuedAction.mega = 'done';
					this.queue.insertChoice(queuedAction, true);
					break;
				}
			}
			return false;
		} else if (this.queue.peek()?.choice === 'instaswitch') {
			return false;
		}

		if (this.gen >= 5 && action.choice !== 'start') {
			this.eachEvent('Update');
			for (const [pokemon, originalHP] of residualPokemon) {
				const maxhp = pokemon.getUndynamaxedHP(pokemon.maxhp);
				if (pokemon.hp && pokemon.getUndynamaxedHP() <= maxhp / 2 && originalHP > maxhp / 2) {
					this.runEvent('EmergencyExit', pokemon);
				}
			}
		}

		if (action.choice === 'runSwitch') {
			const pokemon = action.pokemon;
			if (pokemon.hp && pokemon.hp <= pokemon.maxhp / 2 && pokemonOriginalHP! > pokemon.maxhp / 2) {
				this.runEvent('EmergencyExit', pokemon);
			}
		}

		const switches = this.sides.map(
			side => side.active.some(pokemon => pokemon && !!pokemon.switchFlag)
		);

		for (let i = 0; i < this.sides.length; i++) {
			let reviveSwitch = false; // Used to ignore the fake switch for Revival Blessing
			if (switches[i] && !this.canSwitch(this.sides[i])) {
				for (const pokemon of this.sides[i].active) {
					if (this.sides[i].slotConditions[pokemon.position]['revivalblessing']) {
						reviveSwitch = true;
						continue;
					}
					pokemon.switchFlag = false;
				}
				if (!reviveSwitch) switches[i] = false;
			} else if (switches[i]) {
				for (const pokemon of this.sides[i].active) {
					if (pokemon.switchFlag && pokemon.switchFlag !== 'revivalblessing' && !pokemon.skipBeforeSwitchOutEventFlag) {
						this.runEvent('BeforeSwitchOut', pokemon);
						pokemon.skipBeforeSwitchOutEventFlag = true;
						this.faintMessages(); // Pokemon may have fainted in BeforeSwitchOut
						if (this.ended) return true;
						if (pokemon.fainted) {
							switches[i] = this.sides[i].active.some(sidePokemon => sidePokemon && !!sidePokemon.switchFlag);
						}
					}
				}
			}
		}

		for (const playerSwitch of switches) {
			if (playerSwitch) {
				this.makeRequest('switch');
				return true;
			}
		}

		if (this.gen < 5) this.eachEvent('Update');

		const nextAction = this.queue.peek();
		if (this.gen >= 8 &&
			// @ts-expect-error modded
			(nextAction?.choice === 'move' || nextAction?.choice === 'runDynamax') && !nextAction?.sorted) {
			// In gen 8, speed is updated dynamically so update the queue's speed properties and sort it.
			this.updateSpeed();
			for (const queueAction of this.queue.list) {
				if (queueAction.pokemon) this.getActionSpeed(queueAction);
			}
			this.queue.sort();
		}

		return false;
	},
	resolveTargetLoc(targetLoc: number, action: Action, move: ActiveMove) {
		const isValidTarget = this.validTargetLoc(targetLoc, action.pokemon!, move.target);
		if (isValidTarget) return targetLoc;
		const randomTarget = this.getRandomTarget(action.pokemon!, move);
		if (!randomTarget) return targetLoc;
		return action.pokemon!.getLocOf(randomTarget);
	},
	actions: {
		runMove(moveOrMoveName, pokemon, targetLoc, options) {
			pokemon.activeMoveActions++;
			const zMove = options?.zMove;
			const maxMove = options?.maxMove;
			const externalMove = options?.externalMove;
			const originalTarget = options?.originalTarget;
			let sourceEffect = options?.sourceEffect;
			let target = this.battle.getTarget(pokemon, maxMove || zMove || moveOrMoveName, targetLoc, originalTarget);
			let baseMove = this.dex.getActiveMove(moveOrMoveName);
			const priority = baseMove.priority;
			const pranksterBoosted = baseMove.pranksterBoosted;
			if (baseMove.id !== 'struggle' && !zMove && !maxMove && !externalMove) {
				const changedMove = this.battle.runEvent('OverrideAction', pokemon, target, baseMove);
				if (changedMove && changedMove !== true) {
					baseMove = this.dex.getActiveMove(changedMove);
					baseMove.priority = priority;
					if (pranksterBoosted) baseMove.pranksterBoosted = pranksterBoosted;
					target = this.battle.getRandomTarget(pokemon, baseMove);
				}
			}
			let move = baseMove;
			if (zMove) {
				move = this.getActiveZMove(baseMove, pokemon);
			} else if (maxMove) {
				move = this.getActiveMaxMove(baseMove, pokemon);
			}

			move.isExternal = externalMove;

			this.battle.setActiveMove(move, pokemon, target);

			/* if (pokemon.moveThisTurn) {
				// THIS IS PURELY A SANITY CHECK
				// DO NOT TAKE ADVANTAGE OF THIS TO PREVENT A POKEMON FROM MOVING;
				// USE this.queue.cancelMove INSTEAD
				this.battle.debug(`${pokemon.id} INCONSISTENT STATE, ALREADY MOVED: ${pokemon.moveThisTurn}`);
				this.battle.clearActiveMove(true);
				return;
			} */
			const willTryMove = this.battle.runEvent('BeforeMove', pokemon, target, move);
			if (!willTryMove) {
				this.battle.runEvent('MoveAborted', pokemon, target, move);
				this.battle.clearActiveMove(true);
				// The event 'BeforeMove' could have returned false or null
				// false indicates that this counts as a move failing for the purpose of calculating Stomping Tantrum's base power
				// null indicates the opposite, as the Pokemon didn't have an option to choose anything
				pokemon.moveThisTurnResult = willTryMove;
				return;
			}

			// Used exclusively for a hint later
			if (move.flags['cantusetwice'] && pokemon.lastMove?.id === move.id) {
				pokemon.addVolatile(move.id);
			}

			if (move.beforeMoveCallback) {
				if (move.beforeMoveCallback.call(this.battle, pokemon, target, move)) {
					this.battle.clearActiveMove(true);
					pokemon.moveThisTurnResult = false;
					return;
				}
			}
			pokemon.lastDamage = 0;
			let lockedMove;
			if (!externalMove) {
				lockedMove = this.battle.runEvent('LockMove', pokemon);
				if (lockedMove === true) lockedMove = false;
				if (!lockedMove) {
					if (!pokemon.deductPP(baseMove, null, target) && (move.id !== 'struggle')) {
						this.battle.add('cant', pokemon, 'nopp', move);
						this.battle.clearActiveMove(true);
						pokemon.moveThisTurnResult = false;
						return;
					}
				} else {
					sourceEffect = this.dex.conditions.get('lockedmove');
				}
				pokemon.moveUsed(move, targetLoc);
			}

			// Dancer Petal Dance hack
			// TODO: implement properly
			const noLock = externalMove && !pokemon.volatiles['lockedmove'];

			if (zMove) {
				if (pokemon.illusion) {
					this.battle.singleEvent('End', this.dex.abilities.get('Illusion'), pokemon.abilityState, pokemon);
				}
				this.battle.add('-zpower', pokemon);
				pokemon.side.zMoveUsed = true;
			}

			const oldActiveMove = move;

			const moveDidSomething = this.useMove(baseMove, pokemon, { target, sourceEffect, zMove, maxMove });
			this.battle.lastSuccessfulMoveThisTurn = moveDidSomething ? this.battle.activeMove && this.battle.activeMove.id : null;
			if (this.battle.activeMove) move = this.battle.activeMove;
			this.battle.singleEvent('AfterMove', move, null, pokemon, target, move);
			this.battle.runEvent('AfterMove', pokemon, target, move);
			if (move.flags['cantusetwice'] && pokemon.removeVolatile(move.id)) {
				this.battle.add('-hint', `Some effects can force a Pokemon to use ${move.name} again in a row.`);
			}

			// TODO: Refactor to use BattleQueue#prioritizeAction in onAnyAfterMove handlers
			// Dancer's activation order is completely different from any other event, so it's handled separately
			if (move.flags['dance'] && moveDidSomething && !move.isExternal) {
				const dancers = [];
				for (const currentPoke of this.battle.getAllActive()) {
					if (pokemon === currentPoke) continue;
					if (currentPoke.hasAbility('dancer') && !currentPoke.isSemiInvulnerable()) {
						dancers.push(currentPoke);
					}
				}
				// Dancer activates in order of lowest speed stat to highest
				// Note that the speed stat used is after any volatile replacements like Speed Swap,
				// but before any multipliers like Agility or Choice Scarf
				// Ties go to whichever Pokemon has had the ability for the least amount of time
				dancers.sort(
					(a, b) => -(b.storedStats['spe'] - a.storedStats['spe']) || b.abilityState.effectOrder - a.abilityState.effectOrder
				);
				const targetOf1stDance = this.battle.activeTarget!;
				for (const dancer of dancers) {
					if (this.battle.faintMessages()) break;
					if (dancer.fainted) continue;
					this.battle.add('-activate', dancer, 'ability: Dancer');
					const dancersTarget = !targetOf1stDance.isAlly(dancer) && pokemon.isAlly(dancer) ?
						targetOf1stDance :
						pokemon;
					const dancersTargetLoc = dancer.getLocOf(dancersTarget);
					this.runMove(move.id, dancer, dancersTargetLoc, { sourceEffect: this.dex.abilities.get('dancer'), externalMove: true });
				}
			}
			if (noLock && pokemon.volatiles['lockedmove']) delete pokemon.volatiles['lockedmove'];
			this.battle.faintMessages();
			this.battle.checkWin();

			if (this.battle.gen <= 4) {
				// In gen 4, the outermost move is considered the last move for Copycat
				this.battle.activeMove = oldActiveMove;
			}
		},
		canMegaEvo(pokemon) {
			if (pokemon.species.isMega) return null;

			const item = pokemon.getItem();
			if (!item.megaStone) return null;
			return Object.values(item.megaStone)[0];
		},
		runMegaEvo(pokemon) {
			if (pokemon.species.isMega) return false;

			const species: Species = (this as any).getMixedSpecies(pokemon.m.originalSpecies, pokemon.canMegaEvo, pokemon);

			/* Do we have a proper sprite for it? Code for when megas actually exist
			if (this.dex.species.get(pokemon.canMegaEvo!).baseSpecies === pokemon.m.originalSpecies) {
				pokemon.formeChange(species, pokemon.getItem(), true);
			} else { */
			const oSpecies = this.dex.species.get(pokemon.m.originalSpecies);
			const oMegaSpecies = this.dex.species.get((species as any).originalSpecies);
			pokemon.formeChange(species, pokemon.getItem(), true);
			this.battle.add('-start', pokemon, oMegaSpecies.requiredItem, '[silent]');
			if (oSpecies.types.join('/') !== pokemon.species.types.join('/')) {
				this.battle.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]', '[from] format: Mix and Mega');
			}
			// }

			pokemon.canMegaEvo = false;
			return true;
		},
		terastallize(pokemon) {
			if (pokemon.illusion?.species.baseSpecies === 'Ogerpon') {
				this.battle.singleEvent('End', this.dex.abilities.get('Illusion'), pokemon.abilityState, pokemon);
			}
			if (pokemon.illusion?.species.baseSpecies === 'Terapagos') {
				this.battle.singleEvent('End', this.dex.abilities.get('Illusion'), pokemon.abilityState, pokemon);
			}

			let type = pokemon.teraType;
			if (pokemon.species.baseSpecies !== 'Ogerpon' && pokemon.getItem().name.endsWith('Mask')) {
				type = this.dex.species.get(pokemon.getItem().forcedForme).requiredTeraType!;
			}
			this.battle.add('-terastallize', pokemon, type);
			pokemon.terastallized = type;
			for (const ally of pokemon.side.pokemon) {
				ally.canTerastallize = null;
			}
			pokemon.addedType = '';
			pokemon.knownType = true;
			pokemon.apparentType = type;
			if (pokemon.species.baseSpecies === 'Ogerpon') {
				const tera = pokemon.species.id === 'ogerpon' ? 'tealtera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, pokemon.getItem(), true);
			} else {
				if (pokemon.getItem().name.endsWith('Mask')) {
					const species: Species = (this as any).getMixedSpecies(pokemon.m.originalSpecies,
						pokemon.getItem().forcedForme! + '-Tera', pokemon);
					const oSpecies = this.dex.species.get(pokemon.m.originalSpecies);
					const originalTeraSpecies = this.dex.species.get((species as any).originalSpecies);
					pokemon.formeChange(species, pokemon.getItem(), true);
					this.battle.add('-start', pokemon, originalTeraSpecies.requiredItem, '[silent]');
					if (oSpecies.types.length !== pokemon.species.types.length || oSpecies.types[1] !== pokemon.species.types[1]) {
						this.battle.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
					}
				}
			}
			if (pokemon.species.name === 'Terapagos-Terastal' && type === 'Stellar') {
				pokemon.formeChange('Terapagos-Stellar', null, true);
			}
			this.battle.runEvent('AfterTerastallization', pokemon);
		},
		getMixedSpecies(originalForme, formeChange, pokemon) {
			const originalSpecies = this.dex.species.get(originalForme);
			const formeChangeSpecies = this.dex.species.get(formeChange);
			if (originalSpecies.baseSpecies === formeChangeSpecies.baseSpecies &&
				!formeChangeSpecies.isMega && !formeChangeSpecies.isPrimal) {
				return formeChangeSpecies;
			}
			const deltas = (this as any).getFormeChangeDeltas(formeChangeSpecies, pokemon);
			const species = (this as any).mutateOriginalSpecies(originalSpecies, deltas);
			return species;
		},
		getFormeChangeDeltas(formeChangeSpecies, pokemon) {
			// Should be fine as long as Necrozma-U doesn't get added or Game Freak makes me sad with some convoluted forme change
			let baseSpecies = this.dex.species.get(formeChangeSpecies.isMega ?
				formeChangeSpecies.battleOnly as string : formeChangeSpecies.baseSpecies);
			if (formeChangeSpecies.name === 'Zygarde-Mega') {
				baseSpecies = this.dex.species.get('Zygarde-Complete');
			}
			const deltas: {
				ability: string,
				baseStats: SparseStatsTable,
				weighthg: number,
				heightm: number,
				originalSpecies: string,
				requiredItem: string | undefined,
				type?: string,
				formeType?: string,
				isMega?: boolean,
			} = {
				ability: formeChangeSpecies.abilities['0'],
				baseStats: {},
				weighthg: formeChangeSpecies.weighthg - baseSpecies.weighthg,
				heightm: ((formeChangeSpecies.heightm * 10) - (baseSpecies.heightm * 10)) / 10,
				originalSpecies: formeChangeSpecies.name,
				requiredItem: formeChangeSpecies.requiredItem,
			};
			let statId: StatID;
			for (statId in formeChangeSpecies.baseStats) {
				deltas.baseStats[statId] = formeChangeSpecies.baseStats[statId] - baseSpecies.baseStats[statId];
			}
			let formeType: string | null = null;
			if (['Arceus', 'Silvally'].includes(baseSpecies.name)) {
				deltas.type = formeChangeSpecies.types[0];
				formeType = 'Primary';
			} else if (formeChangeSpecies.types.length > baseSpecies.types.length) {
				deltas.type = formeChangeSpecies.types[1];
			} else if (formeChangeSpecies.types.length < baseSpecies.types.length) {
				deltas.type = this.battle.ruleTable.has('mixandmegaoldaggronite') ? 'mono' : baseSpecies.types[0];
			} else if (formeChangeSpecies.types[1] !== baseSpecies.types[1]) {
				deltas.type = formeChangeSpecies.types[1];
			} else if (formeChangeSpecies.types[0] !== baseSpecies.types[0]) {
				deltas.type = formeChangeSpecies.types[0];
				formeType = 'Primary';
				deltas.isMega = true;
			}
			if (formeChangeSpecies.isMega && !formeType) formeType = 'Mega';
			if (formeChangeSpecies.isPrimal) formeType = 'Primal';
			if (formeChangeSpecies.name.endsWith('Crowned')) formeType = 'Crowned';
			if (formeType) deltas.formeType = formeType;
			if (!deltas.formeType && formeChangeSpecies.abilities['H'] &&
				pokemon && pokemon.baseSpecies.abilities['H'] === pokemon.getAbility().name) {
				deltas.ability = formeChangeSpecies.abilities['H'];
			}
			return deltas;
		},
		mutateOriginalSpecies(speciesOrForme, deltas) {
			if (!deltas) throw new TypeError("Must specify deltas!");
			const species = this.dex.deepClone(this.dex.species.get(speciesOrForme));
			species.abilities = { '0': deltas.ability };
			if (deltas.formeType === 'Primary') {
				const secondType = species.types[1];
				species.types = [deltas.type];
				if (secondType && secondType !== deltas.type) species.types.push(secondType);
			} else if (species.types[0] === deltas.type) {
				species.types = [deltas.type];
			} else if (deltas.type === 'mono') {
				species.types = [species.types[0]];
			} else if (deltas.type) {
				species.types = [species.types[0], deltas.type];
			}
			const baseStats = species.baseStats;
			for (const statName in baseStats) {
				baseStats[statName] = this.battle.clampIntRange(baseStats[statName] + deltas.baseStats[statName], 1, 255);
			}
			species.weighthg = Math.max(1, species.weighthg + deltas.weighthg);
			species.heightm = Math.max(0.1, ((species.heightm * 10) + (deltas.heightm * 10)) / 10);
			species.originalSpecies = deltas.originalSpecies;
			species.requiredItem = deltas.requiredItem;
			if (deltas.formeType === 'Mega' || deltas.isMega) species.isMega = true;
			if (deltas.formeType === 'Primal') species.isPrimal = true;
			return species;
		},
	},
	queue: {
		resolveAction(action, midTurn = false) {
			if (!action) throw new Error(`Action not passed to resolveAction`);
			if (action.choice === 'pass') return [];
			const actions = [action];

			if (!action.side && action.pokemon) action.side = action.pokemon.side;
			if (!action.move && action.moveid) action.move = this.battle.dex.getActiveMove(action.moveid);
			if (!action.order) {
				const orders: { [choice: string]: number } = {
					team: 1,
					start: 2,
					instaswitch: 3,
					beforeTurn: 4,
					beforeTurnMove: 5,
					revivalblessing: 6,

					runSwitch: 101,
					switch: 103,
					megaEvo: 104,
					megaEvoX: 104,
					megaEvoY: 104,
					runDynamax: 105,
					terastallize: 106,
					priorityChargeMove: 107,

					shift: 200,
					// default is 200 (for moves)

					residual: 300,
				};
				if (action.choice in orders) {
					action.order = orders[action.choice];
				} else {
					action.order = 200;
					if (!['move', 'event'].includes(action.choice)) {
						throw new Error(`Unexpected orderless action ${action.choice}`);
					}
				}
			}
			if (!midTurn) {
				if (action.choice === 'move') {
					if (!action.maxMove && !action.zmove && action.move.beforeTurnCallback) {
						actions.unshift(...this.resolveAction({
							choice: 'beforeTurnMove', pokemon: action.pokemon, move: action.move, targetLoc: action.targetLoc,
						}));
					}
					if (action.mega && !action.pokemon.isSkyDropped()) {
						actions.unshift(...this.resolveAction({
							choice: 'megaEvo',
							pokemon: action.pokemon,
						}));
					}
					if (action.megax && !action.pokemon.isSkyDropped()) {
						actions.unshift(...this.resolveAction({
							choice: 'megaEvoX',
							pokemon: action.pokemon,
						}));
					}
					if (action.megay && !action.pokemon.isSkyDropped()) {
						actions.unshift(...this.resolveAction({
							choice: 'megaEvoY',
							pokemon: action.pokemon,
						}));
					}
					if (action.terastallize && !action.pokemon.terastallized) {
						actions.unshift(...this.resolveAction({
							choice: 'terastallize',
							pokemon: action.pokemon,
						}));
					}
					if (action.maxMove && !action.pokemon.volatiles['dynamax']) {
						actions.unshift(...this.resolveAction({
							choice: 'runDynamax',
							pokemon: action.pokemon,
						}));
					}
					if (!action.maxMove && !action.zmove && action.move.priorityChargeCallback) {
						actions.unshift(...this.resolveAction({
							choice: 'priorityChargeMove',
							pokemon: action.pokemon,
							move: action.move,
						}));
					}
					action.fractionalPriority = this.battle.runEvent('FractionalPriority', action.pokemon, null, action.move, 0);
					const linkedMoves: [ActiveMove, ActiveMove] = action.pokemon.getLinkedMoves();
					if (
						linkedMoves.length &&
						!action.pokemon.getWillLockMove!() &&
						!action.pokemon.getIsMoveLocked!() &&
						!action.zmove && !action.maxMove
					) {
						const decisionMove = this.battle.toID(action.move);
						if (linkedMoves.some(x => x.id === decisionMove)) {
							action.linked = linkedMoves;
							action.linkedTargets = [];
							for (const move of linkedMoves) {
								// @ts-expect-error modded
								const targetLoc = this.battle.resolveTargetLoc(action.targetLoc, action, move);
								action.linkedTargets.push(action.pokemon.getAtLoc(targetLoc));
							}
							const linkedOtherIndex = 1 - linkedMoves.findIndex(x => x.id === decisionMove);
							const linkedOtherMove = action.linked[linkedOtherIndex];
							if (linkedOtherMove.beforeTurnCallback) {
								this.addChoice({
									choice: 'beforeTurnMove',
									pokemon: action.pokemon,
									move: linkedOtherMove,
									targetLoc: action.linkedTargets[linkedOtherIndex],
								});
							}
							if (linkedOtherMove.priorityChargeCallback) {
								this.addChoice({
									choice: 'priorityChargeMove',
									pokemon: action.pokemon,
									move: linkedOtherMove,
									targetLoc: action.linkedTargets[linkedOtherIndex],
								});
							}
						}
					}
				} else if (['switch', 'instaswitch'].includes(action.choice)) {
					if (typeof action.pokemon.switchFlag === 'string') {
						action.sourceEffect = this.battle.dex.moves.get(action.pokemon.switchFlag as ID) as any;
					}
					action.pokemon.switchFlag = false;
				}
			}

			const deferPriority = this.battle.gen === 7 && action.mega && action.mega !== 'done';
			if (action.move) {
				let target = null;
				action.move = this.battle.dex.getActiveMove(action.move);

				if (!action.targetLoc) {
					target = this.battle.getRandomTarget(action.pokemon, action.move);
					// TODO: what actually happens here?
					if (target) action.targetLoc = action.pokemon.getLocOf(target);
				}
				action.originalTarget = action.pokemon.getAtLoc(action.targetLoc);
			}
			if (!deferPriority) this.battle.getActionSpeed(action);
			return actions as any;
		},
	},
	pokemon: {
		moveUsed(move, targetLoc) {
			this.lastMove = move;
			this.moveThisTurn = move.id;
			this.lastMoveTargetLoc = targetLoc;
		},
		getLinkedMoves(ignoreDisabled) {
			const linkedMoves = this.moveSlots.slice(0, 2);
			if (linkedMoves.length !== 2 || linkedMoves[0].pp <= 0 || linkedMoves[1].pp <= 0) return [];
			const ret: [ActiveMove, ActiveMove] = [
				this.battle.dex.getActiveMove(linkedMoves[0].id), this.battle.dex.getActiveMove(linkedMoves[1].id),
			];
			if (ignoreDisabled) return ret;
			if (!this.ateBerry && ret.some(x => x.id === 'belch')) return [];
			if (this.hasItem('assaultvest') && (ret[0].category === 'Status' || ret[1].category === 'Status')) {
				return [];
			}
			return ret;
		},
		hasLinkedMove(move) {
			// @ts-expect-error modded
			const linkedMoves: [ActiveMove, ActiveMove] = this.getLinkedMoves!(true);
			if (!linkedMoves.length) return false;
			return linkedMoves.some(x => x.id === move.id);
		},
		getIsMoveLocked() {
			// Detects active Outrage.
			return !!this.volatiles['choicelock'] || !!this.volatiles['lockedmove'];
		},
		getWillLockMove() {
			// Ignores Outrage, etc, since they can miss.
			return this.hasItem(['choiceband', 'choicescarf', 'choicespecs']) || this.hasAbility('gorillatactics');
		},
		getCanLinkMove(move) {
			// @ts-expect-error modded
			return !move.isZ && !move.isMax && !this.getWillLockMove() && !this.getIsMoveLocked();
		},
		queryLinkMove(move, ignoreDisabled) {
			// @ts-expect-error modded
			const linkedMoves: [ActiveMove, ActiveMove] = this.getLinkedMoves!(ignoreDisabled);
			if (!linkedMoves.length) return { linkIndex: -1, linkedMoves };
			return { linkIndex: linkedMoves.findIndex(x => x.id === move.id), linkedMoves };
		},
	},
};
