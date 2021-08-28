const move = require('fs-move');

const src = 'build';
const dest = '../server/client';

(async () => {
	await move(src, dest, {
		merge: false,
		overwrite: true,
		purge: true,
	});
})();
