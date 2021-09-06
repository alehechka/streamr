const move = require('fs-move');

const src = 'build';
const dest = '../server/app/client';

(async () => {
	await move(src, dest, {
		merge: false,
		overwrite: true,
		purge: true,
	});
})();
