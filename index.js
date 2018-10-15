let AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

if(!Array.prototype.values) {
	Array.prototype.values = Array.prototype[Symbol.iterator];
}

module.exports = function(callbacks) {
	return function(args) {
		if(Array.isArray(args)) {
			args = [args];
		}

		let iterator = callbacks.values();

		function iterate(args) {
			let { value } = iterator.next();

			if(value == undefined) {
				return Promise.resolve(args);
			}

			let result = value(args, iterate);

			if(result instanceof Promise) {
				return result;
			}

			if(value instanceof AsyncFunction) {
				return Promise.resolve(result)
			}

			return iterate(result);
		}

		return iterate(args);
	}
};
