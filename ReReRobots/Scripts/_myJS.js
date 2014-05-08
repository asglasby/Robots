var myApp = angular.module('myApp', ["ngRoute"]);
myApp.config(function ($routeProvider) {
    $routeProvider.when('/', {templateUrl:"Views/home.html", controller: "Home"} ).when
        ("/addRobot",{templateUrl: "Views/addRobot.html", controller: "AddRobot"}).when
        ('/deleteRobot/:key', { templateUrl: "Views/deleteRobot.html", controller: "DeleteRobot" }).when('/error', { templateUrl: "Views/error.html" }).when('/editRobot/:key', { templateUrl: "Views/addRobot.html", controller: "EditRobot" }).when('/details/:key', { templateUrl: "Views/details.html", controller: "Details" }).otherwise({ templateUrl: "Views/error.html"});
});
myApp.filter("reverse", function () {
    return function (word) {
        return word.split("").reverse().join("<3");
    };
 
});
myApp.factory("Robots", function () {

    return [];
});
myApp.factory("Url", function () {
    return 'https://domo.firebaseio.com/';
});
myApp.controller("Home", function ($scope, Robots, $http, Url) {
    $scope.test = "hello";
    $scope.robotList = Robots;
    
    $scope.getRobots = function () {
        if(!$scope.robotList.length){
            $http.get(Url + ".json").success(function (data, status, response) {
                for (var x in data) {
                    data[x].index = x;
                    $scope.robotList.push(data[x]);
                }

            }).error(function (data, status, response) {
                console.log(status);
            });}
    }

    $scope.getRobots();
});
myApp.controller("AddRobot", function ($scope, $location, $http, Robots, Url) {
    $scope.robotList = Robots;
    $scope.addRobot = function (name, metal, imgUrl) {
        
        $http.post(Url + ".json", { name: name, metal: metal, imgUrl: imgUrl })
            .success(function (data) {
                $scope.robotList.push(
                    {
                        name: name,
                        metal: metal,
                        imgUrl: imgUrl,
                        index: data.name
                    });
                
            });
        $location.path("/");
    };
    

});

myApp.controller('Details', function ($scope, $http, $routeParams, Robots) {
    $scope.robots = Robots;
    for (var r in $scope.robots){
        if ($scope.robots[r].index === $routeParams.key) {
            $scope.robot = $scope.robots[r];
        }
    }
});

    myApp.controller('EditRobot', function ($scope, $http, $location, $routeParams, Url, Robots) {

        $scope.robots = Robots;
        $scope.addRobot = function (name, metal, imgUrl) {
            var robot = { name: name, metal: metal, imgUrl: imgUrl };



            $http.put(Url + $routeParams.key + ".json", robot).
                success(function (data) {
                    for (var x in $scope.robots) {
                        if ($scope.robots[x].index === $routeParams.key) {
                            robot.index = $scope.robots[x].index;
                            $scope.robots.splice(x, 1, robot);
                        }
                    }

                    $location.path("/");
                
                }).error(function (status) {
                    console.log(status);
                })
        }
    });
























    //"use strict";
    //var myApp = {};
    //myApp.robots = [
    //    { name: "T-1000", metal: "Nano-Mercury Alloy" },
    //    { name: "Wall-E", metal: "Steel" },
    //    { name: "Johnny-5", metal: "Johnny-5 Steel", activate: function () { alert(this.name); } }];

    //myApp.draw = function () {
    //    var holder = "<ul>";
    //    //starting first loop
    //    for (var r in myApp.robots) {
    //        holder += "<li><ol>" + r;
    //        //starting second loop
    //        for (var p in myApp.robots[r]) {
    //            holder += "<li>";
    //            holder += myApp.robots[r][p]+": "+p;
    //            holder += "</li>";
    //        }
    //        holder += "</ol></li>";
    //    }
    //    holder += "</ul>";
    //    document.getElementById("robots").innerHTML = holder;
    //};
