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
                        icon: 'glyphicon glyphicon-cog',
                        href: '#/aaaa'
                    });
            }
        ]);
});