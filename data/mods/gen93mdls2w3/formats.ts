export const Formats: import('../../../sim/dex-formats').CustomFormatList = {
	gen93mdraftleagues2w3: {
		name: "[Gen 9] 3M Draft League s2w3",
		gameType: 'singles',
		ruleset: ['Standard NatDex', 'Z-Move Clause', 'Tera Type Preview'],
		banlist: ['Moody', 'Baton Pass', 'Swagger', 'Flatter', 'move:Metronome', 'Last Respects', 'Shed Tail', 'Rage Fist',
			'Hidden Power', 'Power Construct', 'Revival Blessing + Leppa Berry', 'Shell Smash + Blastoise Mega'],
		restricted: [
			'Agility', 'Assist', 'Baneful Bunker', 'Belly Drum', 'Block', 'Burning Bulwark', 'Chilly Reception', 'Confuse Ray', 'Copycat', 'Corrosive Gas', 'Dragon Dance', 'Detect', 'Destiny Bond',
			'Endure', 'Encore', 'Fairy Lock', 'Flatter', 'Focus Energy', 'Glare', 'Heal Bell', 'Instruct', 'King\'s Shield', 'Mat Block', 'Mean Look', 'Me First', 'move:Metronome', 'Mirror Move', 'Nasty Plot', 'Nature Power', 'Obstruct', 'Octolock', 'Parting Shot',
			'Poison Gas', 'Poison Powder', 'Psycho Shift', 'Protect', 'Roar', 'Silk Trap', 'Spider Web', 'Spikes', 'Spiky Shield', 'Sleep Talk', 'Shell Smash', 'Stun Spore', 'Substitute', 'Supersonic',
			'Swagger', 'Sweet Kiss', 'Switcheroo', 'Swords Dance', 'Tail Glow', 'Tailwind', 'Taunt', 'Teeter Dance', 'Teleport', 'Thunder Wave', 'Toxic', 'Toxic Thread',
			'Trick', 'Trick Room', 'Will-O-Wisp', 'Wish', 'Whirlwind',
		],
		onValidateTeam(team, format, teamHas) {
			const problems = [];
			if (!teamHas.trademarks) return;
			for (const trademark of teamHas.trademarks.keys()) {
				if (teamHas.trademarks.get(trademark) > 1) {
					problems.push(`You are limited to 1 of each Trademark.`, `(You have ${teamHas.trademarks.get(trademark)} Pok\u00e9mon with ${trademark} as a Trademark.)`);
				}
			}
			return problems;
		},
		validateSet(set, teamHas) {
			const dex = this.dex;
			const ability = dex.moves.get(set.ability);
			if (!ability.exists) { // Not even a real move
				return this.validateSet(set, teamHas);
			}
			// Absolute trademark bans
			if (ability.category !== 'Status') {
				return [`${ability.name} is not a status move and cannot be used as a trademark.`];
			}
			// Contingent trademark bans
			if (this.ruleTable.isRestricted(`move:${ability.id}`)) {
				return [`${ability.name} is restricted from being used as a trademark.`];
			}
			if (set.moves.map(this.toID).includes(ability.id)) {
				return [`${set.name} may not use ${ability.name} as both a trademark and one of its moves simultaneously.`];
			}
			const customRules = this.format.customRules || [];
			if (!customRules.includes('!obtainableabilities')) customRules.push('!obtainableabilities');
			if (!customRules.includes('+noability')) customRules.push('+noability');

			const TeamValidator: typeof import('../sim/team-validator').TeamValidator =
				require('../sim/team-validator').TeamValidator;

			const validator = new TeamValidator(dex.formats.get(`${this.format.id}@@@${customRules.join(',')}`));
			const moves = set.moves;
			set.moves = [ability.id];
			set.ability = 'No Ability';
			let problems = validator.validateSet(set, {}) || [];
			if (problems.length) return problems;
			set.moves = moves;
			set.ability = 'No Ability';
			problems = problems.concat(validator.validateSet(set, teamHas) || []);
			set.ability = ability.id;
			if (!teamHas.trademarks) teamHas.trademarks = new this.dex.Multiset<string>();
			teamHas.trademarks.add(ability.name);
			return problems.length ? problems : null;
		},
		section: "Three Musketeers",
		teambuilder: {
			defaultLevel: 100,
			tierType: "tier",
			formatType: "singles",
			allowedTiers: ['3M Musks', '3M'],
			isNatDex: true,
		},
	},
};
