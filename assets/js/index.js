var get_user = function (user) {
    if (lightdm._username) {
        lightdm.cancel_authentication();
    }

    for (var i = 0; i < lightdm.users.length; i++) {
        if (user == lightdm.users[i].name) {
            lightdm.start_authentication(lightdm.users[i].name);
            return true;
        }
    }

    return false;
};

window.show_prompt = function (text) {
    console.log('prompt: ' + text);
};
window.show_message = function (text, type) {
    console.log(type + ": " + text);
};

window.authentication_complete = function () {
    console.log('Authentication complete...');
    if (lightdm.is_authenticated) {
        console.log('Login...');
        lightdm.login(lightdm.authentication_user, 'bspwm');
    } else {
        if (lightdm._username) {
            lightdm.cancel_authentication();
        }

        $('#password').val('');
        console.log('Invalid password.');
    }
};

$(document).ready(function () {
    $('#login-button').on('click', function (event) {
        console.log('Beginning login...');
        var uname = $('#username').val() || null;
        var passwd = $('#password').val() || null;

        if (get_user(uname)) {
            console.log('Found username...');
            lightdm.cancel_timed_login();
            setTimeout(function () {
                lightdm.provide_secret(passwd);
            }, 1000);
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
