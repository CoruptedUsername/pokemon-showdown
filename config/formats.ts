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
		name: "[Gen 9] Three Musketeers Draft Week 5",
		mod: "gen93m",
		ruleset: ['Standard NatDex', 'Terastal Clause', 'DryPass Clause', 'Broken Record Mod', 'Force of the Fallen Mod'],
		banlist: ['Vanilla', 'Last Respects', 'Moody', 'Quick Claw', 'King\'s Rock', 'Razor Fang', 'Shed Tail', 'Rage Fist', 'Booster Energy', 'TR00', 'TR29', 'TR51', 'TR68', 'TR82'],
		restricted: ['Belly Drum', 'Extreme Speed', 'Population Bomb', 'Quiver Dance', 'Revival Blessing', 'Shell Smash', 'Shift Gear', 'Tail Glow'],
	},
];
