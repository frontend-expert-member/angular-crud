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
var forms_1 = require("@angular/forms");
var app_service_1 = require("./app.service");
var AppComponent = (function () {
    function AppComponent(appService, formBuilder) {
        this.appService = appService;
        this.formBuilder = formBuilder;
        this.submitted = false;
        this.requestProcess = false;
        this.userIdToUpdate = null;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.getAllUsers();
        this.userForm = this.formBuilder.group({
            firstName: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6)]],
            lastName: ['', forms_1.Validators.required],
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]]
        });
    };
    Object.defineProperty(AppComponent.prototype, "f", {
        get: function () { return this.userForm.controls; },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.getAllUsers = function () {
        var _this = this;
        this.appService.getAllUsers()
            .subscribe(function (data) { return _this.allUsers = data; }, function (errorCode) { return _this.statusCode = errorCode; });
    };
    AppComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        if (this.userForm.invalid) {
            return;
        }
        this.initState();
        var user = this.userForm.value;
        if (this.userIdToUpdate === null) {
            this.appService.getAllUsers()
                .subscribe(function (users) {
                var maxIndex = users.length - 1;
                var userWithMaxIndex = users[maxIndex];
                var userId = userWithMaxIndex.id + 1;
                user.id = userId;
                _this.appService.createUser(user)
                    .subscribe(function (successCode) {
                    _this.statusCode = successCode;
                    _this.getAllUsers();
                    _this.backToCreateUser();
                }, function (errorCode) { return _this.statusCode = errorCode; });
            });
        }
        else {
            user.id = this.userIdToUpdate;
            this.appService.updateUser(user)
                .subscribe(function (successCode) {
                _this.statusCode = successCode;
                _this.getAllUsers();
            }, function (errorCode) { return _this.statusCode = errorCode; });
        }
    };
    AppComponent.prototype.editUser = function (userId) {
        var _this = this;
        this.initState();
        this.appService.getUserById(userId)
            .subscribe(function (user) {
            _this.userIdToUpdate = user.id;
            _this.userForm.setValue({ firstName: user.firstName, lastName: user.lastName, email: user.email });
            _this.submitted = true;
            _this.requestProcess = false;
        }, function (errorCode) { return _this.statusCode = errorCode; });
    };
    AppComponent.prototype.deleteUser = function (userId) {
        var _this = this;
        this.initState();
        this.appService.deleteUser(userId)
            .subscribe(function (successCode) {
            _this.statusCode = 204;
            _this.getAllUsers();
            _this.backToCreateUser();
        }, function (errorCode) { return _this.statusCode = errorCode; });
    };
    AppComponent.prototype.initState = function () {
        this.statusCode = null;
        this.requestProcess = true;
    };
    //Go back from update to create
    AppComponent.prototype.backToCreateUser = function () {
        this.userIdToUpdate = null;
        this.userForm.reset();
        this.submitted = false;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app.component.html',
    }),
    __metadata("design:paramtypes", [app_service_1.AppService, forms_1.FormBuilder])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map