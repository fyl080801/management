define([
    'modules/manageui/module'
], function (module) {
    'use strict';

    module.service('modules.manageui.services.sessionService', [
        '$q',
        '$modal',
        '$appEnvironment',
        'app.services.httpService',
        function ($q, $modal, $appEnvironment, httpService) {
            var me = this;

            me.login = function (username, password) {
                var defered = $q.defer();

                defered.promise.success = function (fn) {
                    defered.promise.then(function () {
                        fn();
                    });
                    return defered.promise;
                };

                defered.promise.error = function (fn) {
                    defered.promise.then(null, function (error) {
                        fn(error);
                    });
                    return defered.promise;
                };

                httpService
                    .post('/pa/v1/login', {
                        loginName: username,
                        pwd: password
                    })
                    .then(function (result) {
                        if ($appEnvironment.session.Status === 'Logined') {
                            me
                                .checkSession()
                                .authenticated(function (session) {
                                    // 写用户信息
                                    $appEnvironment.user = result;
                                    defered.resolve();
                                })
                                .unAuthenticated(function () {
                                    defered.reject();
                                });
                        }
                    }, function (result) {
                        defered.reject(result);
                    });

                return defered.promise;
            };

            me.logout = function () {
                var defered = $q.defer();

                defered.promise.success = function (fn) {
                    defered.promise.then(function () {
                        fn();
                    });
                    return defered.promise;
                };

                httpService
                    .get('/Account/Logout')
                    .then(function (result) {
                        defered.resolve();
                    });

                return defered.promise;
            };

            me.checkSession = function () {
                var defered = $q.defer();

                defered.promise.authenticated = function (fn) {
                    defered.promise.then(function (session) {
                        fn(session);
                    });
                    return defered.promise;
                };

                defered.promise.unAuthenticated = function (fn) {
                    defered.promise.then(null, function () {
                        fn();
                    });
                    return defered.promise;
                };

                defered.promise.error = function (fn) {
                    defered.promise.then(null, function (error) {
                        fn(error);
                    });
                    return defered.promise;
                };

                var processModal = $modal.open({
                    template: '<div><div class="modal-body"><p>会话检测...</p></div></div>',
                    size: 'sm',
                    backdrop: 'static'
                });

                httpService
                    .get('/System/Information')
                    .then(function (result) {
                        if (result.data.Session.Vaild) {
                            $appEnvironment.session = result.data.Session;
                            defered.resolve(result.data.Session);
                        } else {
                            defered.reject();
                        }
                        processModal.close();
                    }, function (result) {
                        defered.reject(result);
                        processModal.close();
                    });

                return defered.promise;
            };
        }
    ]);
});