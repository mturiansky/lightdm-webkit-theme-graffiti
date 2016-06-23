var CURRENT_USER_ID = 0;
var SESSION_CHOICE_ID = -1;

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

var toggle_hide_groups = function () {
    $('.hide-group-1').toggle();
    $('.hide-group-2').toggle();
};

var select_session = function (i) {
    if (i < -1 || i >= lightdm.sessions.length) {
        SESSION_CHOICE_ID = -1;
    } else {
        SESSION_CHOICE_ID = i;
    }

    toggle_hide_groups();
    update_session_list();
};

var update_session_list = function () {
    $('.session-choice-list').empty();

    if (SESSION_CHOICE_ID === -1) {
        $('.session-choice-list').append('<span class="glyphicon glyphicon-arrow-right pull-left"></span><div onclick="select_session(-1)">default</div>');
    } else {
        $('.session-choice-list').append('<div onclick="select_session(-1)">default</div>');
    }

    for (var i = 0; i < lightdm.sessions.length; i++) {
        var to_append = '';
        if (i === SESSION_CHOICE_ID) {
            // need to make this not mess up text centering
            to_append += '<span class="glyphicon glyphicon-arrow-right pull-left"></span>';
        }
        to_append += '<div onclick="select_session(' + i + ')">' + lightdm.sessions[i].name.toLowerCase() + '</div>';
        $('.session-choice-list').append(to_append);
    }
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
        if (SESSION_CHOICE_ID === -1) {
            settings.saveLastSession(lightdm.sessions[0].name);
            lightdm.login(lightdm.authentication_user, lightdm.sessions[0].key);
        } else {
            settings.saveLastSession(lightdm.sessions[SESSION_CHOICE_ID].name);
            lightdm.login(lightdm.authentication_user, lightdm.sessions[SESSION_CHOICE_ID].key);
        }
    } else {
        update_user();
        $('#password').val('');
        console.log('Invalid password.');
    }
};

$(document).ready(function () {
    CURRENT_USER_ID = settings.getLastUserId(lightdm.users);
    SESSION_CHOICE_ID = settings.getLastSessionId(lightdm.sessions);
    validate_user_id();
    update_user();

    //populate session list
    update_session_list();

    $('#password').focus();

    $('.go-button').on('click', function (event) {
        console.log('Beginning login...');
        var passwd = $('#password').val() || null;
        lightdm.cancel_timed_login();
        lightdm.provide_secret(passwd);
    });

    $('.session-button').on('click', toggle_hide_groups);

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
