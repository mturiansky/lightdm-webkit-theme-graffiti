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

var authentication_complete = function () {
    if (lightdm.is_authenticated) {
        return lightdm.login(lightdm.authentication_user, lightdm.default_session);
    } else {
        $('#password').val('');
        console.log('Invalid password.');
        return;
    }
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
            console.log('Invalid username.');
        }
    });

    $('#sleep').on('click', function (event) {
        lightdm.suspend();
    });

    $('#reboot').on('click', function (event) {
        lightdm.restart();
    });

    $('#shutdown').on('click', function (event) {
        lightdm.shutdown();
    });

    $('#password').keyup(function (event) {
        if (event.keyCode == 13) {
            $('#login-button').click();
        }
    });

    $('#username').keyup(function (event) {
        if (event.keyCode == 13) {
            $('#password').focus();
        }
    });
});
