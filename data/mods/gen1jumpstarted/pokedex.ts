export const Pokedex: import('../../../sim/dex-species').ModdedSpeciesDataTable = {
	abomasnow: {
		inherit: true,
		baseStats: { hp: 90, atk: 92, def: 75, spa: 85, spd: 85, spe: 60 },
	},
	articuno: {
		inherit: true,
		otherFormes: ["Articuno-Galar"],
		formeOrder: ["Articuno", "Articuno-Galar"],
	},
	articunogalar: {
		inherit: true,
		baseStats: { hp: 90, atk: 85, def: 85, spa: 125, spd: 125, spe: 95 },
		baseSpecies: "Articuno",
	},
	audino: {
		inherit: true,
		baseStats: { hp: 103, atk: 60, def: 86, spa: 86, spd: 86, spe: 50 },
	},
	dhelmise: {
		inherit: true,
		baseStats: { hp: 70, atk: 131, def: 100, spa: 86, spd: 86, spe: 40 },
	},
	diancie: {
		inherit: true,
		baseStats: { hp: 50, atk: 100, def: 150, spa: 150, spd: 150, spe: 50 },
		types: ["Rock", "Normal"],
	},
	dianciemega: {
		inherit: true,
		baseStats: { hp: 50, atk: 160, def: 110, spa: 160, spd: 160, spe: 110 },
		types: ["Rock", "Normal"],
	},
};
