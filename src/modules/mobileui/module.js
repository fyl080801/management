define('modules.mobileui.module', [
    'app.application'
], function (application) {
    'use strict';

    application.requires.push('modules.mobileui');

    return angular
        .module('modules.mobileui', [
            'ui.router'
        ])
        .config([
            '$urlRouterProvider',
            '$stateProvider',
            function ($urlRouterProvider, $stateProvider) {
                $urlRouterProvider.otherwise('/mobilelogin');

                $stateProvider.state('mobilelogin', {
                    url: '/mobilelogin',
                    templateUrl: 'views/mobileui/Login.html',
                    dependencies: ['modules.mobileui.requires']
                });

                $stateProvider.state('mobilemain', {
                    url: '/mobilemain',
                    templateUrl: 'views/mobileui/Main.html',
                    dependencies: ['modules.mobileui.requires']
                });

                $stateProvider.state('mobilemain.index', {
                    url: '/index',
                    templateUrl: 'views/mobileui/Index.html',
                    dependencies: ['modules.mobileui.requires'],
                    data: {
                        title: '客房控制'
                    }
                });

                $stateProvider.state('hotel', {
                    url: '/hotel',
                    templateUrl: 'views/mobileui/Hotel.html',
                    dependencies: ['modules.mobileui.requires']
                });

                $stateProvider.state('service', {
                    url: '/service',
                    templateUrl: 'views/mobileui/Service.html',
                    dependencies: ['modules.mobileui.requires'],
                    data: {
                        title: '服 务'
                    }
                });

                $stateProvider.state('mobilemain.air', {
                    url: '/air',
                    templateUrl: 'views/mobileui/Air.html',
                    dependencies: ['modules.mobileui.requires'],
                    data: {
                        title: '空 调',
                        back: 'hotel'
                    }
                });

                $stateProvider.state('mobilemain.tv', {
                    url: '/tv',
                    templateUrl: 'views/mobileui/TV.html',
                    dependencies: ['modules.mobileui.requires'],
                    data: {
                        title: '电 视',
                        back: 'hotel'
                    }
                });

                $stateProvider.state('mobilemain.curtains', {
                    url: '/curtains',
                    templateUrl: 'views/mobileui/Curtains.html',
                    dependencies: ['modules.mobileui.requires'],
                    data: {
                        title: '窗 帘',
                        back: 'hotel'
                    }
                });

                $stateProvider.state('mobilemain.music', {
                    url: '/music',
                    templateUrl: 'views/mobileui/Music.html',
                    dependencies: ['modules.mobileui.requires'],
                    data: {
                        title: '音 乐',
                        back: 'hotel'
                    }
                });

                $stateProvider.state('mobilemain.light', {
                    url: '/light',
                    templateUrl: 'views/mobileui/Light.html',
                    dependencies: ['modules.mobileui.requires'],
                    data: {
                        title: '灯 光',
                        back: 'hotel'
                    }
                });

                $stateProvider.state('mobilemain.door', {
                    url: '/door',
                    templateUrl: 'views/mobileui/Door.html',
                    dependencies: ['modules.mobileui.requires']
                });
            }
        ]);
});