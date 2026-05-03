#!/usr/bin/env node
'use strict';

const fs = require("fs");
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
process.chdir(rootDir);

const FormatSections = require('../dist/config/formats.js').FormatSections;
const FormatSlices = {};
let Formats = [];
for (const section in FormatSections) {
	FormatSlices[FormatSections[section].section] = [FormatSections[section]];
}
FormatSlices['Other Formats'] = [{ section: 'Other Formats' }];

for (const mod of fs.readdirSync('./dist/data/mods')) {
	if (fs.readdirSync('./dist/data/mods/' + mod).includes("formats.js")) {
		const Formats = require(`../dist/data/mods/${mod}/formats`).Formats;
		for (const format of Formats) {
			const newFormat = structuredClone(format);
			delete newFormat.section;
			newFormat["mod"] = mod;
			if (Object.keys(FormatSlices).includes(format.section)) {
				FormatSlices[format.section].push(newFormat);
			} else {
				FormatSlices['Other Formats'].push(newFormat);
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

const formatsFile = fs.readFileSync('./dist/config/formats.js', 'utf8');
fs.writeFileSync('./dist/config/formats.js', formatsFile.split('\n').slice(0, -3).join('\n') + "\nconst Formats = " + JSON.stringify(Formats, null, 2) + ";\n" + formatsFile.split('\n').slice(-2).join('\n'), 'utf8');
