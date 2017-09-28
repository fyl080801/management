define([
    'app/application'
], function (application) {
    'use strict';

    application.requires.push('modules.setting');

    return angular
        .module('modules.setting', []);
});