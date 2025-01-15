/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst globalLogStyle = 'padding: 5px;' +\n    'border-radius: 5px;';\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n    debug: true,\n    app_name: 'PTE',\n    inject_variable: 'g_LocalGame',\n    green_log_style: globalLogStyle + 'background: green; color: chartreuse;',\n    red_log_style: globalLogStyle + 'background: darkred; color: red;',\n});\n\n\n//# sourceURL=webpack:///./src/config.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ \"./src/config.ts\");\n/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools */ \"./src/tools.ts\");\n/* harmony import */ var _plugins_pluginsExports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plugins/@pluginsExports */ \"./src/plugins/@pluginsExports.ts\");\n\n\n\nconst tempAppName = _tools__WEBPACK_IMPORTED_MODULE_1__.genString();\nconst exportToPage = {\n    tempAppName,\n    plugins: _plugins_pluginsExports__WEBPACK_IMPORTED_MODULE_2__,\n    config: _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    tools: _tools__WEBPACK_IMPORTED_MODULE_1__,\n    APP,\n};\nfunction APP(extension) {\n    const inGameVariable = window[extension.config.inject_variable];\n    if (extension.config.debug) {\n        console.log(`%c${extension.config.app_name} namespace: window.${extension.tempAppName}`, extension.config.green_log_style);\n        console.log(window[extension.tempAppName]);\n        if (!inGameVariable)\n            console.log(`%c${extension.config.app_name}: ${extension.config.inject_variable} not found`, extension.config.red_log_style);\n    }\n    ;\n    Object.values(extension.plugins).forEach((plugin) => {\n        plugin.default.once(Object.assign(Object.assign({}, extension), { inGameVariable }));\n    });\n    let timestamp = 0;\n    let oldFrameTimestamp = 0;\n    let frameTime = 0;\n    let avgFrameTime = 0;\n    let frameTimeBuffer = [];\n    let deltaTime = 0;\n    let avgDeltaTime = 0;\n    let deltaTimeTimeBuffer = [];\n    (function frame() {\n        timestamp = Date.now();\n        frameTime = timestamp - oldFrameTimestamp;\n        deltaTime = frameTime / 1000;\n        oldFrameTimestamp = timestamp;\n        frameTimeBuffer.push(frameTime);\n        deltaTimeTimeBuffer.push(deltaTime);\n        if (frameTimeBuffer.length >= 10)\n            frameTimeBuffer.shift();\n        if (deltaTimeTimeBuffer.length >= 10)\n            deltaTimeTimeBuffer.shift();\n        avgFrameTime = frameTimeBuffer.reduce((a, b) => a + b) / frameTimeBuffer.length;\n        avgDeltaTime = deltaTimeTimeBuffer.reduce((a, b) => a + b) / deltaTimeTimeBuffer.length;\n        Object.values(extension.plugins).forEach((plugin) => {\n            plugin.default.update(Object.assign(Object.assign({}, extension), { inGameVariable,\n                oldFrameTimestamp,\n                timestamp,\n                frameTime,\n                avgFrameTime,\n                deltaTime,\n                avgDeltaTime }));\n        });\n        window.requestAnimationFrame(frame);\n    })();\n    return {\n        update: Object.assign(Object.assign({}, extension), { inGameVariable,\n            oldFrameTimestamp,\n            timestamp,\n            frameTime,\n            avgFrameTime,\n            deltaTime,\n            avgDeltaTime }),\n        once: Object.assign(Object.assign({}, extension), { inGameVariable }),\n    };\n}\n;\nwindow.addEventListener('DOMContentLoaded', function () {\n    const element = document.createElement('script');\n    // преобразование данных в текст\n    let script = `window.${tempAppName} = {};`;\n    Object.entries(exportToPage).forEach(([key, value]) => {\n        script += `window.${tempAppName}.${key} = ${_tools__WEBPACK_IMPORTED_MODULE_1__.toString(value)};`;\n        if (toString.call(value) == '[object Function]')\n            script += `window.${tempAppName}.${key}(${_tools__WEBPACK_IMPORTED_MODULE_1__.toString(exportToPage)});`;\n    });\n    // инжект на страницу\n    element.appendChild(document.createTextNode(script));\n    document.body.appendChild(element);\n    if (!_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].debug) {\n        element.appendChild(document.createTextNode(`delete window.${tempAppName};`));\n        element.remove();\n    }\n    else\n        console.log('%cScript injected', _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].green_log_style);\n});\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/plugins/@plugin.ts":
/*!********************************!*\
  !*** ./src/plugins/@plugin.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class {\n    constructor() {\n        this.once = (event) => { };\n        this.update = (event) => { };\n    }\n    ;\n    setOnce(callback) {\n        this.once = callback;\n        return this;\n    }\n    ;\n    setUpdate(callback) {\n        this.update = callback;\n        return this;\n    }\n    ;\n});\n;\n\n\n//# sourceURL=webpack:///./src/plugins/@plugin.ts?");

/***/ }),

/***/ "./src/plugins/@pluginsExports.ts":
/*!****************************************!*\
  !*** ./src/plugins/@pluginsExports.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   antiafk: () => (/* reexport module object */ _antiafk__WEBPACK_IMPORTED_MODULE_0__)\n/* harmony export */ });\n/* harmony import */ var _antiafk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./antiafk */ \"./src/plugins/antiafk.ts\");\n\n\n\n\n//# sourceURL=webpack:///./src/plugins/@pluginsExports.ts?");

/***/ }),

/***/ "./src/plugins/antiafk.ts":
/*!********************************!*\
  !*** ./src/plugins/antiafk.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./@plugin */ \"./src/plugins/@plugin.ts\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new _plugin__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()\n    .setOnce(function () {\n    (function update() {\n        document.body.click();\n        setTimeout(() => {\n            update();\n        }, Math.random() * 300000);\n    })();\n}));\n\n\n//# sourceURL=webpack:///./src/plugins/antiafk.ts?");

/***/ }),

/***/ "./src/tools.ts":
/*!**********************!*\
  !*** ./src/tools.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   genString: () => (/* binding */ genString),\n/* harmony export */   toString: () => (/* binding */ toString)\n/* harmony export */ });\n\n/**\n * Переводит данные в строку\n */\nfunction toString(value) {\n    if (value === null)\n        return 'null';\n    if (value === undefined)\n        return 'undefined';\n    if (value instanceof Date)\n        return `Date(${value.toISOString()})`;\n    if (value instanceof Map)\n        return `Map(${JSON.stringify(Array.from(value.entries()))})`;\n    if (value instanceof Set)\n        return `Set(${JSON.stringify(Array.from(value))})`;\n    if (Array.isArray(value))\n        return `[${value.map(toString).join(', ')}]`;\n    if (typeof value == 'string')\n        return `\"${value}\"`;\n    if (typeof value === 'object')\n        return `{${Object.entries(value).map(([key, val]) => `${key}:${toString(val)}`).join(',')}}`;\n    return String(value);\n}\n;\n/**\n * Генерирует случайную строку\n */\nfunction genString(length) {\n    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';\n    let result = '';\n    if (!length)\n        length = 1 + Math.floor(Math.random() * 9);\n    for (let i = 0; i < length; i++) {\n        result += characters.charAt(Math.floor(Math.random() * characters.length));\n    }\n    ;\n    return result;\n}\n;\n\n\n//# sourceURL=webpack:///./src/tools.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;