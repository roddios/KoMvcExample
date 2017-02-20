
var globHelper = new Object();

globHelper.baseUrl = function () {
    return '/api/';
}

globHelper.htmlEscape = function (str) {
    return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}

globHelper.postRequest = function (url, jsonData, success, failure) {
    $.ajax({
        url: globHelper.baseUrl() + url,
        type: 'POST',
        data: JSON.stringify(jsonData),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            success(data);
        },
        error: function (jqXHR, textStatus, errorThrown) { failure(errorThrown); }
    });
}

globHelper.postRequestUrlEncoded = function (url, data, success, failure) {
    $.ajax({
        url: globHelper.baseUrl() + url,
        type: 'POST',
        data: data,
        contentType: 'application/x-www-form-urlencoded',
        success: function (data) {
            success(data);
        },
        error: function (jqXHR, textStatus, errorThrown) { failure(errorThrown); }
    });
}

globHelper.postSecuredRequest = function (url, jsonData, success, failure) {

    var getData = localStorage.getItem('authorizationData');
    var authData = null;
    if (getData != null || getData != '') {
        authData = JSON.parse(getData);
    }

    if (authData == null || authData == undefined) {
        authData = {};
        authData.token = '';
    }
    $.ajax({
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", 'Bearer ' + authData.token);
        },
        url: globHelper.baseUrl() + url,
        type: 'POST',
        data: JSON.stringify(jsonData),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            success(data);
        },
        error: function (jqXHR, textStatus, errorThrown) { failure(errorThrown); }
    });
}

globHelper.getRequest = function (url, jsonData, success, failure) {
    $.ajax({
        url: globHelper.baseUrl() + url,
        type: 'GET',
        data: jsonData,
        contentType: 'application/json; charset=utf-8',
        success: function (data) { success(data); },
        error: function (jqXHR, textStatus, errorThrown) { failure(errorThrown); }
    });
}

globHelper.getSecuredRequest = function (url, jsonData, success, failure) {

    var getData = localStorage.getItem('authorizationData');
    var authData = null;
    if (getData != null || getData != '') {
        authData = JSON.parse(getData);
    }
    $.ajax({
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", 'Bearer ' + authData.token);
        },
        url: globHelper.baseUrl() + url,
        type: 'GET',
        data: jsonData,
        contentType: 'application/json; charset=utf-8',
        success: function (data) { success(data); },
        error: function (jqXHR, textStatus, errorThrown) { failure(errorThrown); }
    });
}

globHelper.formatDate = function (dateStr) {

    var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
    ];

    var dt = new Date(dateStr + "Z");


    var day = dt.getUTCDate();
    var monthIndex = dt.getUTCMonth();
    var year = dt.getFullYear();

    var formated = monthNames[monthIndex] + ' ' + day + ', ' + year;
    return formated;
}

globHelper.formatDate2 = function (date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

globHelper.isNullUndefinedOrEmpty = function (obj) {
    if (obj == null || obj == undefined || globHelper.isEmpty(obj) || obj == "")
        return true;

    return false;
}

globHelper.isEmpty = function (obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return true && JSON.stringify(obj) === JSON.stringify({});
}

globHelper.findAndRemoveById = function (arr, id) {
    for (var i = 0; i < arr.length; i++) {
        var cur = arr[i];
        if (cur.Id == id) {
            arr.splice(i, 1);
            break;
        }
    }
}

globHelper.findById = function (arr, id) {
    for (var i = 0; i < arr.length; i++) {
        var cur = arr[i];
        if (cur.Id == id) {
            return cur;
        }
    }
    return null;
}

globHelper.findByProfileId = function (arr, profileId) {
    for (var i = 0; i < arr.length; i++) {
        var cur = arr[i];
        if (cur.ProfileId == profileId) {
            return cur;
        }
    }
    return null;
}

globHelper.log = function (type, errorMsg, errorStack, friendlyMsg, success, failure) {
    debugger;
    var typeId = 3;
    if (type.toLowerCase() == 'error')
        typeId = 1;
    else if (type.toLowerCase() == 'warning')
        typeId = 2;


    var data = { Stacktrace: errorStack, FriendlyMessage: friendlyMsg, Message: errorMsg, LogType: typeId };
    return globHelper.postRequest('log', data,
      function (result) {
          if (success != null && success != undefined)
              success(result);
          else {
              if (!globHelper.isNullUndefinedOrEmpty(friendlyMsg)) {
                  if (typeId == 3)
                      showMessage(friendlyMsg);
                  else
                      showErrorMessage(friendlyMsg);
              }

          }
      },
      function (responseError) {
          if (responseError != null && responseError != undefined)
              failure(result);
          else {
              {
                  if (!globHelper.isNullUndefinedOrEmpty(friendlyMsg)) {
                      if (typeId == 3)
                          showMessage(friendlyMsg);
                      else
                          showErrorMessage(friendlyMsg);
                  }

              }
          }

      });
}

globHelper.trunc = function (string, length, delimiter) {
    delimiter = delimiter || "...";
    return string.length > length ? string.substr(0, length) + delimiter : string;
};

globHelper.handleApiError = function (error) {
    var friendlyMsg = error;
    showErrorMessage(friendlyMsg);
    throw error;
}

globHelper.handleClientError = function (ex) {
    var friendlyMsg = 'something went wrong with your request';
    globHelper.log('error', ex.message, ex.stack, friendlyMsg, function () {
        showErrorMessage(ex.message);
        throw ex;
    }, function (reuslt) { });


}

globHelper.genericValidSetting = function () {
    var knockoutValidationSettings = {
        insertMessages: false,
        decorateElement: true,
        errorElementClass: 'errorBorder',
        errorClass: 'errorBorder',
        errorsAsTitle: true,
        parseInputAttributes: false,
        messagesOnModified: true,
        decorateElementOnModified: true,
        decorateInputElement: true
    };
    return knockoutValidationSettings;
}