const lpLocalStorage_demo = window.localStorage;
        
function autoClick() {
    //var x = document.getElementsByClassName('LPMoverlay')[0].id;
    var x = document.querySelector('div[data-lp-event="click"]');
    logger(`Target click element: ${x}`);
    if(x) {
      logger('Found button to click!\nExecuting click action!');
      x.click();
    } else {
      logger('Button not found!\nUnable to execute click action!');
    }
}

// Remove engagementId from storage when conversation ends.
lpTag.events.bind({
    eventName: 'state',
    appName: 'lpUnifiedWindow',
    func: function processThis(data, eventInfo) {
        const { state } = data;
        logger(`Unified window state: ${data.state}`);
        switch (state) {
            case 'ended': {
                setTimeout(() => {
                    window.location.href = 'https://arob-ttec.github.io/oauth_cf_html_demo/'; //This works!!
                    //window.location.href = 'https://nehfster62.auth0.com/login'; //Doesn't work!
                    lpLocalStorage_demo.removeItem('lp_engagementId_demo');
                    logger('Conversation ended: Local Storage Item lp_engagementId_demo was removed!');
                }, 2500);
                break;
            }
            default:
                break;
        }
    },
    async: true,
    triggerOnce: false,
});        

// Evaluate local storage when engagement displays. If stored value matches data   
// engagementId, auto click engagement button which auto starts conversation window.
lpTag.events.bind({
    eventName: 'OFFER_DISPLAY',
    appName: 'LP_OFFERS',
    func: function processThis(data) {                                      
        if(lpLocalStorage_demo.lp_engagementId_demo == data.engagementId) {
            (function(){ 
                setTimeout( function() { 
                    autoClick();
                    logger('Auto Click Successful! oAuth window is open!');
                    //lpLocalStorage_demo.removeItem('lp_engagementId_demo');
                    //logger('Local Storage Item lp_engagementId_demo was removed'); 
                }, 2500); 
            })();
        } else {
            return; 
        }
    },
    async: true,
    triggerOnce: true,
});

// Engagement button clicked: Check engagementId in local storage. If 'undefined', 
// get and save engagementId in local storage.
lpTag.events.bind({
    eventName: 'OFFER_CLICK',
    appName: 'LP_OFFERS',
    func: function processThis(data) {
        switch(lpLocalStorage_demo.lp_engagementId_demo) {
            case undefined:
                lpLocalStorage_demo.setItem('lp_engagementId_demo', data.engagementId);
                logger(`Engagement: ${data.engagementName} (${lpLocalStorage_demo.lp_engagementId_demo}) displayed`);
                break;
            default:
                break;
        }                                                                        
    },
    async: true,
    triggerOnce: true,
});
