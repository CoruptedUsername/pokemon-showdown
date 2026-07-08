#!/usr/bin/env node
'use strict';

const fs = require("fs");
const path = require('path');

const stringify = function (obj, prop) {
	const placeholder = '____PLACEHOLDER____';
	const fns = [];
	let json = JSON.stringify(obj, (key, value) => {
		if (typeof value === 'function') {
			fns.push('\n  ' + value);
			return placeholder;
		}
		return value;
	}, 2);
	json = json.replace(new RegExp('\n  "[a-zA-z]*": "____PLACEHOLDER____"', 'g'), _ => {
		return fns.shift();
	});
	return '\n' + json;
};

const rootDir = path.resolve(__dirname, '..');
process.chdir(rootDir);

const FormatSections = require('../dist/config/formats.js').FormatSections;
const FormatSlices = {};
let Formats = [];
for (const section in FormatSections) {
	FormatSlices[FormatSections[section].section] = [stringify(FormatSections[section])];
}
FormatSlices['Other Formats'] = [{ section: 'Other Formats' }];

for (const mod of fs.readdirSync('./dist/data/mods')) {
	if (fs.readdirSync('./dist/data/mods/' + mod).includes("formats.js")) {
		const Formats = require(`../dist/data/mods/${mod}/formats`).Formats;
		for (const format of Formats) {
			console.log(stringify(format));
			const newFormat = { ...format };
			delete newFormat.section;
			const formatName = newFormat.name;
			newFormat["mod"] = mod;
			const formatString = stringify(newFormat);
			if (Object.keys(FormatSlices).includes(format.section)) {
				FormatSlices[format.section].push(formatString);
			} else {
				FormatSlices['Other Formats'].push(formatString);
			}
		}
	}
}
if (FormatSlices['Other Formats'].length === 1) {
	delete FormatSlices['Other Formats'];
	for (const slice of Object.keys(FormatSlices)) {
		Formats = [...Formats, ...FormatSlices[slice]];
	}
}

console.log(Formats);

const formatsFile = fs.readFileSync('./dist/config/formats.js', 'utf8');
fs.writeFileSync('./dist/config/formats.js', formatsFile.split('\n').slice(0, -3).join('\n') + "\nconst Formats = [" + Formats + "];\n" + formatsFile.split('\n').slice(-2).join('\n'), 'utf8');
