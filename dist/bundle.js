/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../.nvm/versions/node/v9.8.0/lib/node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\r\n\r\n// This works in non-strict mode\r\ng = (function() {\r\n\treturn this;\r\n})();\r\n\r\ntry {\r\n\t// This works if eval is allowed (see CSP)\r\n\tg = g || Function(\"return this\")() || (1, eval)(\"this\");\r\n} catch (e) {\r\n\t// This works if the window reference is available\r\n\tif (typeof window === \"object\") g = window;\r\n}\r\n\r\n// g can still be undefined, but nothing to do about it...\r\n// We return undefined, instead of nothing here, so it's\r\n// easier to handle this case. if(!global) { ...}\r\n\r\nmodule.exports = g;\r\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {const DEFAULT_CONTEXT = window || global;\n\nclass ContextPromise extends Promise {\n\tconstructor(callback, context) {\n\t\tif(context == undefined) {\n\t\t\treturn new Promise(callback);\n\t\t}\n\n\t\tsuper(callback.bind(context));\n\n\t\tthis.context = context;\n\t}\n\n\tthen(resolve, reject) {\n\t\tconsole.log(\"ctxt then\");\n\n\t\tif(reject) {\n\t\t\treturn super.then(\n\t\t\t\tresolve.bind(this.context),\n\t\t\t\treject.bind(this.context)\n\t\t\t);\n\t\t}\n\n\t\treturn super.then(resolve.bind(this.context));\n\t}\n\tcatch(callback) {\n\t\treturn super.catch(callback.bind(this.context));\n\t}\n}\n\n\n\nObject.assign(ContextPromise, Promise, {\n\tserialize : function(callbacks, context = DEFAULT_CONTEXT) {\n\t\tvar context = getContext(callbacks);\n\n\t\treturn callbacks.reduce(function(curr, callback) {\n\t\t\treturn curr.then(callback.bind(context));\n\t\t}, callbacks.shift());\n\t},\n\tresolve : function(value, context) {\n\t\tif(context) {\n\t\t\treturn new ContextPromise(function(resolve) {\n\t\t\t\tresolve(value);\n\t\t\t})\n\t\t}\n\n\t\treturn Promise.resolve(value);\n\t},\n\treject : function(value, context) {\n\t\tif(context) {\n\t\t\treturn new ContextPromise(function(resolve, reject) {\n\t\t\t\treject(value);\n\t\t\t})\n\t\t}\n\n\t\treturn Promise.reject(value);\n\t},\n\tfrom : function(\n\t\temitter,\n\t\tcontext,\n\t\tresolve = [\"close\", \"finish\", \"end\"],\n\t\treject = [\"error\"]\n\t) {\n\n\t\tif(typeof emitter.on != \"function\") {\n\t\t\treturn ContextPromise.resolve(emitter, context);\n\t\t}\n\n\t\tif(!Array.isArray(resolve)) {\n\t\t\tresolve = [resolve];\n\t\t}\n\t\tif(!Array.isArray(reject)) {\n\t\t\treject = [reject];\n\t\t}\n\n\t\treturn new ContextPromise(function(resolve, reject) {\n\t\t\treject.forEach(function(event) {\n\t\t\t\temitter.on(event, resolve);\n\t\t\t});\n\n\t\t\tresolve.forEach(function(event) {\n\t\t\t\temitter.on(event, resolve);\n\t\t\t});\n\t\t}, context)\n\t},\n\t/**\n\t\tall functions will be called in a serialized way\n\t*/\n\ttraverse : function(callbacks, context, args = []) {\n\t\tif(Array.isArray(args)) {\n\t\t\targs = [args];\n\t\t}\n\n\t\tvar iterator = callbacks.entries();\n\n\t\tfunction iterate(args) {\n\t\t\tvar state = iterator.next();\n\n\t\t\tif(state.value == undefined) {\n\t\t\t\treturn ContextPromise.resolve(args, context);\n\t\t\t}\n\n\t\t\tvar result = state.value[1].call(context, args, iterate);\n\n\t\t\tif(result instanceof Promise) {\n\t\t\t\treturn result;\n\t\t\t} else if(result instanceof EventEmitter) {\n\t\t\t\treturn ContextPromise.from(result, context);\n\t\t\t}\n\n\t\t\treturn iterate(result);\n\t\t}\n\n\t\treturn iterate(args);\n\n\t}\n});\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../.nvm/versions/node/v9.8.0/lib/node_modules/webpack/buildin/global.js */ \"../../.nvm/versions/node/v9.8.0/lib/node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });