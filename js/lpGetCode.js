// LP Logger
function logger(text) {
    console.info(`%c ** lpLog ** ${text} `, 'background:#002f6d;color:#fff');
}

// BEGIN oAuth JS Method
var code;

var cnf = {
    redirectURI: 'https://arob-ttec.github.io/oauth_cf_html_demo/',
    authURI: 'https://dev-ttec-arob.us.auth0.com/authorize',
    clientID: 'DHZEqPgrHeOeWn7BE0ihf5fYbGCmLUa5',
    response_type: 'code'
};

// On-page oauth code flow method
lpGetCode = function (callback) {
    code = getParameterByName('code')
    if (code == null) {
        console.log('code undefined');
        document.location = cnf.authURI + '?' + $.param({
            client_id: cnf.clientID,
            response_type: cnf.response_type,
            scope: 'openid email profile',
            redirect_uri: cnf.redirectURI
        });
    }
    else {
        console.log('Got the Authcode from redirect url::' + code);

        var result = {
            ssoKey: code,
            redirect_uri: cnf.redirectURI
        };
        callback(result);
    }
};

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Need to define one time on the page 
lpTag.sdes = lpTag.sdes || []; 

// Web tag - Send visitorLoggedIn to Live Person.
// Define per https://developers.liveperson.com/web-tag-sdes.html
/*var CustInfo = {
    'type': 'ctmrinfo',  //MANDATORY customer info
    'info': {
        'ctype': 'visitorLoggedIn'
    }
};*/

// Replaces engagement attributes API
// READ: https://developers.liveperson.com/consumer-authentication-detailed-api.html
lpTag.identities=[];
lpTag.identities.push(identityFn);
function identityFn(callback) {
    callback({
        iss: 'Test',
        acr: 'loa1',
        sub: 'test12356675555444'
        //sub: checkCookie('LPSID-45322705') 
    });
}

// check user location before sending customer info
/*if (window.location.href.indexOf('/nfcu_auth/') > 0) {
    sendCtype();
}*/

// Function to send customer info
/*function sendCtype() {
    if (lpTag.sdes.send) {
        lpTag.sdes.send(CustInfo);
        clearTimeout(sendCtype);
        //return false;
    } else {
        setTimeout(sendCtype, 50);
    }
}*/
