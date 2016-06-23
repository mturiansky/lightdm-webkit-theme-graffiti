var _saveLastUser = function (uname) {
    this.lastUser = uname;
    localStorage.lastUser = uname;
};

var _getLastUserId = function (userList) {
    for (var i = 0; i < userList.length; i++) {
        if (userList[i].name === this.lastUser) {
            return i;
        }
    }

    return 0;
};

var _saveLastSession = function (sname) {
    this.lastSession = sname;
    localStorage.lastSession = sname;
};

var _getLastSessionId = function (sessionList) {
    for (var i = 0; i < sessionList.length; i++) {
        if (sessionList[i].name === this.lastSession) {
            return i;
        }
    }

    return -1;
};

var settings = {
    lastUser: (typeof(localStorage.lastUser) !== 'undefined') ? localStorage.lastUser : '',
    lastSession: (typeof(localStorage.lastSession) !== 'undefined') ? localStorage.lastSession : '',
    backgroundImage: (typeof(localStorage.backgroundImage) !== 'undefined') ? localStorage.backgroundImage : '../img/bg.jpg',
    saveLastUser: _saveLastUser,
    getLastUserId: _getLastUserId,
    saveLastSession: _saveLastSession,
    getLastSessionId: _getLastSessionId
};
