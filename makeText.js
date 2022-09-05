/** Command-line tool to generate Markov text. */
import fs from 'fs';
import markov from './markov.js';
import axios from 'axios';
import process from 'process';

function generateText(text) {
	let word = new markov.MarkovMachine(text);
	console.log(word.makeText());
}

function makeText(path) {
	fs.readFile(path, 'utf8', function ot(err, data) {
		if (err) {
			console.log(`Can not read file ${path}: ${err}`);
			process.exit(1);
		} else {
			generateText(data);
		}
	});
}

async function makeURLtext(url) {
	let resp;

	try {
		resp = await axios.get(url);
	} catch (err) {
		console.log(`Can not read URL : ${url}: ${err}`);
	}
	generateText(resp.data);
}

let [ method, path ] = process.argv.slice(2);

if (method == 'file') {
	makeText(path);
} else if (method == 'url') {
	makeURLtext(path);
} else {
	console.log(`Unknown method: ${method}`);
	process.exit(1);
}
