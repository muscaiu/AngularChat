
// var app = angular.module('ChatApp', ['ngRoute'])
var app = angular.module('ChatApp', ['ui.router'])

    //UI.ROUTER
    .config(function config($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state("chat", {
                url: "/chat",
                templateUrl: "chat.html",
                controller: "ChatController as chat",
            })
            .state("chat.login", {
                url: "/login",
                templateUrl: "login.html",
            })
            .state("chat.register", {
                url: "/register",
                templateUrl: "register.html",
            })
            .state("chat.chatroom", {
                url: "/chatroom",
                templateUrl: "chatroom.html",
            })

        $urlRouterProvider.otherwise('/chat/login');
    })

    //Services
    // .service('loggedUsers', function LoggedUsers() {
    //     var loggedUsers = this;
    //     loggedUsers.users = []
    // })

    //LoginController
    .controller('ChatController', function ChatController($scope) {
        var socket = io();

        var chat = this;
        chat.users = [];

        chat.LoginForm = function () {
            console.log(chat.usernameLogin, chat.passwordLogin)
            console.log('users: ' + chat.users)
            socket.emit('login attempt', chat.usernameLogin, chat.passwordLogin)
        }
        chat.RegisterForm = function () {
            socket.emit('register user', chat.usernameRegister, chat.passwordRegister)
            console.log('register')
        }

        socket.on('user logged in', function (data) {
            $scope.$apply(function () {
                chat.users.push(data);
                console.log('logged in users: ' + chat.users)
            })
        })

        socket.on('wrong credentials', function () {
            Materialize.toast('Wrong credentials !', 3000)
            console.log('wrong credentials')
        })
    })



$(document).on('click', '#toast-container .toast', function() {
    $(this).fadeOut(function(){
        $(this).remove();
    });
});



// var app = angular.module('ChatApp', ['ui.router'])

//     //UI.ROUTER
//     .config(function config($stateProvider, $urlRouterProvider) {
//         // $stateProvider
//         //     .state('home', {
//         //         controller: "HomeController as home",
//         //         url: '',
//         //         templateUrl: 'navbar.html'
//         //         // views: {
//         //         //     nav: {
//         //         //         templateUrl: 'navbar.html'
//         //         //     }
//         //         // }
//         //     })

    // //Routing ngRoute
    // .config(function ($routeProvider) {
    //     $routeProvider
    //         .when('/login', {
    //             controller: 'LoginController',
    //             templateUrl: 'login.html'
    //         })
    //         .when('/register', {
    //             controller: 'RegisterController',
    //             templateUrl: 'register.html'
    //         })
    //         .otherwise({
    //             redirectTo: '/login'
    //         })
    // })

    // .service('sharedProperties', function () {
    //     var property = '1'
    //     return {
    //         getProperty: function () {
    //             return property;
    //         },
    //         setProperty: function (value) {
    //             property = value;
    //         }
    //     };
    // })