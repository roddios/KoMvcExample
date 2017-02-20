
'use strict';

// this file is used to make calls to the web API to get data from server-side
var service = new Object();

var _getStudents = function (success, failure) {
    return globHelper.getRequest('students', null,
      function (result) {
          success(result);
      },
      function (responseError) {
          return failure(responseError);
      });
}

service.getStudents = _getStudents;




