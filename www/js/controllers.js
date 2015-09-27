angular.module('Agenvida.controllers', [])

.controller('AgenvidaCtrl', function($scope, $timeout, $ionicModal, Projects, $ionicSideMenuDelegate) {

  // A utility function for creating a new project
  // with the given projectTitle
  var createProject = function(projectTitle) {
    var newProject = Projects.newProject(projectTitle);
    $scope.projects.push(newProject);
    Projects.save($scope.projects);
    $scope.selectProject(newProject, $scope.projects.length-1);
  }


  // Load or initialize projects
  $scope.projects = Projects.all();

  // Grab the last active, or the first project
  $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

  // Called to create a new project
  $scope.newProject = function() {
    var projectTitle = prompt('Project name');
    if(projectTitle) {
      createProject(projectTitle);
    }
  };

  // Called to select the given project
  $scope.selectProject = function(project, index) {
    $scope.activeProject = project;
    Projects.setLastActiveIndex(index);
    $ionicSideMenuDelegate.toggleLeft(false);
  };

  // Create our modal
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope
  });

  $scope.createTask = function(task) {
    if(!$scope.activeProject || !task) {
      return;
    }
    $scope.activeProject.tasks.push({
      title: task.title
    });
    $scope.taskModal.hide();

    // Inefficient, but save all the projects
    Projects.save($scope.projects);

    task.title = "";
  };

  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  }

  $scope.toggleProjects = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };


  // Try to create the first project, make sure to defer
  // this by using $timeout so everything is initialized
  // properly
  $timeout(function() {
    if($scope.projects.length == 0) {
      while(true) {
        var projectTitle = prompt('Your first project title:');
        if(projectTitle) {
          createProject(projectTitle);
          break;
        }
      }
    }
  });

    /************************************
   * if given group is the selected group, deselect it
   * else, select the given group
   *************************************/

   $scope.vinculaciones = [{"id":1,"nombre":"Dios"}, {"id":2,"nombre":"conmigo"},{"id":3,"nombre":"Demas"}, ]
  

 $scope.propositos = [{"id":1,"usuario":"rodrigo","vinculacion":1,"proposito":"Amarle a gi","mes_ano":"2015-09-25","marcaciones":[{"id":2,"dia":"2015-09-25","cumplimiento":1,"proposito":1}]},{"id":2,"usuario":"rodrigo","vinculacion":1,"proposito":"Ti amu","mes_ano":"2015-09-25","marcaciones":[{"id":1,"dia":"2015-09-25","cumplimiento":1,"proposito":2}]},{"id":3,"usuario":"rodrigo","vinculacion":1,"proposito":"Sos un capo","mes_ano":"2015-09-25","marcaciones":[{"id":3,"dia":"2015-09-25","cumplimiento":0,"proposito":3}]},{"id":4,"usuario":"rodrigo","vinculacion":1,"proposito":"Rezar","mes_ano":"2014-09-25","marcaciones":[{"id":5,"dia":"2014-09-25","cumplimiento":2,"proposito":4}]},{"id":5,"usuario":"rodrigo","vinculacion":1,"proposito":"rosario","mes_ano":"2014-09-25","marcaciones":[{"id":4,"dia":"2014-09-25","cumplimiento":1,"proposito":5}]},{"id":6,"usuario":"rodrigo","vinculacion":1,"proposito":"Migracion ok","mes_ano":"2015-09-25","marcaciones":[{"id":6,"dia":"2015-09-25","cumplimiento":2,"proposito":6}]}];

  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };



});