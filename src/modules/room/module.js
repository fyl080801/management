define('modules.room.module', [
    'app.application'
], function (application) {
    'use strict';

    application.requires.push('modules.room');

    return angular
        .module('modules.room', [
            'ui.router',
            'modules.manageui'
        ])
        .config([
            '$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('main.roominfo_search', {
                        target: 'tab',
                        title: '信息查询',
                        url: '/roominfo_search',
                        templateUrl: 'views/room/manage/Search.html',
                        dependencies: ['modules.room.requires']
                    });

                $stateProvider
                    .state('main.roominfo_manage', {
                        target: 'iframe',
                        title: '信息管理',
                        url: '/roominfo_manage',
                        src: 'test.html'
                    });
            }
        ])
        .config([
            'modules.manageui.configs.linkManagerProvider',
            function (linkManagerProvider) {
                linkManagerProvider
                    .add({
                        id: 'roomstate',
                        text: '房态显示',
                        icon: 'glyphicon glyphicon-cog'
                    });

                linkManagerProvider
                    .add({
                        id: 'roommanage',
                        text: '客房管理',
                        icon: 'glyphicon glyphicon-cog'
                    })
                    .add({
                        id: 'roommanage.search',
                        text: '信息查询',
                        href: '#/main/roominfo_search'
                    })
                    .add({
                        id: 'roommanage.infomanage',
                        text: '信息管理',
                        href: '#/main/roominfo_manage'
                    });
            }
        ]);
});