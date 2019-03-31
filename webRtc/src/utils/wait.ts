

export default (ms: number) => new Promise(resolve => { // TODO: test this
	setHrTimeout(process.hrtime.bigint(), ms * 1e6, resolve);
})

function setHrTimeout(startTime: bigint, delay: number, callback: () => void) { // TODO: test this
	const currentTime = process.hrtime.bigint();
	if (process.hrtime.bigint() - startTime > delay) {
		callback();
		return;
	}
	setImmediate(function () { setHrTimeout(startTime, delay, callback); });
}