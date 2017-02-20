
function homeViewModel() {
    var self = this;

    self.students = ko.observableArray();
    self.newId = ko.observable('');
    self.newName = ko.observable('');

    self.sayHello = function () {
        alert('hello');
    }

    self.addNewStudent = function () {
        var newStudent = { Id: self.newId(), Name: self.newName() };
        self.students.push(newStudent); 
    }

    self.deleteThis = function(item) {
        self.students.remove(item);
    }

};

function bindHomeViewModel() {

    var vm = new homeViewModel();
    ko.applyBindings(vm, document.getElementById("ko-bind-section"));

    // after binding is done we are making an async call to read students from api/database
    service.getStudents(function (response) {

        vm.students(response); // if succesful we set the students 

    }, function () { alert('error'); });
}



