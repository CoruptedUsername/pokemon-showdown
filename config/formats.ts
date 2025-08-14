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
		mod: "gen9",
		ruleset: ['Standard NatDex', 'Mega Rayquaza Clause', 'Terastal Clause', 'Z-Move Clause'],
		// banlist: ['Huge Power', 'Pure Power', 'Shadow Tag', 'Arena Trap', 'Baton Pass', 'Moody', 'Cute Charm', 'Hustle'],
		// unbanlist: ['Assist', 'DNU OU', 'DNU UUBL', 'DNU UU', 'DNU RUBL', 'DNU RU'],
	},
	{
		name: "[Gen 9] Do Not Use UU",
		mod: "gen9dnu",
		ruleset: ['Standard NatDex', 'Mega Rayquaza Clause', 'Terastal Clause', 'Z-Move Clause'],
		banlist: ['All Pokemon', 'Huge Power', 'Pure Power', 'Shadow Tag', 'Arena Trap', 'Baton Pass', 'Moody', 'Cute Charm', 'Hustle'],
		unbanlist: ['Assist', 'DNU UU', 'DNU RUBL', 'DNU RU'],
	},
	{
		name: "[Gen 9] Do Not Use RU",
		mod: "gen9dnu",
		ruleset: ['Standard NatDex', 'Mega Rayquaza Clause', 'Terastal Clause', 'Z-Move Clause'],
		banlist: ['All Pokemon', 'Huge Power', 'Pure Power', 'Shadow Tag', 'Arena Trap', 'Baton Pass', 'Moody', 'Cute Charm', 'Hustle'],
		unbanlist: ['Assist', 'DNU RU'],
	},
	{
		name: "[Gen 9] Do Not Use Ubers",
		mod: "gen9dnu",
		ruleset: ['Standard NatDex', '!Evasion Clause', 'Evasion Moves Clause', 'Evasion Items Clause', 'Mega Rayquaza Clause', 'Terastal Clause', 'Z-Move Clause'],
		banlist: ['All Pokemon', 'Huge Power', 'Pure Power', 'Baton Pass'],
		unbanlist: ['Assist', 'DNU Uber', 'DNU OU', 'DNU UUBL', 'DNU UU', 'DNU RUBL', 'DNU RU'],
	},
	{
		name: "[Gen 9] Do Not Use AG",
		mod: "gen9dnu",
		ruleset: ['Standard AG', 'NatDex Mod'],
		banlist: ['All Pokemon'],
		unbanlist: ['DNU AG', 'DNU Uber', 'DNU OU', 'DNU UUBL', 'DNU UU', 'DNU RUBL', 'DNU RU'],
	},
	{
		name: "[Gen 9] Do Not Use VGC",
		mod: "gen9dnu",
		ruleset: ['Standard NatDex', 'Item Clause = 1', 'Adjust Level = 50', 'Picked Team Size = 4', 'VGC Timer', 'Force Open Team Sheets', 'Terastal Clause', 'Z-Move Clause', 'Best of = 3', 'Limit One Restricted'],
		restricted: ['DNU Restricted'],
		banlist: ['All Pokemon', 'Huge Power', 'Pure Power'],
		unbanlist: ['Assist', 'DNU Restricted', 'DNU Unrestricted'],
	},
];
