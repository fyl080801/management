define([
    'app/application'
], function (application) {
    'use strict';

    return angular
        .module('modules.manageui.configs', [
            'ui.bootstrap',
            'ui.router'
        ]);
});