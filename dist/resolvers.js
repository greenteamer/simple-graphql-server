"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = __importDefault(require("./data"));
var typeorm_1 = require("typeorm");
var models_1 = require("./models");
var token_1 = require("./utils/token");
var resolverMap = {
    Query: {
        me: function () {
            return data_1.default.users[0];
        },
        user: function (id) {
            return data_1.default.users.find(function (user) { return user.id === id; });
        },
        users: function () { return __awaiter(void 0, void 0, void 0, function () {
            var allUsers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, typeorm_1.getRepository(models_1.User).find()];
                    case 1:
                        allUsers = _a.sent();
                        return [2, allUsers];
                }
            });
        }); },
        posts: function () {
            return data_1.default.posts;
        },
        reviews: function () {
            return data_1.default.reviews;
        },
        post: function (_, _a) {
            var id = _a.id;
            console.log(">>> id: ", id);
            return data_1.default.posts.find(function (post) { return post.id === id; });
        }
    },
    Mutation: {
        signInUser: function (_, _a) {
            var signInInput = _a.signInInput;
            return __awaiter(void 0, void 0, void 0, function () {
                var email, password, userRepo, user, token;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            email = signInInput.email, password = signInInput.password;
                            userRepo = typeorm_1.getRepository(models_1.User);
                            return [4, userRepo.findOne({
                                    select: ['id', 'email', 'name', 'token'],
                                    where: { email: email, password: password },
                                })];
                        case 1:
                            user = _b.sent();
                            if (!user)
                                return [2, null];
                            token = token_1.getJWTToken(email, password);
                            user.token = token;
                            userRepo.save(user);
                            return [2, user];
                    }
                });
            });
        },
        addUser: function (_, _a) {
            var userInput = _a.user;
            return __awaiter(void 0, void 0, void 0, function () {
                var token, userRepo, user, result, password, safeUser;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            token = token_1.getJWTToken(userInput.email, userInput.password);
                            userRepo = typeorm_1.getRepository(models_1.User);
                            user = userRepo.create(__assign(__assign({}, userInput), { token: token }));
                            return [4, userRepo.save(user)];
                        case 1:
                            result = _b.sent();
                            password = result.password, safeUser = __rest(result, ["password"]);
                            return [2, safeUser];
                    }
                });
            });
        },
        addReview: function (_, _a) {
            var review = _a.review;
            console.log(">>> addReview: ", review);
            data_1.default.reviews.push(review);
            return data_1.default.users[0];
        }
    },
    User: {
        posts: function (parent) {
            return data_1.default.posts.filter(function (post) { return post.userId === parent.id; });
        },
        reviews: function (parent) {
            return data_1.default.reviews.filter(function (review) { return review.userId === parent.id; });
        }
    },
    Post: {
        user: function (parent) {
            return data_1.default.users.find(function (user) { return user.id === parent.userId; });
        },
        reviews: function (parent) {
            return data_1.default.reviews.filter(function (review) { return review.postId === parent.id; });
        }
    },
    Review: {
        user: function (parent) {
            return data_1.default.users.find(function (user) { return user.id === parent.userId; });
        },
        post: function (parent) {
            return data_1.default.posts.find(function (post) { return post.id === parent.postId; });
        }
    }
};
exports.default = resolverMap;
