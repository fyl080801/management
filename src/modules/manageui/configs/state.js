/**
 * Created by fyl08 on 2017/2/15.
 */
define('modules.manageui.configs.state', [
    'modules.manageui.configs'
], function (configs) {
    'use strict';

    configs.config([
        '$stateProvider',
        '$appStates',
        function ($stateProvider, $appStates) {
            var stateFn = $stateProvider.state;

            $stateProvider.state = function (state, options) {
                if (options.views === undefined && options.target && options.target === 'tab') {
                    var tabOptions = {
                        title: !options.title ? '新页面' : options.title, // tab标题
                        url: options.url, // url
                        target: options.target, // 打开方式(iframe/template)
                        tab: !options.tab ? state.split('.').join('_') : options.tab,// tab跳转名称(bootstrap)
                        tabState: state,// 跳转tab的state
                        dependencies: options.dependencies,
                        css: options.css,
                        views: {}
                    };
                    tabOptions.views[tabOptions.tab] = options;
                    stateFn(state, tabOptions);
                    $appStates[state] = tabOptions;
                } else {
                    stateFn(state, options);
                    $appStates[state] = options;
                }
            };
        }
    ]);
});