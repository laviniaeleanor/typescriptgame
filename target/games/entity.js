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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const BaseEntity_1 = require("typeorm/repository/BaseEntity");
const class_validator_1 = require("class-validator");
const colorBank = ["red", "blue", "green", "yellow", "magenta"];
function getRandomColor(arrayOfColors) {
    return arrayOfColors[Math.floor(Math.random() * arrayOfColors.length)];
}
let Game = class Game extends BaseEntity_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Game.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column('text', { default: "default" }),
    __metadata("design:type", String)
], Game.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column('text', { nullable: true,
        default: getRandomColor(colorBank) }),
    __metadata("design:type", String)
], Game.prototype, "color", void 0);
__decorate([
    class_validator_1.IsJSON(),
    typeorm_1.Column('json', { nullable: true,
        default: { board: [
                ['o', 'o', 'o'],
                ['o', 'o', 'o'],
                ['o', 'o', 'o']
            ] } }),
    __metadata("design:type", Object)
], Game.prototype, "board", void 0);
Game = __decorate([
    typeorm_1.Entity()
], Game);
exports.default = Game;
//# sourceMappingURL=entity.js.map