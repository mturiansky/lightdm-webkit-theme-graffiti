var get_user = function (user) {
    for (var i = 0; i < lightdm.users.length; i++) {
        if (user == lightdm.users[i].name) {
            lightdm.cancel_timed_login();
            lightdm.start_authentication(lightdm.users[i].name);
            return true;
        }
    }

    return false;
};

$(document).ready(function () {
    $('#login-button').on('click', function (event) {
        console.log('Beginning login...');
        var uname = $('#username').val() || null;
        var passwd = $('#password').val() || null;

        if (get_user(uname)) {
            console.log('Found username...');
            lightdm.provide_secret(passwd);
        } else {
            $('#username').val('');
            $('#password').val('');
            console.log('Login failed.');
        }
    });
});
