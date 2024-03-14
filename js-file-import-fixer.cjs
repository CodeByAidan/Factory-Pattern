/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @fileoverview
 * This script is used to fix the import paths in the JS files in the dist directory.
 * It is used to fix the import paths in the JS files after the build process for tsc.
 * That way you can then run `node dist/index.js` and the imports will work as expected!
 * It is recursive, so it will fix all JS files in the directory and its subdirectories.
 * e.g.
 * import { someFunction } from '../../someModule';
 * will be replaced with
 * import { someFunction } from '../../someModule.js';
 */

const { readdir, readFile, writeFile } = require('fs').promises;
const path = require('path');

const dirPath = 'dist/js'; // Replace with the path to the directory containing the JS files to fix,
// it is recursive, so it will fix all JS files in the directory and its subdirectories

/**
 * Fixes the import paths in the JS files in the given directory.
 *
 * @param {dirPath} dirPath - The path to the directory containing the JS files to fix
 * @return {Promise<void>} - A promise that resolves when the import paths have been fixed
 */
const jsFileImportFixer = async (dirPath) => {
	const items = await readdir(dirPath, { withFileTypes: true });
	for (const item of items) {
		const itemPath = path.join(dirPath, item.name);
		if (item.isDirectory()) {
			await jsFileImportFixer(itemPath);
		} else if (item.isFile() && item.name.endsWith('.js')) {
			const fileContent = await readFile(itemPath, 'utf-8');
			// Regex: https://regex101.com/r/Xr38tD/1
			const regex = /(\.\.\/(?:\w+\/)+|\.\/(?:\w+\/)*)(\w+)(\.js)*/g;
			const subst = `$1$2.js`;
			const matches = fileContent.match(regex);
			if (matches) {
				console.log(`Fixing import paths in ${itemPath}`);
				console.log(`Replaced ${matches.length} import paths`);
				console.log('-----------------------------------');
				console.log(
					matches,
					'=>',
					matches.map((match) => match.replace(regex, subst)),
				);
				console.log('-----------------------------------');
			}
			const newFileContent = fileContent.replace(regex, subst);
			await writeFile(itemPath, newFileContent);
		}
	}
};

jsFileImportFixer(dirPath).catch(console.error);
module.exports = jsFileImportFixer;
