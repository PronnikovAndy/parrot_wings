"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs = require("bcryptjs");
const common_1 = require("@nestjs/common");
const user_service_1 = require("../User/user.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validateUser(signinDto) {
        const user = await this.userService.findOneByEmail(signinDto.email);
        if (!user)
            return 'Invalid credentials';
        const { password } = user, result = __rest(user, ["password"]);
        const match = await bcryptjs.compare(signinDto.password, password);
        if (!match)
            return 'Invalid credentials';
        return result;
    }
    async signin(signinDto) {
        const payload = await this.validateUser(signinDto);
        console.log("payload", payload);
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
    async signup(signupDto) {
        const user = await this.userService.findOneByEmail(signupDto.email);
        if (user) {
            return 'User already exists';
        }
        const passwordHash = await bcryptjs.hash(signupDto.password, 10);
        const _a = await this.userService.create(Object.assign(Object.assign({}, signupDto), { password: passwordHash })), { password } = _a, newUser = __rest(_a, ["password"]);
        return newUser;
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map