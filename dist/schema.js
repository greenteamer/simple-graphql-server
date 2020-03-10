"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("graphql-import-node");
var apollo_server_express_1 = require("apollo-server-express");
var typeDefs = __importStar(require("./schema/schema.graphql"));
var resolverMap_1 = __importDefault(require("./resolverMap"));
var schema = apollo_server_express_1.makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolverMap_1.default,
});
exports.default = schema;
