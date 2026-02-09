// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts
/*
If you want to add custom formats, create a file in this folder named: "custom-formats.ts"

Paste the following code into the file and add your desired formats and their sections between the brackets:
--------------------------------------------------------------------------------
// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts

export const Formats: FormatList = [
];
--------------------------------------------------------------------------------

If you specify a section that already exists, your format will be added to the bottom of that section.
New sections will be added to the bottom of the specified column.
The column value will be ignored for repeat sections.
*/

export const Formats: import('../sim/dex-formats').FormatList = [

	// Do Not Use
	///////////////////////////////////////////////////////////////////

	{
		section: "Do Not Use",
	},
	{
		name: "[Gen 9] Do Not Use",
		desc: "<b>Do Not Use</b>: A National Dex metagame where only Pokemon with 280 BST or less are allowed.",
		mod: "gen9dnu",
		ruleset: ['Standard NatDex', 'Mega Rayquaza Clause', 'Terastal Clause', 'Z-Move Clause'],
		banlist: ['Vanilla', 'DNU AG', 'DNU Uber', 'Huge Power', 'Pure Power', 'Shadow Tag', 'Arena Trap', 'Baton Pass', 'Moody', 'Cute Charm', 'Hustle'],
		unbanlist: ['Assist'],
	},
	{
		name: "[Gen 9] Do Not Use UU",
		mod: "gen9dnu",
		ruleset: ['Standard NatDex', 'Mega Rayquaza Clause', 'Terastal Clause', 'Z-Move Clause'],
		banlist: ['Vanilla', 'DNU AG', 'DNU Uber', 'DNU OU', 'DNU UUBL', 'Huge Power', 'Pure Power', 'Shadow Tag', 'Arena Trap', 'Baton Pass', 'Moody', 'Cute Charm', 'Hustle'],
		unbanlist: ['Assist'],
	},
	{
		name: "[Gen 9] Do Not Use RU",
		mod: "gen9dnu",
		ruleset: ['Standard NatDex', 'Mega Rayquaza Clause', 'Terastal Clause', 'Z-Move Clause'],
		banlist: ['Vanilla', 'DNU AG', 'DNU Uber', 'DNU OU', 'DNU UUBL', 'DNU UU', 'DNU RUBL', 'Huge Power', 'Pure Power', 'Shadow Tag', 'Arena Trap', 'Baton Pass', 'Moody', 'Cute Charm', 'Hustle'],
		unbanlist: ['Assist', 'DNU RU'],
	},
	{
		name: "[Gen 9] Do Not Use VGC",
		mod: "gen9dnu",
		gameType: 'doubles',
		ruleset: ['Standard Doubles', 'NatDex Mod', 'Item Clause = 1', 'Adjust Level = 50', 'Picked Team Size = 4', 'VGC Timer', 'Force Open Team Sheets', 'Terastal Clause', 'Z-Move Clause', 'Best of = 3', 'Limit One Restricted', '!OHKO Clause', '!Evasion Moves Clause', '!Gravity Sleep Clause'],
		restricted: ['Cottonee', 'Dewpider', 'Diglett-Alola', 'Flittle', 'Nidoran-M', 'Wattrel', 'Wingull', 'Zigzagoon'],
		banlist: ['Vanilla Doubles', 'Huge Power', 'Pure Power'],
		unbanlist: ['Assist'],
	},
	{
		section: "Do Not Use OMs",
	},
	{
		name: "[Gen 9] Do Not Use AG",
		mod: "gen9dnu",
		ruleset: ['Standard AG', 'NatDex Mod'],
	},
	{
		name: "[Gen 9] Do Not Use Ubers",
		mod: "gen9dnu",
		ruleset: ['Standard NatDex', '!Evasion Clause', 'Evasion Moves Clause', 'Evasion Items Clause', 'Mega Rayquaza Clause', 'Terastal Clause', 'Z-Move Clause'],
		banlist: ['Vanilla', 'DNU AG', 'Huge Power', 'Pure Power', 'Baton Pass'],
		unbanlist: ['Assist', 'DNU Uber', 'DNU OU', 'DNU UUBL', 'DNU UU', 'DNU RUBL', 'DNU RU'],
	},
	{
		name: "[Gen 9] Do Not Use Legacy",
		mod: "gen9dnulegacy",
		ruleset: ['Standard NatDex', 'Mega Rayquaza Clause', 'Terastal Clause', 'Z-Move Clause'],
		banlist: ['Vanilla', 'Huge Power', 'Pure Power', 'Shadow Tag', 'Arena Trap', 'Baton Pass', 'Moody'],
	},
	{
		name: "[Gen 9] Do Not Use RU Legacy",
		mod: "gen9dnulegacy",
		ruleset: ['Standard NatDex', 'Mega Rayquaza Clause', 'Terastal Clause', 'Z-Move Clause'],
		banlist: ['Vanilla', 'DNU OU', 'DNU UUBL', 'DNU UU', 'DNU RUBL', 'Huge Power', 'Pure Power', 'Shadow Tag', 'Arena Trap', 'Baton Pass', 'Moody'],
	},
	{
		section: "Other Solomods",
	},
	{
		name: "[Gen 9] Caveman Used",
		mod: "gen9cmu",
		ruleset: ['Standard AG', 'NatDex Mod', 'Godly Gift Mod', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Evasion Abilities Clause', 'Evasion Items Clause', 'Evasion Moves Clause', 'Overflow Stat Mod', 'Sleep Moves Clause', 'Terastal Clause', 'Mega Rayquaza Clause'],
		banlist: ['Power Construct', 'Arena Trap', 'Huge Power', 'Moody', 'Pure Power', 'Shadow Tag', 'Assist', 'Baton Pass', 'Last Respects', 'Shed Tail'],
		restricted: ['CMU Lord'],
	},
	{
		name: "[Gen 9] Natalie Used",
		mod: "gen9natu",
		gameType: 'doubles',
		ruleset: ['Standard Draft', 'Adjust Level = 50', 'Max Team Size = 8', 'Picked Team Size = 6',
			'Force Open Team Sheets', '+Unobtainable', '+Past', 'Min Source Gen = 1', 'Rellor Clause',
			'Paralysis Clause', 'Power Plant Clause', 'Kyurem Ball Clause', 'Baton Pass Two Clause', 'Z-Move Clause',
			'Terastal Clause', 'Pdon Status Clause'],
		banlist: ['Vanilla', 'Copycat', 'Toxic', 'Last Respects', 'Substitute', 'NatU Ubers', 'U-Turn'],
	},
	{
		name: "[Gen 9] Regional Variants Cup",
		mod: "gen9rvc",
		teraPreviewDefault: true,
		ruleset: ['Standard Draft', '+Unobtainable', '+Past', 'Min Source Gen = 1'],
		banlist: ['Vanilla', 'Gorilla Tactics', 'Last Respects'],
	},
	{
		name: "[Gen 8] First Gym Used",
		mod: "gen8fgu",
		banlist: ['Vanilla'],
	},
	{
		section: "Three Musketeers Draft",
	},
	{
		name: "[Gen 9] Three Musketeers Draft Week 3",
		mod: "gen93m",
		gameType: 'doubles',
		ruleset: ['Standard Doubles', 'NatDex Mod', 'Item Clause = 1', 'Adjust Level = 50', 'Picked Team Size = 4', 'VGC Timer', 'Terastal Clause', 'Best of = 3', '!Evasion Moves Clause', '!Gravity Sleep Clause', 'Evasion Clause', 'DryPass Clause', 'Sleep Clause Mod'],
		banlist: ['Vanilla', 'Last Respects', 'Moody', 'Quick Claw', 'King\'s Rock', 'Razor Fang', 'Shed Tail'],
	},
	{
		name: "[Gen 9] Three Musketeers Draft Week 4",
		desc: `Put an attacking move in the item slot to have all of a Pok&eacute;mon's attacks inherit its properties.`,
		mod: 'gen93m',
		searchShow: false,
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Dry Pass Clause'],
		banlist: [
			'Arena Trap', 'Moody', 'Serene Grace', 'Shadow Tag', 'Damp Rock', 'Heat Rock', 'Light Clay', 'Baton Pass',
			'Beat Up', 'Fake Out', 'Last Respects', 'move:Metronome', 'Shed Tail',
		],
		restricted: [
			'Doom Desire', 'Dynamic Punch', 'Electro Ball', 'Explosion', 'Gyro Ball', 'Final Gambit', 'Flail', 'Flip Turn', 'Fury Cutter', 'Future Sight', 'Grass Knot',
			'Grassy Glide', 'Hard Press', 'Heavy Slam', 'Heat Crash', 'Inferno', 'Low Kick', 'Misty Explosion', 'Nuzzle', 'Power Trip', 'Reversal', 'Self-Destruct',
			'Spit Up', 'Stored Power', 'Tera Blast', 'U-turn', 'Weather Ball', 'Zap Cannon',
		],
		onValidateTeam(team) {
			const itemTable = new Set<string>();
			for (const set of team) {
				const forte = this.toID(set.item);
				if (!forte) continue;
				const move = this.dex.moves.get(forte);
				if (move.exists && move.id !== 'metronome') {
					if (itemTable.has(forte)) {
						return [
							`You are limited to one of each move in the item slot per team.`,
							`(You have more than one ${move.name}.)`,
						];
					}
					itemTable.add(forte);
				}
			}
		},
		validateSet(set, teamHas) {
			const item = set.item;
			const species = this.dex.species.get(set.species);
			const move = this.dex.moves.get(item);
			if (!move.exists || move.id === 'metronome' || move.category === 'Status') {
				return this.validateSet(set, teamHas);
			}
			set.item = '';
			const problems = this.validateSet(set, teamHas) || [];
			set.item = item;
			if (this.checkCanLearn(move, species, this.allSources(species), set)) {
				problems.push(`${species.name} can't learn ${move.name}.`);
			}
			if (set.moves.map(this.toID).includes(move.id)) {
				problems.push(`Moves in the item slot can't be in the moveslots as well.`);
			}
			if (this.ruleTable.has(`-move:${move.id}`)) {
				problems.push(`The move ${move.name} is fully banned.`);
			}
			const accuracyLoweringMove =
				move.secondaries?.some(secondary => secondary.boosts?.accuracy && secondary.boosts?.accuracy < 0);
			const flinchMove = move.secondaries?.some(secondary => secondary.volatileStatus === 'flinch');
			const freezeMove = move.secondaries?.some(secondary => secondary.status === 'frz') || move.id === 'triattack';
			if (
				this.ruleTable.isRestricted(`move:${move.id}`) ||
				((accuracyLoweringMove || move.ohko || move.multihit || move.id === 'beatup' || move.flags['charge'] ||
						move.priority > 0 || move.damageCallback || flinchMove || freezeMove) &&
					!this.ruleTable.has(`+move:${move.id}`))
			) {
				problems.push(`The move ${move.name} can't be used as an item.`);
			}
			return problems.length ? problems : null;
		},
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				const move = this.dex.getActiveMove(pokemon.set.item);
				if (move.exists && move.category !== 'Status') {
					pokemon.m.forte = move;
					pokemon.item = 'mail' as ID;
				}
			}
		},
		onModifyMovePriority: 1,
		onModifyMove(move, pokemon, target) {
			const forte: ActiveMove = pokemon.m.forte;
			if (move.category !== 'Status' && forte) {
				move.flags = { ...move.flags, ...forte.flags };
				if (forte.self) {
					if (forte.self.onHit && move.self?.onHit) {
						for (const i in forte.self) {
							if (i.startsWith('onHit')) continue;
							(move.self as any)[i] = (forte.self as any)[i];
						}
					} else {
						move.self = { ...move.self, ...forte.self };
					}
				}
				if (forte.selfBoost?.boosts) {
					if (!move.selfBoost?.boosts) move.selfBoost = { boosts: {} };
					let boostid: BoostID;
					for (boostid in forte.selfBoost.boosts) {
						if (!move.selfBoost.boosts![boostid]) move.selfBoost.boosts![boostid] = 0;
						move.selfBoost.boosts![boostid]! += forte.selfBoost.boosts[boostid]!;
					}
				}
				if (forte.secondaries) {
					move.secondaries = [...(move.secondaries || []), ...forte.secondaries];
				}
				move.critRatio = (move.critRatio || 1) + (forte.critRatio || 1) - 1;
				const VALID_PROPERTIES = [
					'alwaysHit', 'basePowerCallback', 'breaksProtect', 'drain', 'forceSTAB', 'forceSwitch', 'hasCrashDamage', 'hasSheerForce',
					'ignoreAbility', 'ignoreAccuracy', 'ignoreDefensive', 'ignoreEvasion', 'ignoreImmunity', 'mindBlownRecoil', 'noDamageVariance',
					'ohko', 'overrideDefensivePokemon', 'overrideDefensiveStat', 'overrideOffensivePokemon', 'overrideOffensiveStat', 'pseudoWeather',
					'recoil', 'selfdestruct', 'selfSwitch', 'sleepUsable', 'smartTarget', 'stealsBoosts', 'thawsTarget', 'volatileStatus', 'willCrit',
				] as const;
				for (const property of VALID_PROPERTIES) {
					if (forte[property]) {
						move[property] = forte[property] as any;
					}
				}
				// Added here because onEffectiveness doesn't have an easy way to reference the source
				if (forte.onEffectiveness) {
					move.onEffectiveness = function (typeMod, t, type, m) {
						return forte.onEffectiveness!.call(this, typeMod, t, type, m);
					};
				}
				forte.onModifyMove?.call(this, move, pokemon, target);
			}
		},
		onModifyPriority(priority, source, target, move) {
			const forte = source?.m.forte;
			if (move.category !== 'Status' && forte) {
				if (source.hasAbility('Triage') && forte.flags['heal']) {
					return priority + (move.flags['heal'] ? 0 : 3);
				}
				return priority + forte.priority;
			}
		},
		onModifyTypePriority: 1,
		onModifyType(move, pokemon, target) {
			const forte = pokemon.m.forte;
			if (move.category !== 'Status' && forte) {
				this.singleEvent('ModifyType', forte, null, pokemon, target, move, move);
			}
		},
		onHitPriority: 1,
		onHit(target, source, move) {
			const forte = source.m.forte;
			if (move?.category !== 'Status' && forte) {
				this.singleEvent('Hit', forte, {}, target, source, move);
				if (forte.self) this.singleEvent('Hit', forte.self, {}, source, source, move);
				this.singleEvent('AfterHit', forte, {}, target, source, move);
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			const forte = source.m.forte;
			if (move?.category !== 'Status' && forte) {
				this.singleEvent('AfterSubDamage', forte, null, target, source, move, damage);
			}
		},
		onModifySecondaries(secondaries, target, source, move) {
			if (secondaries.some(s => !!s.self)) move.selfDropped = false;
		},
		onAfterMoveSecondaryPriority: 1,
		onAfterMoveSecondarySelf(source, target, move) {
			const forte = source.m.forte;
			if (move?.category !== 'Status' && forte) {
				this.singleEvent('AfterMoveSecondarySelf', forte, null, source, target, move);
			}
		},
		onBasePowerPriority: 1,
		onBasePower(basePower, source, target, move) {
			const forte = source.m.forte;
			if (move.category !== 'Status' && forte?.onBasePower) {
				forte.onBasePower.call(this, basePower, source, target, move);
			}
		},
		pokemon: {
			getItem() {
				const move = this.battle.dex.moves.get(this.m.forte);
				if (!move.exists) return Object.getPrototypeOf(this).getItem.call(this);
				return {
					...this.battle.dex.items.get('mail'),
					name: move.name, id: move.id, ignoreKlutz: true, onTakeItem: false,
				};
			},
		},
	},
];
