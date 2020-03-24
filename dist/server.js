"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var apollo_server_express_1 = require("apollo-server-express");
var graphql_depth_limit_1 = __importDefault(require("graphql-depth-limit"));
var http_1 = require("http");
var compression_1 = __importDefault(require("compression"));
var cors_1 = __importDefault(require("cors"));
var schema_1 = __importDefault(require("./schema"));
var typeorm_1 = require("typeorm");
var models_1 = require("./models");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var connection_1, server, app, httpServer, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, typeorm_1.createConnection()];
            case 1:
                connection_1 = _a.sent();
                if (!connection_1.isConnected) {
                    throw Error('connection error');
                }
                server = new apollo_server_express_1.ApolloServer({
                    schema: schema_1.default,
                    validationRules: [graphql_depth_limit_1.default(7)],
                    context: function (_a) {
                        var req = _a.req;
                        return __awaiter(void 0, void 0, void 0, function () {
                            var token, me;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        token = req.headers.authorization;
                                        if (token === undefined)
                                            return [2, { currentUser: null }];
                                        return [4, connection_1.getRepository(models_1.User).findOne({ token: token })];
                                    case 1:
                                        me = _b.sent();
                                        return [2, { me: me }];
                                }
                            });
                        });
                    }
                });
                app = express_1.default();
                app.use('*', cors_1.default());
                app.use(compression_1.default());
                server.applyMiddleware({ app: app, path: '/graphql' });
                httpServer = http_1.createServer(app);
                httpServer.listen({ port: 3000 }, function () { return console.log("\n\uD83D\uDE80      GraphQL is now running on http://localhost:3000/graphql"); });
                return [3, 3];
            case 2:
                err_1 = _a.sent();
                console.error('!!! start app error', err_1);
                return [3, 3];
            case 3: return [2];
        }
    });
}); })();
