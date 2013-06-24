//The build will inline common dependencies into this file.

//For any third party dependencies, like jQuery, place them in the lib folder.

//Configure loading modules from the lib directory,
//except for 'app' ones, which are in a sibling
//directory.
require.config({
    baseUrl: 'js',
    urlArgs: "bust=v2",

    shim: {
        'Handlebars': {
            exports: 'Handlebars'
        },
        'vendor/rison': {
            exports: 'rison'
        },
        'vendor/jquery-ui': {
            deps: ['jquery']
        },
        'vendor/jquery.csv': {
            deps: ['jquery']
        },
        'vendor/jquery.mousewheel': {
            deps: ['jquery']
        },
        'vendor/jquery.spinner': {
            deps: ['jquery']
        },
        'vendor/bootstrapSwitch': {
            deps: ['jquery']
        },
        'underscore': {
            exports: "_"
        },
        'json2': {
            exports: 'JSON'
        }
    },
    hbs: {
        disableI18n: true,
        helperDirectory: "templates/helpers/"
    },
    paths: {
        "jquery": 'vendor/jquery',
        "json2": 'vendor/json2',
        "underscore": 'vendor/underscore',
        "Handlebars": 'vendor/handlebars',
        "hbs": 'vendor/hbs',
        "hbs_i18nprecompile": 'vendor/hbs_i18nprecompile',
        'PubSub': 'vendor/pubsub'
    }
});