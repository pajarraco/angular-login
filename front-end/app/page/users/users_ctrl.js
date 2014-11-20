'use strict';

/* Controllers */

app.controller('UsersCtrl', ['$scope', 'RestFul', '$filter', function ($scope, RestFul, $filter) {

        $('#loader').show();

        $scope.userlevel = sessionStorage.level;
        $scope.usercompanyid = sessionStorage.company_id;

        if ($scope.userlevel != '4') {
            $scope.userleveloption = [
                {key: 0, value: 'Administrator'},
                {key: 1, value: 'Sales'},
                {key: 2, value: 'Designer'},
                {key: 3, value: 'Developer'},
                {key: 4, value: 'Client Administrator'},
                {key: 5, value: 'Client'}
            ];
        } else {
            $scope.userleveloption = [
                {key: 4, value: 'Client Administrator'},
                {key: 5, value: 'Client'}
            ];
        }

        function getData(msg) {
            $scope.users = RestFul.get({
                jsonFile: 'users.json'
            }, function (data) {
                if (msg !== '') {
                    $scope.closePanel();
                    $('#loader').hide();
                    $scope.alert = {active: 'active', classAlert: 'alert-success', msgAlert: msg};
                } else {
                    $scope.companies = RestFul.get({
                        jsonFile: 'company.json',
                        user_company_id: $scope.usercompanyid
                    }, function (data) {
                        $('#loader').hide();
                        //console.log('$scope.users: ', $scope.users);
                        //console.log('$scope.companies: ', $scope.companies);
                    }, function (error) {
                        $('#loader').hide();
                        $scope.alert = {active: 'active', classAlert: 'alert-danger', msgAlert: 'ERROR: Reading Companies, Try Again'};
                    });
                }
            }, function (error) {
                $('#loader').hide();
                $scope.alert = {active: 'active', classAlert: 'alert-danger', msgAlert: 'ERROR: Reading Users, Try Again'};
            });
        }
        getData('');

        $scope.newUser = function () {
            $scope.showNewUser = true;
            $scope.newuser = [];
            $scope.newuser.companies = $scope.companies;
            $scope.newuser.password = '';
            $scope.newuser_form.$setPristine();
            $scope.editpanel = {tittle: 'New User', button: 'Add New', action: 'new', usernameclass: ''};
        };

        $scope.editUser = function (index) {
            $scope.showNewUser = true;
            $scope.editpanel = {tittle: 'Edit User', button: 'Save', action: 'edit', usernameclass: 'disabled'};
            $scope.newuser = $scope.users[index];
            if (($scope.newuser.state) == 1) {
                $scope.newuser.state = true;
            }
            $scope.newuser.password = '';
            $scope.newuser.repassword = '';
            $scope.newuser.companies = $scope.companies;
            angular.forEach($scope.newuser.companies, function (value, key) {
                if ($scope.newuser.company_id.indexOf(value.company_id) > -1) {
                    $scope.newuser.companies[key].select = true;
                } else {
                    $scope.newuser.companies[key].select = false;
                }
            });
        };

        $scope.closePanel = function () {
            $scope.showNewUser = false;
            $scope.newuser = [];
            $scope.newuser.companies = $scope.companies;
            $scope.newuser_form.$setPristine();
        };

        $scope.saveUser = function () {
            $('#loader').show();
            var state = 0;
            if ($scope.newuser.state) {
                state = 1;
            }
            $scope.user_company = $filter('filter')($scope.newuser.companies, {select: true});
            if ($scope.editpanel.action == 'new') {
                if ($scope.newuser.password != '') {
                    RestFul.post({
                        jsonFile: 'users.json',
                        fullname: $scope.newuser.fullname,
                        username: $scope.newuser.username,
                        password: $scope.newuser.password,
                        level: $scope.newuser.level,
                        state: state,
                        company_id: $scope.user_company
                    }, function () {
                        getData('New User Create');
                    }, function () {
                        $('#loader').hide();
                        $scope.alert = {active: 'active', classAlert: 'alert-danger', msgAlert: 'ERROR: Creating New User, Try Again'};
                    });
                } else {
                    $('#loader').hide();
                    $scope.alert = {active: 'active', classAlert: 'alert-danger', msgAlert: 'Password Missing'};
                }
            } else {
                if ($scope.newuser.password != '') {
                    RestFul.put({
                        jsonFile: 'users.json',
                        type: 'full',
                        fullname: $scope.newuser.fullname,
                        username: $scope.newuser.username,
                        password: $scope.newuser.password,
                        level: $scope.newuser.level,
                        state: state,
                        company_id: $scope.user_company
                    }, function () {
                        getData('User Saved');
                    }, function () {
                        $('#loader').hide();
                        $scope.alert = {active: 'active', classAlert: 'alert-danger', msgAlert: 'ERROR: Saving User, Try Again'};
                    });
                } else {
                    RestFul.put({
                        jsonFile: 'users.json.php',
                        type: 'nopassword',
                        fullname: $scope.newuser.fullname,
                        username: $scope.newuser.username,
                        level: $scope.newuser.level,
                        state: state,
                        company_id: $scope.user_company
                    }, function () {
                        getData('User Saved');
                    }, function () {
                        $('#loader').hide();
                        $scope.alert = {active: 'active', classAlert: 'alert-danger', msgAlert: 'ERROR: Saving User, Try Again'};
                    });
                }
            }
        };

        $scope.changeState = function (index, username, state) {
            $('#loader').show();
            if (state == 1) {
                state = 0
                $scope.users[index].state = '0';
            } else {
                state = 1
                $scope.users[index].state = '1';
            }
            RestFul.put({
                jsonFile: 'users.json',
                type: 'state',
                username: username,
                state: state
            }, function () {
                $('#loader').hide();
                $scope.alert = {active: 'active', classAlert: 'alert-success', msgAlert: 'Status Changed'};
            }, function () {
                $('#loader').hide();
                $scope.alert = {active: 'active', classAlert: 'alert-danger', msgAlert: 'ERROR: Changing Status, Try Again'};
            });
        };

        $scope.deleteUser = function (index, username) {
            if (confirm('You are goint to DELETE the User ' + username + '.\nAre you sure?')) {
                $('#loader').show();
                RestFul.delete({
                    jsonFile: 'users.json',
                    username: username
                }, function () {
                    $scope.users.splice(index, 1);
                    $('#loader').hide();
                    $scope.alert = {active: 'active', classAlert: 'alert-success', msgAlert: 'User Deleted'};
                }, function () {
                    $('#loader').hide();
                    $scope.alert = {active: 'active', classAlert: 'alert-danger', msgAlert: 'ERROR: Deleting User, Try Again'};
                });
            }
        };
    }]);