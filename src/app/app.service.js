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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var AppService = (function () {
    function AppService(http) {
        this.http = http;
        this.appUrl = 'http://localhost:3000/users';
    }
    AppService.prototype.getAllUsers = function () {
        return this.http.get(this.appUrl)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AppService.prototype.createUser = function (user) {
        var cpHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: cpHeaders });
        return this.http.post(this.appUrl, user, options)
            .map(function (success) { return success.status; })
            .catch(this.handleError);
    };
    AppService.prototype.getUserById = function (userId) {
        var cpHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: cpHeaders });
        return this.http.get(this.appUrl + "/" + userId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AppService.prototype.updateUser = function (user) {
        var cpHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: cpHeaders });
        return this.http.put(this.appUrl + "/" + user.id, user, options)
            .map(function (success) { return success.status; })
            .catch(this.handleError);
    };
    AppService.prototype.deleteUser = function (userId) {
        var cpHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: cpHeaders });
        return this.http.delete(this.appUrl + "/" + userId)
            .map(function (success) { return success.status; })
            .catch(this.handleError);
    };
    AppService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    AppService.prototype.handleError = function (error) {
        console.error(error.message || error);
        return rxjs_1.Observable.throw(error.status);
    };
    return AppService;
}());
AppService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map