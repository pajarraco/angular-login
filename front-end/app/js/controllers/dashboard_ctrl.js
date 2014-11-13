'use strict';

/* Controllers */

app.controller('DashboardCtrl', ['$scope', 'RestFul', '$rootScope', '$location', '$filter', function ($scope, RestFul, $rootScope, $location, $filter) {

        $('#loader').show();

        $scope.userlevel = sessionStorage.level;
        $scope.usercompanyid = sessionStorage.company_id;

        var get_type = '';
        if ($scope.userlevel >= 4) {
            get_type = 'user_permition';
        }

        function getData(msg) {
            $scope.companys = RestFul.get({
                jsonFile: 'company.json.php',
                user_company_id: $scope.usercompanyid
            }, function (data) {
                //console.log('$scope.companys: ', $scope.companys);
                $scope.projects = RestFul.get({
                    jsonFile: 'project.json.php',
                    get_type: get_type,
                    user_company_id: $scope.usercompanyid
                }, function (data) {
                    //console.log('$scope.projects: ', $scope.projects);
                    $('#loader').hide();
                    if (msg !== '') {
                        $scope.closePanel();
                        $scope.alert = {active: 'active', classAlert: 'alert-success', msgAlert: msg};
                    }
                }, function (error) {
                    $('#loader').hide();
                    $scope.alert = {active: 'active', classAlert: 'alert-danger', msgAlert: 'ERROR: Reading Projects, Try Again'};
                });
            }, function (error) {
                $('#loader').hide();
                $scope.alert = {active: 'active', classAlert: 'alert-danger', msgAlert: 'ERROR: Reading Companies, Try Again'};
            });
        }
        getData('');

        $scope.newCompany = function () {
            $scope.showNewCompany = true;
            $scope.newcompany = [];
            $scope.newcompany_form.$setPristine();
            $scope.editpanel = {tittle: 'New Company', button: 'Add New', action: 'new'};
        };

        $scope.editCompany = function (index) {
            $scope.showNewCompany = true;
            $scope.editpanel = {tittle: 'Edit Company', button: 'Save', action: 'edit'};
            $scope.newcompany = $scope.companys[index];
        };

        $scope.closePanel = function () {
            $scope.showNewCompany = false;
            $scope.newcompany = [];
            $scope.newcompany_form.$setPristine();
        };

        $scope.saveCompany = function (company_id) {
            $('#loader').show();
            if ($scope.editpanel.action == 'new') {
                RestFul.post({
                    jsonFile: 'company.json.php',
                    user_company_id: $scope.usercompanyid,
                    company_name: $scope.newcompany.company_name,
                    abn: $scope.newcompany.abn,
                    address: $scope.newcompany.address,
                    suburb: $scope.newcompany.suburb,
                    postcode: $scope.newcompany.postcode,
                    state: $scope.newcompany.state
                }, function () {
                    getData('New Company Created');
                }, function () {
                    $('#loader').hide();
                    $scope.alert = {active: 'active', classAlert: 'alert-danger', msgAlert: 'ERROR: Creating New Company, Try Again'};
                });
            } else {
                RestFul.put({
                    jsonFile: 'company.json.php',
                    type: 'full',
                    user_company_id: $scope.usercompanyid,
                    company_id: company_id,
                    company_name: $scope.newcompany.company_name,
                    abn: $scope.newcompany.abn,
                    address: $scope.newcompany.address,
                    suburb: $scope.newcompany.suburb,
                    postcode: $scope.newcompany.postcode,
                    state: $scope.newcompany.state
                }, function () {
                    getData('Company Saved');
                }, function () {
                    $('#loader').hide();
                    $scope.alert = {active: 'active', classAlert: 'alert-danger', msgAlert: 'ERROR: Saving Company, Try Again'};
                });
            }
        };

        $scope.deleteCompany = function (company_id, index) {
            if (confirm('You are goint to DELETE a Company.\nAre you sure?')) {
                $('#loader').show();
                RestFul.delete({
                    jsonFile: 'company.json.php',
                    user_company_id: $scope.usercompanyid,
                    company_id: company_id
                }, function () {
                    $scope.companys.splice(index, 1);
                    $('#loader').hide();
                    $scope.alert = {active: 'active', classAlert: 'alert-success', msgAlert: 'Company Deleted'};
                }, function () {
                    $('#loader').hide();
                    $scope.alert = {active: 'active', classAlert: 'alert-danger', msgAlert: 'ERROR: Deleting Company, Try Again'};
                });
            }
        };

        $scope.saveEditProject = function (project_id, project_name, description) {
            $('#loader').show();
            RestFul.put({
                jsonFile: 'project.json.php',
                type: 'full',
                user_company_id: $scope.usercompanyid,
                project_id: project_id,
                project_name: project_name,
                description: description
            }, function () {
                $('#loader').hide();
                $scope.alert = {active: 'active', classAlert: 'alert-success', msgAlert: 'Project Saved'};
            }, function () {
                $('#loader').hide();
                $scope.alert = {active: 'active', classAlert: 'alert-danger', msgAlert: 'ERROR: Saving Project, Try Again'};
            });
        };

        $scope.saveProject = function (company_id, index) {
            $('#loader').show();
            RestFul.post({
                jsonFile: 'project.json.php',
                user_company_id: $scope.usercompanyid,
                company_id: company_id,
                project_name: $scope.companys[index].newproject.project_name,
                description: $scope.companys[index].newproject.description
            }, function () {
                $scope.projects = RestFul.get({
                    jsonFile: 'project.json.php',
                    get_type: get_type,
                    user_company_id: $scope.usercompanyid
                }, function () {
                    //console.log('$scope.projects: ', $scope.projects);
                    $scope.companys[index].newproject = [];
                    $scope.reset = false;
                    $('#loader').hide();
                    $scope.alert = {active: 'active', classAlert: 'alert-success', msgAlert: 'New Project Created'};
                }, function () {
                    $('#loader').hide();
                    $scope.alert = {active: 'active', classAlert: 'alert-danger', msgAlert: 'ERROR: Reading Projects, Try Again'};
                });
            }, function () {
                $('#loader').hide();
                $scope.alert = {active: 'active', classAlert: 'alert-danger', msgAlert: 'ERROR: Crating New Project, Try Again'};
            });
        };

        $scope.deleteProject = function (project_id, index) {
            if (confirm('You are goint to DELETE a Project.\nAre you sure?')) {
                $('#loader').show();
                RestFul.delete({
                    jsonFile: 'project.json.php',
                    user_company_id: $scope.usercompanyid,
                    project_id: project_id
                }, function () {
                    var id = $filter('filter')($scope.projects, project_id);
                    for (var i = 0; i < $scope.projects.length; i++) {
                        if ($scope.projects[i].project_id == id[0].project_id) {
                            $scope.projects.splice(i, 1);
                        }
                    }
                    $('#loader').hide();
                    $scope.alert = {active: 'active', classAlert: 'alert-success', msgAlert: 'Project Deleted'};
                }, function () {
                    $('#loader').hide();
                    $scope.alert = {active: 'active', classAlert: 'alert-danger', msgAlert: 'ERROR: Deleting Project, Try Again'};
                });
            }
        };

        $scope.selectProject = function (project_id) {
            var id = $filter('filter')($scope.projects, project_id);
            $rootScope.save = true;
            if (id[0].total == null) {
                id[0].total = 0;
            }
            $rootScope.project = id[0];
            if ($rootScope.project.state == 0) {
                $rootScope.left_menu = 'scope';
                $location.path('stage2');
            } else {
                $rootScope.left_menu = 'production';
                $location.path('stage5');
            }
        };
    }]);
