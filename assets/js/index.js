var CURRENT_USER_ID = 0;

var validate_user_id = function () {
    if (CURRENT_USER_ID >= lightdm.users.length) {
        CURRENT_USER_ID = 0;
    } else if (CURRENT_USER_ID < 0) {
        CURRENT_USER_ID = (lightdm.users.length - 1);
    }
};

var update_user = function () {
    if (lightdm._username) {
        lightdm.cancel_authentication();
    }

    $('#username').html(lightdm.users[CURRENT_USER_ID].display_name);
    if (lightdm.users[CURRENT_USER_ID].image == '') {
        $('.avatar').attr('src', 'assets/img/avatar.png');
    } else {
        $('.avatar').attr('src', lightdm.users[CURRENT_USER_ID].image);
    }

    lightdm.start_authentication(lightdm.users[CURRENT_USER_ID].name);
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
        settings.saveLastUser(lightdm.authentication_user.name);
        lightdm.login(lightdm.authentication_user, 'bspwm');
    } else {
        update_user();
        $('#password').val('');
        console.log('Invalid password.');
    }
};

$(document).ready(function () {
    CURRENT_USER_ID = settings.getLastUserId(lightdm.users);
    validate_user_id();
    update_user();

    $('#password').focus();

    $('.go-button').on('click', function (event) {
        console.log('Beginning login...');
        var passwd = $('#password').val() || null;
        lightdm.cancel_timed_login();
        lightdm.provide_secret(passwd);
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
            $('.go-button').click();
        }
    });

    $('.right-button').on('click', function (event) {
        CURRENT_USER_ID += 1;
        validate_user_id();
        update_user();
    });

    $('.left-button').on('click', function (event) {
        CURRENT_USER_ID -= 1;
        validate_user_id();
        update_user();
    });
});
