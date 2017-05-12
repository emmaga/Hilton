'use strict';

angular.module('app.food', [])
    .controller('FoodController', ['$scope', 'ActivityManager','ResourceManager', 'COMMON_KEYS','MenuService','$http','BtnService', function ($scope, ActivityManager,ResourceManager, COMMON_KEYS,MenuService,$http,BtnService) {
        var activity = ActivityManager.getActiveActivity();
        activity.initialize($scope);
        var data = ResourceManager.getService();
        $scope.serviceName = data.name;
        $scope.iconUrl = data.icon;
        activity.loadI18NResource(function (res) {
            var toolvarData = MenuService.getLanguage().toolbar;
            $scope.select = {
                left: toolvarData.left,
                icon: 'assets/images/icon_toolbar_select.png',
                right: toolvarData.selsct
            };
            $scope.ok = {
                left: toolvarData.left,
                icon: 'assets/images/icon_toolbar_menu1.png',
                right: toolvarData.ok
            };
            $scope.menu = {
                // left: toolvarData.left,
                // icon: 'assets/images/icon_toolbar_menu.png',
                // right: toolvarData.menu
            };
        });

        //$scope.$watch('$viewContentLoaded', function() {
        //    ActivityManager.hideLoading();
        //});
        if(document.readyState=="complete"){
            ActivityManager.hideLoading(500);
        }


        var i18nText = ResourceManager.getLocale();
        var lang = i18nText.lang;

        $scope.listRightStyle = 0;
        $scope.listStyle = 0;
        $scope.foods = [];
        $scope.order = [];
        $scope.total = 0;
        $scope.level = 0;
        $scope.do = false;
        var mealID = 0;
        //var mealID = ResourceManager.getMeal().id;
        //根据上一级中选择的mealID请求对应数据
        var conUrl = ResourceManager.getConfigurations().serverUrl();
        var mealUrl;
        $http.get(conUrl + '/Main/json/MainMenu_4.json').success(function (data) {
            data.Content.forEach(function (el, idx, arr) {
                if (el.NameEng == "Room Service") {
                    mealUrl = el.Second.Content[mealID].Json_URL;
                    $scope.class = [];
                    el.Second.Content.forEach(function (val,idx,arr) {
                        if(lang == "en-US") {
                            val.name = val.NameEng;
                        }else {
                            val.name = val.Name;
                        }
                        $scope.class.push(val);
                    });
                    return;
                }
            })
            //mealUrl = data.Content[6].Second.Content[mealID].Json_URL;
            $http.get(conUrl+mealUrl).success(function (data1) {
                data1.Content.forEach(function(val,idx,arr){
                    var meal = {};
                        if(lang == "en-US") {
                            meal = {
                                name: val.name_eng,
                                introduce:val.introduce_eng,
                                img:conUrl+val.picurl,
                                price:val.category_dollor,
                                id:val.id
                            };
                            $scope.money = '$';
                            $scope.addText = 'Add Order';
                            $scope.tipText = 'Succeed!';
                            $scope.confirmText = 'Are you sure to order?';
                            $scope.sure = 'sure';
                            $scope.cancel = 'cancel';
                        }else{
                            meal = {
                                name: val.name,
                                introduce:val.introduce,
                                img:conUrl+val.picurl,
                                price:val.category_yuan,
                                id:val.id
                            };
                            $scope.money = '￥';
                            $scope.addText = '加入订单';
                            $scope.tipText = '成功加入订单!';
                            $scope.confirmText = '确认添加到订单？';
                            $scope.sure = '确定';
                            $scope.cancel = '取消';
                        };
                    $scope.foods.push(meal);
                });
                $scope.selectIndex = 0;
                $scope.select = 0;
            });
        });

        function chose(i) {
            $http.get(conUrl + '/Main/json/MainMenu_4.json').success(function (data) {
                data.Content.forEach(function (el, idx, arr) {
                    if (el.NameEng == "Room Service") {
                        mealUrl = el.Second.Content[i].Json_URL;
                        $scope.foods = [];
                        $scope.select = 0;
                        return;
                    }
                })
                //mealUrl = data.Content[6].Second.Content[mealID].Json_URL;
                $http.get(conUrl+mealUrl).success(function (data1) {
                    data1.Content.forEach(function(val,idx,arr){
                        var meal = {};
                        if(lang == "en-US") {
                            meal = {
                                name: val.name_eng,
                                introduce:val.introduce_eng,
                                img:conUrl+val.picurl,
                                price:val.category_dollor,
                                id:val.id
                            };
                        }else{
                            meal = {
                                name: val.name,
                                introduce:val.introduce,
                                img:conUrl+val.picurl,
                                price:val.category_yuan,
                                id:val.id
                            };
                        }
                        $scope.foods.push(meal);
                    });
                });
            });
        }


        var cart = ResourceManager.getCart();
        cart.forEach(function(item,index,array){
            if(item.name){
                $scope.total+=item.num;
                $scope.order[index] = item.num;
            }
        });
        function confirm(id,num){
            $scope.order[id] = num;
            var foodName = $scope.foods[$scope.select].name;
            var price = $scope.foods[$scope.select].price;
            addToCart(id,foodName,num,price);
            sumOrder();
        }

        function addToCart(id,f,n,p){
            ResourceManager.addToCart(id,f,n,p);
        }

        function sumOrder(){
            var sum = 0;
            $scope.order.forEach(function(item,index,array){
                sum += item;
            });
            $scope.total = sum;
        }



        activity.onKeyDown(function (keyCode) {
            switch (keyCode) {
                case COMMON_KEYS.KEY_MENU:
                    ActivityManager.startActivity('menu');
                    break;
                case COMMON_KEYS.KEY_BACK:
                    if($scope.level == 0) {
                        activity.finish();
                    }else {
                        $scope.level == 0;
                        $scope.do = false;
                        $('#confirmModal').hide();
                    }
                    break;
                case COMMON_KEYS.KEY_LEFT:
                    if($scope.level == 0) {
                        if ($scope.select > 0) {
                            $scope.select--;
                        }
                        ;
                    }else {
                        $scope.do = true;
                    }
                    break;
                case COMMON_KEYS.KEY_RIGHT:
                    if($scope.level == 0) {
                        if ($scope.select < $scope.foods.length - 1) {
                            $scope.select++;
                        }
                        ;
                    }else {
                        $scope.do = false;
                    }
                    break;
                case COMMON_KEYS.KEY_ENTER:
                    if($scope.level == 0){
                        $scope.level = 1;
                        $('#confirmModal').show();
                    }else if(!$scope.do){
                        $scope.level = 0;
                        $('#confirmModal').hide();
                    }else {
                        var foodID = $scope.foods[$scope.select].id;
                        confirm(foodID, 1);
                        $('#confirmModal').hide();
                        $scope.level = 0;
                        $scope.do = false;
                        activity.showTip($scope.tipText);
                        var cart = ResourceManager.getCart();
                        console.log(cart);
                    };
                    break;
                case COMMON_KEYS.KEY_UP:
                    if($scope.level == 0) {
                        if ($scope.selectIndex > 0) {
                            $scope.selectIndex -= 1;
                            $scope.foods = chose($scope.selectIndex);
                        }
                    };
                    break;
                case COMMON_KEYS.KEY_DOWN:
                    if($scope.level == 0) {
                        if ($scope.selectIndex < $scope.class.length - 1) {
                            $scope.selectIndex += 1;
                            $scope.foods = chose($scope.selectIndex);
                        }
                    }
                    break;
            }
            if ($scope.selectIndex > 6) {
                $scope.listRightStyle = (6 - $scope.selectIndex) * 66;
            } else if ($scope.listRightStyle !== 0) {
                $scope.listRightStyle = 0;
            }

            if ($scope.select > 2) {
                $scope.listStyle = Math.ceil((2 - $scope.select)/2) * 260;
            } else if ($scope.listStyle !== 0) {
                $scope.listStyle = 0;
            }
        });
    }]);