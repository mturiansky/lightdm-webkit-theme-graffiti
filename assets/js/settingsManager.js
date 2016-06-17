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

var settings = {
    lastUser: (typeof(localStorage.lastUser) !== 'undefined') ? localStorage.lastUser : '',
    backgroundImage: (typeof(localStorage.backgroundImage) !== 'undefined') ? localStorage.backgroundImage : '../img/bg.jpg',
    saveLastUser: _saveLastUser,
    getLastUserId: _getLastUserId
};
