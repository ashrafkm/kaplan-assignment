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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.ts":
/*!****************!*\
  !*** ./app.ts ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__dirname) {\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.Server = void 0;\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nconst compression = __webpack_require__(/*! compression */ \"compression\");\nconst config = __webpack_require__(/*! config */ \"config\");\nconst cors = __webpack_require__(/*! cors */ \"cors\");\nconst errorHandler = __webpack_require__(/*! errorhandler */ \"errorhandler\");\nconst express = __webpack_require__(/*! express */ \"express\");\nconst expressStatusMonitor = __webpack_require__(/*! express-status-monitor */ \"express-status-monitor\");\nconst helmet = __webpack_require__(/*! helmet */ \"helmet\");\nconst methodOverride = __webpack_require__(/*! method-override */ \"method-override\");\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst http = __webpack_require__(/*! http */ \"http\");\nconst routes_1 = __webpack_require__(/*! ./routes */ \"./routes/index.ts\");\n/**\n * The server.\n *\n * @class Server\n */\nclass Server {\n    /**\n     * Constructor.\n     *\n     * @class Server\n     * @constructor\n     */\n    constructor() {\n        // create expressjs application\n        this.app = express();\n        this.server = http.createServer(this.app);\n        // configure application\n        this.config();\n        // add routes\n        this.routes();\n    }\n    /**\n     * Bootstrap the application.\n     *\n     * @class Server\n     * @method bootstrap\n     * @static\n     */\n    static bootstrap() {\n        return new Server();\n    }\n    /**\n     * Configure application\n     *\n     * @class Server\n     * @method config\n     */\n    config() {\n        // add static paths\n        let connectionString = process.env.MONGODB_URI || config.get('connectionString');\n        if (!connectionString) {\n            connectionString = config.get('connectionString');\n        }\n        async function connectDB() {\n            try {\n                const data = await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });\n            }\n            catch (error) {\n                console.log('MongoDB connection error. Please make sure MongoDB is running. ' + error);\n            }\n        }\n        connectDB();\n        this.app.use(express.static(path.join(__dirname, 'public')));\n        // mount json form parser\n        this.app.use(bodyParser.json({ limit: '50mb' }));\n        // mount query string parser\n        this.app.use(bodyParser.urlencoded({\n            extended: true,\n        }));\n        // mount override?\n        this.app.use(helmet());\n        this.app.use(cors());\n        this.app.use(compression());\n        this.app.use(methodOverride());\n        this.app.use(expressStatusMonitor());\n        this.app.set('views', './src/views');\n        this.app.set('view engine', 'ejs');\n        // catch 404 and forward to error handler\n        this.app.use((err, req, res, next) => {\n            res.json({ message: err, code: 500 });\n            next(err);\n        });\n        // error handling\n        this.app.use(errorHandler());\n    }\n    /**\n     * Create and return Router.\n     *\n     * @class Server\n     * @method routes\n     * @return void\n     */\n    routes() {\n        // use router middleware\n        this.app.use(routes_1.ApiRoutes.path, routes_1.ApiRoutes.router);\n    }\n}\nexports.Server = Server;\n\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hcHAudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAudHM/NDYzMCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU2VydmVyID0gdm9pZCAwO1xuY29uc3QgYm9keVBhcnNlciA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTtcbmNvbnN0IGNvbXByZXNzaW9uID0gcmVxdWlyZShcImNvbXByZXNzaW9uXCIpO1xuY29uc3QgY29uZmlnID0gcmVxdWlyZShcImNvbmZpZ1wiKTtcbmNvbnN0IGNvcnMgPSByZXF1aXJlKFwiY29yc1wiKTtcbmNvbnN0IGVycm9ySGFuZGxlciA9IHJlcXVpcmUoXCJlcnJvcmhhbmRsZXJcIik7XG5jb25zdCBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5jb25zdCBleHByZXNzU3RhdHVzTW9uaXRvciA9IHJlcXVpcmUoXCJleHByZXNzLXN0YXR1cy1tb25pdG9yXCIpO1xuY29uc3QgaGVsbWV0ID0gcmVxdWlyZShcImhlbG1ldFwiKTtcbmNvbnN0IG1ldGhvZE92ZXJyaWRlID0gcmVxdWlyZShcIm1ldGhvZC1vdmVycmlkZVwiKTtcbmNvbnN0IG1vbmdvb3NlID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuY29uc3QgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xuY29uc3Qgcm91dGVzXzEgPSByZXF1aXJlKFwiLi9yb3V0ZXNcIik7XG4vKipcbiAqIFRoZSBzZXJ2ZXIuXG4gKlxuICogQGNsYXNzIFNlcnZlclxuICovXG5jbGFzcyBTZXJ2ZXIge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yLlxuICAgICAqXG4gICAgICogQGNsYXNzIFNlcnZlclxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyBjcmVhdGUgZXhwcmVzc2pzIGFwcGxpY2F0aW9uXG4gICAgICAgIHRoaXMuYXBwID0gZXhwcmVzcygpO1xuICAgICAgICB0aGlzLnNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKHRoaXMuYXBwKTtcbiAgICAgICAgLy8gY29uZmlndXJlIGFwcGxpY2F0aW9uXG4gICAgICAgIHRoaXMuY29uZmlnKCk7XG4gICAgICAgIC8vIGFkZCByb3V0ZXNcbiAgICAgICAgdGhpcy5yb3V0ZXMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQm9vdHN0cmFwIHRoZSBhcHBsaWNhdGlvbi5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBTZXJ2ZXJcbiAgICAgKiBAbWV0aG9kIGJvb3RzdHJhcFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgYm9vdHN0cmFwKCkge1xuICAgICAgICByZXR1cm4gbmV3IFNlcnZlcigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb25maWd1cmUgYXBwbGljYXRpb25cbiAgICAgKlxuICAgICAqIEBjbGFzcyBTZXJ2ZXJcbiAgICAgKiBAbWV0aG9kIGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgLy8gYWRkIHN0YXRpYyBwYXRoc1xuICAgICAgICBsZXQgY29ubmVjdGlvblN0cmluZyA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJIHx8IGNvbmZpZy5nZXQoJ2Nvbm5lY3Rpb25TdHJpbmcnKTtcbiAgICAgICAgaWYgKCFjb25uZWN0aW9uU3RyaW5nKSB7XG4gICAgICAgICAgICBjb25uZWN0aW9uU3RyaW5nID0gY29uZmlnLmdldCgnY29ubmVjdGlvblN0cmluZycpO1xuICAgICAgICB9XG4gICAgICAgIGFzeW5jIGZ1bmN0aW9uIGNvbm5lY3REQigpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IG1vbmdvb3NlLmNvbm5lY3QoY29ubmVjdGlvblN0cmluZywgeyB1c2VOZXdVcmxQYXJzZXI6IHRydWUsIHVzZVVuaWZpZWRUb3BvbG9neTogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdNb25nb0RCIGNvbm5lY3Rpb24gZXJyb3IuIFBsZWFzZSBtYWtlIHN1cmUgTW9uZ29EQiBpcyBydW5uaW5nLiAnICsgZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbm5lY3REQigpO1xuICAgICAgICB0aGlzLmFwcC51c2UoZXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSwgJ3B1YmxpYycpKSk7XG4gICAgICAgIC8vIG1vdW50IGpzb24gZm9ybSBwYXJzZXJcbiAgICAgICAgdGhpcy5hcHAudXNlKGJvZHlQYXJzZXIuanNvbih7IGxpbWl0OiAnNTBtYicgfSkpO1xuICAgICAgICAvLyBtb3VudCBxdWVyeSBzdHJpbmcgcGFyc2VyXG4gICAgICAgIHRoaXMuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoe1xuICAgICAgICAgICAgZXh0ZW5kZWQ6IHRydWUsXG4gICAgICAgIH0pKTtcbiAgICAgICAgLy8gbW91bnQgb3ZlcnJpZGU/XG4gICAgICAgIHRoaXMuYXBwLnVzZShoZWxtZXQoKSk7XG4gICAgICAgIHRoaXMuYXBwLnVzZShjb3JzKCkpO1xuICAgICAgICB0aGlzLmFwcC51c2UoY29tcHJlc3Npb24oKSk7XG4gICAgICAgIHRoaXMuYXBwLnVzZShtZXRob2RPdmVycmlkZSgpKTtcbiAgICAgICAgdGhpcy5hcHAudXNlKGV4cHJlc3NTdGF0dXNNb25pdG9yKCkpO1xuICAgICAgICB0aGlzLmFwcC5zZXQoJ3ZpZXdzJywgJy4vc3JjL3ZpZXdzJyk7XG4gICAgICAgIHRoaXMuYXBwLnNldCgndmlldyBlbmdpbmUnLCAnZWpzJyk7XG4gICAgICAgIC8vIGNhdGNoIDQwNCBhbmQgZm9yd2FyZCB0byBlcnJvciBoYW5kbGVyXG4gICAgICAgIHRoaXMuYXBwLnVzZSgoZXJyLCByZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgICAgICAgICAgcmVzLmpzb24oeyBtZXNzYWdlOiBlcnIsIGNvZGU6IDUwMCB9KTtcbiAgICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgIHRoaXMuYXBwLnVzZShlcnJvckhhbmRsZXIoKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbmQgcmV0dXJuIFJvdXRlci5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBTZXJ2ZXJcbiAgICAgKiBAbWV0aG9kIHJvdXRlc1xuICAgICAqIEByZXR1cm4gdm9pZFxuICAgICAqL1xuICAgIHJvdXRlcygpIHtcbiAgICAgICAgLy8gdXNlIHJvdXRlciBtaWRkbGV3YXJlXG4gICAgICAgIHRoaXMuYXBwLnVzZShyb3V0ZXNfMS5BcGlSb3V0ZXMucGF0aCwgcm91dGVzXzEuQXBpUm91dGVzLnJvdXRlcik7XG4gICAgfVxufVxuZXhwb3J0cy5TZXJ2ZXIgPSBTZXJ2ZXI7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./app.ts\n");

/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.server = exports.app = void 0;\nconst config = __webpack_require__(/*! config */ \"config\");\nconst app_1 = __webpack_require__(/*! ./app */ \"./app.ts\");\n// create http server\nexports.app = app_1.Server.bootstrap().app;\nexports.server = app_1.Server.bootstrap().server;\nlet port = process.env.PORT || config.get('port');\nif (!port) {\n    port = config.get('port');\n}\nconsole.log('api running on PORT: ', port);\n// used for forgot password api.. \nexports.server.listen(port);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9pbmRleC50cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2luZGV4LnRzPzMwYjQiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNlcnZlciA9IGV4cG9ydHMuYXBwID0gdm9pZCAwO1xuY29uc3QgY29uZmlnID0gcmVxdWlyZShcImNvbmZpZ1wiKTtcbmNvbnN0IGFwcF8xID0gcmVxdWlyZShcIi4vYXBwXCIpO1xuLy8gY3JlYXRlIGh0dHAgc2VydmVyXG5leHBvcnRzLmFwcCA9IGFwcF8xLlNlcnZlci5ib290c3RyYXAoKS5hcHA7XG5leHBvcnRzLnNlcnZlciA9IGFwcF8xLlNlcnZlci5ib290c3RyYXAoKS5zZXJ2ZXI7XG5sZXQgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgY29uZmlnLmdldCgncG9ydCcpO1xuaWYgKCFwb3J0KSB7XG4gICAgcG9ydCA9IGNvbmZpZy5nZXQoJ3BvcnQnKTtcbn1cbmNvbnNvbGUubG9nKCdhcGkgcnVubmluZyBvbiBQT1JUOiAnLCBwb3J0KTtcbi8vIHVzZWQgZm9yIGZvcmdvdCBwYXNzd29yZCBhcGkuLiBcbmV4cG9ydHMuc2VydmVyLmxpc3Rlbihwb3J0KTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./index.ts\n");

/***/ }),

/***/ "./routes/assignment/assignment.route.ts":
/*!***********************************************!*\
  !*** ./routes/assignment/assignment.route.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.AssignmentRoute = void 0;\nconst services_1 = __webpack_require__(/*! @/services */ \"./services/index.ts\");\nconst route_1 = __webpack_require__(/*! ../route */ \"./routes/route.ts\");\nconst mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst assignment_1 = __webpack_require__(/*! ../../schema/assignment */ \"./schema/assignment.ts\");\nconst swaggerJsDoc = __webpack_require__(/*! swagger-jsdoc */ \"swagger-jsdoc\");\nconst swaggerUI = __webpack_require__(/*! swagger-ui-express */ \"swagger-ui-express\");\nconst swaggerOptions = {\n    explorer: true,\n    swaggerDefinition: {\n        info: \"Kaplan assignment API\",\n        version: \"1.0.0\"\n    },\n    apis: [\"./src/routes/assignment/index.ts\"]\n};\nconst swaggerDocs = swaggerJsDoc(swaggerOptions);\n/**\n * @api {get} /\n * @apiName AssignmentRequest\n * @apiGroup AssignmentRequest\n *\n * @apiSuccess {String} type Json Type.\n */\nclass AssignmentRoute extends route_1.BaseRoute {\n    /**\n     * @class AssignmentRoute\n     * @constructor\n     */\n    constructor() {\n        super();\n        this.CreateNewAssignment = this.CreateNewAssignment.bind(this);\n        this.init();\n    }\n    static get router() {\n        if (!AssignmentRoute.instance) {\n            AssignmentRoute.instance = new AssignmentRoute();\n        }\n        return AssignmentRoute.instance.router;\n    }\n    init() {\n        // log\n        services_1.logger.info('[AssignmentRoute] Creating AssignmentRoute route.');\n        // add index page route\n        this.router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));\n        this.router.get('/list', this.list);\n        this.router.post('/create', this.CreateNewAssignment);\n        this.router.get('/search', this.searchAssignmentByTags);\n        this.router.put('/update/:id', this.UpdateAssignment);\n        this.router.put('/add-tags/:id', this.AddTags);\n        this.router.delete('/delete/:id', this.DeleteAssignment);\n        this.router.get('/:id', this.Details);\n    }\n    /**\n     *\n     * @swagger\n     * /list:\n     *      get:\n     *         description: Get all assignment\n     *            responses:\n     *               200\n     *                  description: Success\n     */\n    async list(req, res, next) {\n        try {\n            let query = [\n                { $match: { deleted: { $ne: 1 } } },\n                {\n                    $project: {\n                        _id: 1,\n                        title: 1,\n                        description: 1,\n                        type: 1,\n                        tags: 1,\n                        createdAt: { $dateToString: { format: \"%Y-%m-%d\", date: \"$createdAt\" } },\n                    }\n                },\n                { $sort: { createdAt: -1 } }\n            ];\n            const response = await assignment_1.Assignment.aggregate(query);\n            res.json({ code: 200, total: response.length, data: response, });\n        }\n        catch (error) {\n            next(error);\n        }\n    }\n    /**\n     * @swagger\n     * /:id\n     * @param req\n     * @param res\n     * @param next\n     */\n    async Details(req, res, next) {\n        try {\n            let query = [\n                { $match: { _id: mongoose_1.Types.ObjectId(req.params.id) } },\n                {\n                    $project: {\n                        _id: 1,\n                        title: 1,\n                        description: 1,\n                        type: 1,\n                        tags: 1,\n                        createdAt: { $dateToString: { format: \"%Y-%m-%d\", date: \"$createdAt\" } },\n                    }\n                }\n            ];\n            const response = await assignment_1.Assignment.aggregate(query);\n            res.json({ code: 200, data: response[0] });\n        }\n        catch (error) {\n            next(error);\n        }\n    }\n    async searchAssignmentByTags(req, res, next) {\n        try {\n            let query = [\n                { $match: { $text: { $search: req.query.key } } },\n                {\n                    $project: {\n                        _id: 1,\n                        title: 1,\n                        description: 1,\n                        type: 1,\n                        tags: 1,\n                        createdAt: { $dateToString: { format: \"%Y-%m-%d\", date: \"$createdAt\" } },\n                    }\n                },\n                { $sort: { createdAt: -1 } }\n            ];\n            const response = await assignment_1.Assignment.aggregate([query]);\n            res.json({ code: 200, data: response });\n        }\n        catch (error) {\n            next(error);\n        }\n    }\n    async CreateNewAssignment(req, res, next) {\n        try {\n            FormatRequestData(req.body);\n            if (await AssignmentExist({ uniqueTitle: req.body.uniqueTitle })) {\n                res.status(400).json({ code: 400, error: 'Assignment already exist!.', });\n            }\n            else {\n                let newAssignment = new assignment_1.Assignment(req.body);\n                await Create(res, newAssignment);\n            }\n        }\n        catch (error) {\n            next(error);\n        }\n    }\n    async UpdateAssignment(req, res, next) {\n        try {\n            unSetDataWhichIsNotRequired(req);\n            FormatRequestData(req.body);\n            if (await AssignmentExist({ _id: { $ne: mongoose_1.Types.ObjectId(req.params.id) }, uniqueTitle: req.body.uniqueTitle })) {\n                res.status(400).json({ code: 400, error: 'Assignment already exist!.', });\n            }\n            else {\n                await Update(req, res, req.body);\n            }\n        }\n        catch (error) {\n            next(error);\n        }\n    }\n    async AddTags(req, res, next) {\n        try {\n            if (!req.body.tags || req.body.tags.length === 0) {\n                res.status(400).json({ code: 400, message: 'Tags are required.' });\n            }\n            else {\n                await AddTags(req, res);\n            }\n        }\n        catch (error) {\n            next(error);\n        }\n    }\n    async DeleteAssignment(req, res, next) {\n        try {\n            const response = await assignment_1.Assignment.updateOne({ _id: mongoose_1.Types.ObjectId(req.params.id) }, { $set: { deleted: 1 } });\n            if (response.nModified > 0) {\n                res.json({\n                    code: 200,\n                    message: 'Succesfully deleted!.',\n                });\n            }\n            else {\n                res.json({\n                    code: 500,\n                    message: 'Delete not successfull!. Please check the id',\n                });\n            }\n        }\n        catch (error) {\n            next(error);\n        }\n    }\n}\nexports.AssignmentRoute = AssignmentRoute;\nAssignmentRoute.path = '/assignment';\nconst Update = async (req, res, data) => {\n    const response = await assignment_1.Assignment.updateOne({ _id: mongoose_1.Types.ObjectId(req.params.id) }, { $set: req.body });\n    if (response.nModified > 0) {\n        res.json({\n            code: 200,\n            message: 'Succesfully updated!.',\n        });\n    }\n    else {\n        res.json({\n            code: 500,\n            message: 'Update not successfull!. Please check the request data',\n        });\n    }\n};\nconst Create = async (res, data) => {\n    const response = await data.save();\n    res.json({ code: 200, message: 'Succesfully created!.', data: response });\n};\nconst AssignmentExist = async (query) => await assignment_1.Assignment.findOne(query);\nfunction unSetDataWhichIsNotRequired(req) {\n    delete req.body._id;\n    delete req.body.createdAt;\n}\nasync function AddTags(req, res) {\n    const condition = { _id: mongoose_1.Types.ObjectId(req.params.id) };\n    const query = { $push: { tags: { $each: req.body.tags } }, upsert: true };\n    const response = await assignment_1.Assignment.updateOne(condition, query);\n    if (response.nModified > 0) {\n        res.json({ code: 200, message: 'Succesfully updated!.', });\n    }\n    else {\n        res.status(500).json({ code: 500, message: 'Update not successfull!. Please check the request data', });\n    }\n}\nfunction FormatRequestData(data) {\n    if (data && data.title)\n        data.title = data.title.trim();\n    if (data && data.title)\n        data.uniqueTitle = data.title.toLowerCase().trim();\n    if (data && data.type)\n        data.type = data.type.trim();\n    if (data && data.description)\n        data.description = data.description.trim();\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yb3V0ZXMvYXNzaWdubWVudC9hc3NpZ25tZW50LnJvdXRlLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcm91dGVzL2Fzc2lnbm1lbnQvYXNzaWdubWVudC5yb3V0ZS50cz8xNWExIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Bc3NpZ25tZW50Um91dGUgPSB2b2lkIDA7XG5jb25zdCBzZXJ2aWNlc18xID0gcmVxdWlyZShcIkAvc2VydmljZXNcIik7XG5jb25zdCByb3V0ZV8xID0gcmVxdWlyZShcIi4uL3JvdXRlXCIpO1xuY29uc3QgbW9uZ29vc2VfMSA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTtcbmNvbnN0IGFzc2lnbm1lbnRfMSA9IHJlcXVpcmUoXCIuLi8uLi9zY2hlbWEvYXNzaWdubWVudFwiKTtcbmNvbnN0IHN3YWdnZXJKc0RvYyA9IHJlcXVpcmUoXCJzd2FnZ2VyLWpzZG9jXCIpO1xuY29uc3Qgc3dhZ2dlclVJID0gcmVxdWlyZShcInN3YWdnZXItdWktZXhwcmVzc1wiKTtcbmNvbnN0IHN3YWdnZXJPcHRpb25zID0ge1xuICAgIGV4cGxvcmVyOiB0cnVlLFxuICAgIHN3YWdnZXJEZWZpbml0aW9uOiB7XG4gICAgICAgIGluZm86IFwiS2FwbGFuIGFzc2lnbm1lbnQgQVBJXCIsXG4gICAgICAgIHZlcnNpb246IFwiMS4wLjBcIlxuICAgIH0sXG4gICAgYXBpczogW1wiLi9zcmMvcm91dGVzL2Fzc2lnbm1lbnQvaW5kZXgudHNcIl1cbn07XG5jb25zdCBzd2FnZ2VyRG9jcyA9IHN3YWdnZXJKc0RvYyhzd2FnZ2VyT3B0aW9ucyk7XG4vKipcbiAqIEBhcGkge2dldH0gL1xuICogQGFwaU5hbWUgQXNzaWdubWVudFJlcXVlc3RcbiAqIEBhcGlHcm91cCBBc3NpZ25tZW50UmVxdWVzdFxuICpcbiAqIEBhcGlTdWNjZXNzIHtTdHJpbmd9IHR5cGUgSnNvbiBUeXBlLlxuICovXG5jbGFzcyBBc3NpZ25tZW50Um91dGUgZXh0ZW5kcyByb3V0ZV8xLkJhc2VSb3V0ZSB7XG4gICAgLyoqXG4gICAgICogQGNsYXNzIEFzc2lnbm1lbnRSb3V0ZVxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLkNyZWF0ZU5ld0Fzc2lnbm1lbnQgPSB0aGlzLkNyZWF0ZU5ld0Fzc2lnbm1lbnQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgcm91dGVyKCkge1xuICAgICAgICBpZiAoIUFzc2lnbm1lbnRSb3V0ZS5pbnN0YW5jZSkge1xuICAgICAgICAgICAgQXNzaWdubWVudFJvdXRlLmluc3RhbmNlID0gbmV3IEFzc2lnbm1lbnRSb3V0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBBc3NpZ25tZW50Um91dGUuaW5zdGFuY2Uucm91dGVyO1xuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICAvLyBsb2dcbiAgICAgICAgc2VydmljZXNfMS5sb2dnZXIuaW5mbygnW0Fzc2lnbm1lbnRSb3V0ZV0gQ3JlYXRpbmcgQXNzaWdubWVudFJvdXRlIHJvdXRlLicpO1xuICAgICAgICAvLyBhZGQgaW5kZXggcGFnZSByb3V0ZVxuICAgICAgICB0aGlzLnJvdXRlci51c2UoJy9hcGktZG9jcycsIHN3YWdnZXJVSS5zZXJ2ZSwgc3dhZ2dlclVJLnNldHVwKHN3YWdnZXJEb2NzKSk7XG4gICAgICAgIHRoaXMucm91dGVyLmdldCgnL2xpc3QnLCB0aGlzLmxpc3QpO1xuICAgICAgICB0aGlzLnJvdXRlci5wb3N0KCcvY3JlYXRlJywgdGhpcy5DcmVhdGVOZXdBc3NpZ25tZW50KTtcbiAgICAgICAgdGhpcy5yb3V0ZXIuZ2V0KCcvc2VhcmNoJywgdGhpcy5zZWFyY2hBc3NpZ25tZW50QnlUYWdzKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIucHV0KCcvdXBkYXRlLzppZCcsIHRoaXMuVXBkYXRlQXNzaWdubWVudCk7XG4gICAgICAgIHRoaXMucm91dGVyLnB1dCgnL2FkZC10YWdzLzppZCcsIHRoaXMuQWRkVGFncyk7XG4gICAgICAgIHRoaXMucm91dGVyLmRlbGV0ZSgnL2RlbGV0ZS86aWQnLCB0aGlzLkRlbGV0ZUFzc2lnbm1lbnQpO1xuICAgICAgICB0aGlzLnJvdXRlci5nZXQoJy86aWQnLCB0aGlzLkRldGFpbHMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBzd2FnZ2VyXG4gICAgICogL2xpc3Q6XG4gICAgICogICAgICBnZXQ6XG4gICAgICogICAgICAgICBkZXNjcmlwdGlvbjogR2V0IGFsbCBhc3NpZ25tZW50XG4gICAgICogICAgICAgICAgICByZXNwb25zZXM6XG4gICAgICogICAgICAgICAgICAgICAyMDBcbiAgICAgKiAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTdWNjZXNzXG4gICAgICovXG4gICAgYXN5bmMgbGlzdChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHF1ZXJ5ID0gW1xuICAgICAgICAgICAgICAgIHsgJG1hdGNoOiB7IGRlbGV0ZWQ6IHsgJG5lOiAxIH0gfSB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJHByb2plY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9pZDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnczogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRBdDogeyAkZGF0ZVRvU3RyaW5nOiB7IGZvcm1hdDogXCIlWS0lbS0lZFwiLCBkYXRlOiBcIiRjcmVhdGVkQXRcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHsgJHNvcnQ6IHsgY3JlYXRlZEF0OiAtMSB9IH1cbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFzc2lnbm1lbnRfMS5Bc3NpZ25tZW50LmFnZ3JlZ2F0ZShxdWVyeSk7XG4gICAgICAgICAgICByZXMuanNvbih7IGNvZGU6IDIwMCwgdG90YWw6IHJlc3BvbnNlLmxlbmd0aCwgZGF0YTogcmVzcG9uc2UsIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgbmV4dChlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQHN3YWdnZXJcbiAgICAgKiAvOmlkXG4gICAgICogQHBhcmFtIHJlcVxuICAgICAqIEBwYXJhbSByZXNcbiAgICAgKiBAcGFyYW0gbmV4dFxuICAgICAqL1xuICAgIGFzeW5jIERldGFpbHMocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBxdWVyeSA9IFtcbiAgICAgICAgICAgICAgICB7ICRtYXRjaDogeyBfaWQ6IG1vbmdvb3NlXzEuVHlwZXMuT2JqZWN0SWQocmVxLnBhcmFtcy5pZCkgfSB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJHByb2plY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9pZDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnczogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRBdDogeyAkZGF0ZVRvU3RyaW5nOiB7IGZvcm1hdDogXCIlWS0lbS0lZFwiLCBkYXRlOiBcIiRjcmVhdGVkQXRcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhc3NpZ25tZW50XzEuQXNzaWdubWVudC5hZ2dyZWdhdGUocXVlcnkpO1xuICAgICAgICAgICAgcmVzLmpzb24oeyBjb2RlOiAyMDAsIGRhdGE6IHJlc3BvbnNlWzBdIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgbmV4dChlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgc2VhcmNoQXNzaWdubWVudEJ5VGFncyhyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHF1ZXJ5ID0gW1xuICAgICAgICAgICAgICAgIHsgJG1hdGNoOiB7ICR0ZXh0OiB7ICRzZWFyY2g6IHJlcS5xdWVyeS5rZXkgfSB9IH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAkcHJvamVjdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgX2lkOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWdzOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0OiB7ICRkYXRlVG9TdHJpbmc6IHsgZm9ybWF0OiBcIiVZLSVtLSVkXCIsIGRhdGU6IFwiJGNyZWF0ZWRBdFwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgeyAkc29ydDogeyBjcmVhdGVkQXQ6IC0xIH0gfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXNzaWdubWVudF8xLkFzc2lnbm1lbnQuYWdncmVnYXRlKFtxdWVyeV0pO1xuICAgICAgICAgICAgcmVzLmpzb24oeyBjb2RlOiAyMDAsIGRhdGE6IHJlc3BvbnNlIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgbmV4dChlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgQ3JlYXRlTmV3QXNzaWdubWVudChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgRm9ybWF0UmVxdWVzdERhdGEocmVxLmJvZHkpO1xuICAgICAgICAgICAgaWYgKGF3YWl0IEFzc2lnbm1lbnRFeGlzdCh7IHVuaXF1ZVRpdGxlOiByZXEuYm9keS51bmlxdWVUaXRsZSB9KSkge1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgY29kZTogNDAwLCBlcnJvcjogJ0Fzc2lnbm1lbnQgYWxyZWFkeSBleGlzdCEuJywgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3QXNzaWdubWVudCA9IG5ldyBhc3NpZ25tZW50XzEuQXNzaWdubWVudChyZXEuYm9keSk7XG4gICAgICAgICAgICAgICAgYXdhaXQgQ3JlYXRlKHJlcywgbmV3QXNzaWdubWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBuZXh0KGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBVcGRhdGVBc3NpZ25tZW50KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB1blNldERhdGFXaGljaElzTm90UmVxdWlyZWQocmVxKTtcbiAgICAgICAgICAgIEZvcm1hdFJlcXVlc3REYXRhKHJlcS5ib2R5KTtcbiAgICAgICAgICAgIGlmIChhd2FpdCBBc3NpZ25tZW50RXhpc3QoeyBfaWQ6IHsgJG5lOiBtb25nb29zZV8xLlR5cGVzLk9iamVjdElkKHJlcS5wYXJhbXMuaWQpIH0sIHVuaXF1ZVRpdGxlOiByZXEuYm9keS51bmlxdWVUaXRsZSB9KSkge1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgY29kZTogNDAwLCBlcnJvcjogJ0Fzc2lnbm1lbnQgYWxyZWFkeSBleGlzdCEuJywgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBVcGRhdGUocmVxLCByZXMsIHJlcS5ib2R5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIG5leHQoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIEFkZFRhZ3MocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghcmVxLmJvZHkudGFncyB8fCByZXEuYm9keS50YWdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgY29kZTogNDAwLCBtZXNzYWdlOiAnVGFncyBhcmUgcmVxdWlyZWQuJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGF3YWl0IEFkZFRhZ3MocmVxLCByZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgbmV4dChlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgRGVsZXRlQXNzaWdubWVudChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhc3NpZ25tZW50XzEuQXNzaWdubWVudC51cGRhdGVPbmUoeyBfaWQ6IG1vbmdvb3NlXzEuVHlwZXMuT2JqZWN0SWQocmVxLnBhcmFtcy5pZCkgfSwgeyAkc2V0OiB7IGRlbGV0ZWQ6IDEgfSB9KTtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5uTW9kaWZpZWQgPiAwKSB7XG4gICAgICAgICAgICAgICAgcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICBjb2RlOiAyMDAsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdTdWNjZXNmdWxseSBkZWxldGVkIS4nLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICBjb2RlOiA1MDAsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdEZWxldGUgbm90IHN1Y2Nlc3NmdWxsIS4gUGxlYXNlIGNoZWNrIHRoZSBpZCcsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBuZXh0KGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuQXNzaWdubWVudFJvdXRlID0gQXNzaWdubWVudFJvdXRlO1xuQXNzaWdubWVudFJvdXRlLnBhdGggPSAnL2Fzc2lnbm1lbnQnO1xuY29uc3QgVXBkYXRlID0gYXN5bmMgKHJlcSwgcmVzLCBkYXRhKSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhc3NpZ25tZW50XzEuQXNzaWdubWVudC51cGRhdGVPbmUoeyBfaWQ6IG1vbmdvb3NlXzEuVHlwZXMuT2JqZWN0SWQocmVxLnBhcmFtcy5pZCkgfSwgeyAkc2V0OiByZXEuYm9keSB9KTtcbiAgICBpZiAocmVzcG9uc2Uubk1vZGlmaWVkID4gMCkge1xuICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICBjb2RlOiAyMDAsXG4gICAgICAgICAgICBtZXNzYWdlOiAnU3VjY2VzZnVsbHkgdXBkYXRlZCEuJyxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICBjb2RlOiA1MDAsXG4gICAgICAgICAgICBtZXNzYWdlOiAnVXBkYXRlIG5vdCBzdWNjZXNzZnVsbCEuIFBsZWFzZSBjaGVjayB0aGUgcmVxdWVzdCBkYXRhJyxcbiAgICAgICAgfSk7XG4gICAgfVxufTtcbmNvbnN0IENyZWF0ZSA9IGFzeW5jIChyZXMsIGRhdGEpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRhdGEuc2F2ZSgpO1xuICAgIHJlcy5qc29uKHsgY29kZTogMjAwLCBtZXNzYWdlOiAnU3VjY2VzZnVsbHkgY3JlYXRlZCEuJywgZGF0YTogcmVzcG9uc2UgfSk7XG59O1xuY29uc3QgQXNzaWdubWVudEV4aXN0ID0gYXN5bmMgKHF1ZXJ5KSA9PiBhd2FpdCBhc3NpZ25tZW50XzEuQXNzaWdubWVudC5maW5kT25lKHF1ZXJ5KTtcbmZ1bmN0aW9uIHVuU2V0RGF0YVdoaWNoSXNOb3RSZXF1aXJlZChyZXEpIHtcbiAgICBkZWxldGUgcmVxLmJvZHkuX2lkO1xuICAgIGRlbGV0ZSByZXEuYm9keS5jcmVhdGVkQXQ7XG59XG5hc3luYyBmdW5jdGlvbiBBZGRUYWdzKHJlcSwgcmVzKSB7XG4gICAgY29uc3QgY29uZGl0aW9uID0geyBfaWQ6IG1vbmdvb3NlXzEuVHlwZXMuT2JqZWN0SWQocmVxLnBhcmFtcy5pZCkgfTtcbiAgICBjb25zdCBxdWVyeSA9IHsgJHB1c2g6IHsgdGFnczogeyAkZWFjaDogcmVxLmJvZHkudGFncyB9IH0sIHVwc2VydDogdHJ1ZSB9O1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXNzaWdubWVudF8xLkFzc2lnbm1lbnQudXBkYXRlT25lKGNvbmRpdGlvbiwgcXVlcnkpO1xuICAgIGlmIChyZXNwb25zZS5uTW9kaWZpZWQgPiAwKSB7XG4gICAgICAgIHJlcy5qc29uKHsgY29kZTogMjAwLCBtZXNzYWdlOiAnU3VjY2VzZnVsbHkgdXBkYXRlZCEuJywgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGNvZGU6IDUwMCwgbWVzc2FnZTogJ1VwZGF0ZSBub3Qgc3VjY2Vzc2Z1bGwhLiBQbGVhc2UgY2hlY2sgdGhlIHJlcXVlc3QgZGF0YScsIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIEZvcm1hdFJlcXVlc3REYXRhKGRhdGEpIHtcbiAgICBpZiAoZGF0YSAmJiBkYXRhLnRpdGxlKVxuICAgICAgICBkYXRhLnRpdGxlID0gZGF0YS50aXRsZS50cmltKCk7XG4gICAgaWYgKGRhdGEgJiYgZGF0YS50aXRsZSlcbiAgICAgICAgZGF0YS51bmlxdWVUaXRsZSA9IGRhdGEudGl0bGUudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gICAgaWYgKGRhdGEgJiYgZGF0YS50eXBlKVxuICAgICAgICBkYXRhLnR5cGUgPSBkYXRhLnR5cGUudHJpbSgpO1xuICAgIGlmIChkYXRhICYmIGRhdGEuZGVzY3JpcHRpb24pXG4gICAgICAgIGRhdGEuZGVzY3JpcHRpb24gPSBkYXRhLmRlc2NyaXB0aW9uLnRyaW0oKTtcbn1cbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./routes/assignment/assignment.route.ts\n");

/***/ }),

/***/ "./routes/assignment/index.ts":
/*!************************************!*\
  !*** ./routes/assignment/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\n    for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__exportStar(__webpack_require__(/*! ./assignment.route */ \"./routes/assignment/assignment.route.ts\"), exports);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yb3V0ZXMvYXNzaWdubWVudC9pbmRleC50cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3JvdXRlcy9hc3NpZ25tZW50L2luZGV4LnRzP2UzODAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9hc3NpZ25tZW50LnJvdXRlXCIpLCBleHBvcnRzKTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./routes/assignment/index.ts\n");

/***/ }),

/***/ "./routes/index.ts":
/*!*************************!*\
  !*** ./routes/index.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.ApiRoutes = void 0;\nconst services_1 = __webpack_require__(/*! @/services */ \"./services/index.ts\");\nconst route_1 = __webpack_require__(/*! ./route */ \"./routes/route.ts\");\nconst assignment_1 = __webpack_require__(/*! ./assignment */ \"./routes/assignment/index.ts\");\n/**\n * / route\n *\n * @class User\n */\nclass ApiRoutes extends route_1.BaseRoute {\n    /**\n     * @class ApiRoutes\n     * @constructor\n     */\n    constructor() {\n        super();\n        this.get = this.get.bind(this);\n        this.init();\n    }\n    /**\n     * @class ApiRoute\n     * @method getRouter\n     * @returns {Router}\n     */\n    static get router() {\n        if (!ApiRoutes.instance) {\n            ApiRoutes.instance = new ApiRoutes();\n        }\n        return ApiRoutes.instance.router;\n    }\n    /**\n     * @class ApiRoute\n     * @method init\n     */\n    init() {\n        // log\n        services_1.logger.info('[ApiRoute] Creating delivery routes.');\n        // add index page route\n        this.router.get('/', this.get);\n        this.router.use(assignment_1.AssignmentRoute.path, assignment_1.AssignmentRoute.router);\n    }\n    /**\n     * @class ApiRoute\n     * @method index\n     * @param req {Request} The express Request object.\n     * @param res {Response} The express Response object.\n     * @param next {NextFunction} Execute the next method.\n     * @swagger\n     * /api:\n     *   get:\n     *      description: Get all assignment\n     *      responses:\n     *          200\n     *              description: Success\n     */\n    async get(req, res, next) {\n        res.status(200).json({ online: true });\n    }\n}\nexports.ApiRoutes = ApiRoutes;\nApiRoutes.path = '/api';\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yb3V0ZXMvaW5kZXgudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yb3V0ZXMvaW5kZXgudHM/YzllNiJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQXBpUm91dGVzID0gdm9pZCAwO1xuY29uc3Qgc2VydmljZXNfMSA9IHJlcXVpcmUoXCJAL3NlcnZpY2VzXCIpO1xuY29uc3Qgcm91dGVfMSA9IHJlcXVpcmUoXCIuL3JvdXRlXCIpO1xuY29uc3QgYXNzaWdubWVudF8xID0gcmVxdWlyZShcIi4vYXNzaWdubWVudFwiKTtcbi8qKlxuICogLyByb3V0ZVxuICpcbiAqIEBjbGFzcyBVc2VyXG4gKi9cbmNsYXNzIEFwaVJvdXRlcyBleHRlbmRzIHJvdXRlXzEuQmFzZVJvdXRlIHtcbiAgICAvKipcbiAgICAgKiBAY2xhc3MgQXBpUm91dGVzXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZ2V0ID0gdGhpcy5nZXQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBjbGFzcyBBcGlSb3V0ZVxuICAgICAqIEBtZXRob2QgZ2V0Um91dGVyXG4gICAgICogQHJldHVybnMge1JvdXRlcn1cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0IHJvdXRlcigpIHtcbiAgICAgICAgaWYgKCFBcGlSb3V0ZXMuaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIEFwaVJvdXRlcy5pbnN0YW5jZSA9IG5ldyBBcGlSb3V0ZXMoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQXBpUm91dGVzLmluc3RhbmNlLnJvdXRlcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGNsYXNzIEFwaVJvdXRlXG4gICAgICogQG1ldGhvZCBpbml0XG4gICAgICovXG4gICAgaW5pdCgpIHtcbiAgICAgICAgLy8gbG9nXG4gICAgICAgIHNlcnZpY2VzXzEubG9nZ2VyLmluZm8oJ1tBcGlSb3V0ZV0gQ3JlYXRpbmcgZGVsaXZlcnkgcm91dGVzLicpO1xuICAgICAgICAvLyBhZGQgaW5kZXggcGFnZSByb3V0ZVxuICAgICAgICB0aGlzLnJvdXRlci5nZXQoJy8nLCB0aGlzLmdldCk7XG4gICAgICAgIHRoaXMucm91dGVyLnVzZShhc3NpZ25tZW50XzEuQXNzaWdubWVudFJvdXRlLnBhdGgsIGFzc2lnbm1lbnRfMS5Bc3NpZ25tZW50Um91dGUucm91dGVyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGNsYXNzIEFwaVJvdXRlXG4gICAgICogQG1ldGhvZCBpbmRleFxuICAgICAqIEBwYXJhbSByZXEge1JlcXVlc3R9IFRoZSBleHByZXNzIFJlcXVlc3Qgb2JqZWN0LlxuICAgICAqIEBwYXJhbSByZXMge1Jlc3BvbnNlfSBUaGUgZXhwcmVzcyBSZXNwb25zZSBvYmplY3QuXG4gICAgICogQHBhcmFtIG5leHQge05leHRGdW5jdGlvbn0gRXhlY3V0ZSB0aGUgbmV4dCBtZXRob2QuXG4gICAgICogQHN3YWdnZXJcbiAgICAgKiAvYXBpOlxuICAgICAqICAgZ2V0OlxuICAgICAqICAgICAgZGVzY3JpcHRpb246IEdldCBhbGwgYXNzaWdubWVudFxuICAgICAqICAgICAgcmVzcG9uc2VzOlxuICAgICAqICAgICAgICAgIDIwMFxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogU3VjY2Vzc1xuICAgICAqL1xuICAgIGFzeW5jIGdldChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9ubGluZTogdHJ1ZSB9KTtcbiAgICB9XG59XG5leHBvcnRzLkFwaVJvdXRlcyA9IEFwaVJvdXRlcztcbkFwaVJvdXRlcy5wYXRoID0gJy9hcGknO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./routes/index.ts\n");

/***/ }),

/***/ "./routes/route.ts":
/*!*************************!*\
  !*** ./routes/route.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.BaseRoute = void 0;\nconst services_1 = __webpack_require__(/*! @/services */ \"./services/index.ts\");\nconst express_1 = __webpack_require__(/*! express */ \"express\");\nclass BaseRoute {\n    constructor() {\n        /**\n         * Constructor\n         *\n         * @class BaseRoute\n         * @constructor\n         */\n        this.router = express_1.Router();\n        this.connection = {};\n    }\n    async connect(name) {\n        return {};\n    }\n    async disconnect(name) {\n        try {\n            return true;\n        }\n        catch (err) {\n            services_1.logger.error('Error while disconnecting from database:', err);\n            return false;\n        }\n    }\n}\nexports.BaseRoute = BaseRoute;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yb3V0ZXMvcm91dGUudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yb3V0ZXMvcm91dGUudHM/MmZhNiJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQmFzZVJvdXRlID0gdm9pZCAwO1xuY29uc3Qgc2VydmljZXNfMSA9IHJlcXVpcmUoXCJAL3NlcnZpY2VzXCIpO1xuY29uc3QgZXhwcmVzc18xID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5jbGFzcyBCYXNlUm91dGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29uc3RydWN0b3JcbiAgICAgICAgICpcbiAgICAgICAgICogQGNsYXNzIEJhc2VSb3V0ZVxuICAgICAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucm91dGVyID0gZXhwcmVzc18xLlJvdXRlcigpO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSB7fTtcbiAgICB9XG4gICAgYXN5bmMgY29ubmVjdChuYW1lKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgYXN5bmMgZGlzY29ubmVjdChuYW1lKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBzZXJ2aWNlc18xLmxvZ2dlci5lcnJvcignRXJyb3Igd2hpbGUgZGlzY29ubmVjdGluZyBmcm9tIGRhdGFiYXNlOicsIGVycik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkJhc2VSb3V0ZSA9IEJhc2VSb3V0ZTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./routes/route.ts\n");

/***/ }),

/***/ "./schema/assignment.ts":
/*!******************************!*\
  !*** ./schema/assignment.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.Assignment = exports.AssignmentSchema = void 0;\nconst mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\nexports.AssignmentSchema = new mongoose_1.Schema({\n    title: {\n        type: String,\n        required: true\n    },\n    uniqueTitle: {\n        type: String,\n    },\n    description: {\n        type: String,\n        required: true\n    },\n    type: {\n        type: String,\n        required: true\n    },\n    duration: {\n        type: Number\n    },\n    tags: {\n        type: [String]\n    },\n    createdAt: {\n        type: Date,\n        default: new Date()\n    },\n    deleted: {\n        type: Number,\n        default: 0\n    },\n});\nexports.Assignment = mongoose_1.model('assignment', exports.AssignmentSchema, 'assignment');\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zY2hlbWEvYXNzaWdubWVudC50cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NjaGVtYS9hc3NpZ25tZW50LnRzPzUyOGUiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkFzc2lnbm1lbnQgPSBleHBvcnRzLkFzc2lnbm1lbnRTY2hlbWEgPSB2b2lkIDA7XG5jb25zdCBtb25nb29zZV8xID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpO1xuZXhwb3J0cy5Bc3NpZ25tZW50U2NoZW1hID0gbmV3IG1vbmdvb3NlXzEuU2NoZW1hKHtcbiAgICB0aXRsZToge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICB1bmlxdWVUaXRsZToge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgfSxcbiAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICB0eXBlOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIGR1cmF0aW9uOiB7XG4gICAgICAgIHR5cGU6IE51bWJlclxuICAgIH0sXG4gICAgdGFnczoge1xuICAgICAgICB0eXBlOiBbU3RyaW5nXVxuICAgIH0sXG4gICAgY3JlYXRlZEF0OiB7XG4gICAgICAgIHR5cGU6IERhdGUsXG4gICAgICAgIGRlZmF1bHQ6IG5ldyBEYXRlKClcbiAgICB9LFxuICAgIGRlbGV0ZWQ6IHtcbiAgICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgICBkZWZhdWx0OiAwXG4gICAgfSxcbn0pO1xuZXhwb3J0cy5Bc3NpZ25tZW50ID0gbW9uZ29vc2VfMS5tb2RlbCgnYXNzaWdubWVudCcsIGV4cG9ydHMuQXNzaWdubWVudFNjaGVtYSwgJ2Fzc2lnbm1lbnQnKTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./schema/assignment.ts\n");

/***/ }),

/***/ "./services/index.ts":
/*!***************************!*\
  !*** ./services/index.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\n    for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__exportStar(__webpack_require__(/*! ./logger */ \"./services/logger.ts\"), exports);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zZXJ2aWNlcy9pbmRleC50cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NlcnZpY2VzL2luZGV4LnRzP2FlNTMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9sb2dnZXJcIiksIGV4cG9ydHMpO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./services/index.ts\n");

/***/ }),

/***/ "./services/logger.ts":
/*!****************************!*\
  !*** ./services/logger.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.logger = exports.dbg = void 0;\nconst debug = __webpack_require__(/*! debug */ \"debug\");\nconst fs = __webpack_require__(/*! fs */ \"fs\");\nconst winston = __webpack_require__(/*! winston */ \"winston\");\nconst PATHS = {\n    LOG: `${process.cwd()}/logs`,\n    LOG_ERROR: `${process.cwd()}/logs/_error.log`,\n    LOG_INFO: `${process.cwd()}/logs/_info.log`,\n    LOG_VERBOSE: `${process.cwd()}/logs/_warn.log`\n};\n// ensure log directory exists\n(() => fs.existsSync(PATHS.LOG) || fs.mkdirSync(PATHS.LOG))();\nexports.dbg = debug('express:server');\nexports.logger = winston.createLogger({\n    exitOnError: false,\n    format: winston.format.combine(winston.format.colorize(), winston.format.splat(), winston.format.simple()),\n    transports: [\n        new winston.transports.File({\n            filename: PATHS.LOG_INFO,\n            handleExceptions: true,\n            level: 'info',\n            // maxFiles: 2,\n            maxsize: 5242880,\n        }),\n        new winston.transports.File({\n            filename: PATHS.LOG_ERROR,\n            handleExceptions: true,\n            level: 'error',\n            // maxFiles: 2,\n            maxsize: 5242880,\n        }),\n        new winston.transports.Console({\n            handleExceptions: true,\n            level: 'debug',\n        }),\n        new winston.transports.File({\n            filename: PATHS.LOG_VERBOSE,\n            handleExceptions: true,\n            level: 'warn',\n            // maxFiles: 2,\n            maxsize: 5242880,\n        }),\n    ],\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zZXJ2aWNlcy9sb2dnZXIudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zZXJ2aWNlcy9sb2dnZXIudHM/ZTgyYSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubG9nZ2VyID0gZXhwb3J0cy5kYmcgPSB2b2lkIDA7XG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoXCJkZWJ1Z1wiKTtcbmNvbnN0IGZzID0gcmVxdWlyZShcImZzXCIpO1xuY29uc3Qgd2luc3RvbiA9IHJlcXVpcmUoXCJ3aW5zdG9uXCIpO1xuY29uc3QgUEFUSFMgPSB7XG4gICAgTE9HOiBgJHtwcm9jZXNzLmN3ZCgpfS9sb2dzYCxcbiAgICBMT0dfRVJST1I6IGAke3Byb2Nlc3MuY3dkKCl9L2xvZ3MvX2Vycm9yLmxvZ2AsXG4gICAgTE9HX0lORk86IGAke3Byb2Nlc3MuY3dkKCl9L2xvZ3MvX2luZm8ubG9nYCxcbiAgICBMT0dfVkVSQk9TRTogYCR7cHJvY2Vzcy5jd2QoKX0vbG9ncy9fd2Fybi5sb2dgXG59O1xuLy8gZW5zdXJlIGxvZyBkaXJlY3RvcnkgZXhpc3RzXG4oKCkgPT4gZnMuZXhpc3RzU3luYyhQQVRIUy5MT0cpIHx8IGZzLm1rZGlyU3luYyhQQVRIUy5MT0cpKSgpO1xuZXhwb3J0cy5kYmcgPSBkZWJ1ZygnZXhwcmVzczpzZXJ2ZXInKTtcbmV4cG9ydHMubG9nZ2VyID0gd2luc3Rvbi5jcmVhdGVMb2dnZXIoe1xuICAgIGV4aXRPbkVycm9yOiBmYWxzZSxcbiAgICBmb3JtYXQ6IHdpbnN0b24uZm9ybWF0LmNvbWJpbmUod2luc3Rvbi5mb3JtYXQuY29sb3JpemUoKSwgd2luc3Rvbi5mb3JtYXQuc3BsYXQoKSwgd2luc3Rvbi5mb3JtYXQuc2ltcGxlKCkpLFxuICAgIHRyYW5zcG9ydHM6IFtcbiAgICAgICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5GaWxlKHtcbiAgICAgICAgICAgIGZpbGVuYW1lOiBQQVRIUy5MT0dfSU5GTyxcbiAgICAgICAgICAgIGhhbmRsZUV4Y2VwdGlvbnM6IHRydWUsXG4gICAgICAgICAgICBsZXZlbDogJ2luZm8nLFxuICAgICAgICAgICAgLy8gbWF4RmlsZXM6IDIsXG4gICAgICAgICAgICBtYXhzaXplOiA1MjQyODgwLFxuICAgICAgICB9KSxcbiAgICAgICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5GaWxlKHtcbiAgICAgICAgICAgIGZpbGVuYW1lOiBQQVRIUy5MT0dfRVJST1IsXG4gICAgICAgICAgICBoYW5kbGVFeGNlcHRpb25zOiB0cnVlLFxuICAgICAgICAgICAgbGV2ZWw6ICdlcnJvcicsXG4gICAgICAgICAgICAvLyBtYXhGaWxlczogMixcbiAgICAgICAgICAgIG1heHNpemU6IDUyNDI4ODAsXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGUoe1xuICAgICAgICAgICAgaGFuZGxlRXhjZXB0aW9uczogdHJ1ZSxcbiAgICAgICAgICAgIGxldmVsOiAnZGVidWcnLFxuICAgICAgICB9KSxcbiAgICAgICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5GaWxlKHtcbiAgICAgICAgICAgIGZpbGVuYW1lOiBQQVRIUy5MT0dfVkVSQk9TRSxcbiAgICAgICAgICAgIGhhbmRsZUV4Y2VwdGlvbnM6IHRydWUsXG4gICAgICAgICAgICBsZXZlbDogJ3dhcm4nLFxuICAgICAgICAgICAgLy8gbWF4RmlsZXM6IDIsXG4gICAgICAgICAgICBtYXhzaXplOiA1MjQyODgwLFxuICAgICAgICB9KSxcbiAgICBdLFxufSk7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./services/logger.ts\n");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),

/***/ "config":
/*!*************************!*\
  !*** external "config" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("config");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),

/***/ "errorhandler":
/*!*******************************!*\
  !*** external "errorhandler" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("errorhandler");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "express-status-monitor":
/*!*****************************************!*\
  !*** external "express-status-monitor" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-status-monitor");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "method-override":
/*!**********************************!*\
  !*** external "method-override" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("method-override");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "swagger-jsdoc":
/*!********************************!*\
  !*** external "swagger-jsdoc" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("swagger-jsdoc");

/***/ }),

/***/ "swagger-ui-express":
/*!*************************************!*\
  !*** external "swagger-ui-express" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("swagger-ui-express");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ })

/******/ });