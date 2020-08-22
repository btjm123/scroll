let urlg = "https://dummyhnr.tech:5223/getscroll/"
var remember = 0;
cooldown = 0;
console.log('getscroll called!');
var code = 'fmlfkl';

chrome.storage.sync.get(['role', 'code'], function (data) {

    if (typeof data.role != "undefined" && data.role == 1) {
        if (typeof data.code != "undefined") code = data.code;
        
        
        
        
        setInterval(function imm() {
            fetch(urlg + code).then((response) => {
                if (response.ok) {

                    let json = response.json();
                    json.then((data) => {
                        if(data.url == ''){
                            //die
                            alert('invalid number');
                            chrome.storage.sync.set({'role': 0}, function() {
                                console.log('Role is set to 0 due to invalid');
                            });
                        } else {
                        // alert(window.location.href);
                        if (data.url == window.location.href) {
                            let scrolli = data.pos;
                            console.log('GET:' + code + ':' + scrolli + ':', data.url);
                            //alert(scrolli);
                            $('html').animate({
                                scrollTop: scrolli
                            }, 500);
                            //console.log(scrolli)
                            remember = 1;


                        }

                        if (data.url != window.location.href && remember == 1 && cooldown != 1) {
                            window.location.href = data.url;
                            setInterval(function(){
                                //waste time
                                cooldown = 1;
                            }, 1000);
                            cooldown = 0;
                        }
                        chrome.storage.sync.get(['clip'], function(datas){
                            if(data.clipText != datas.clip){
                                // writing time!
                                window.navigator.clipboard.writeText(data.clipText)
                                    .then(() => {
                                    // Success!
                                    chrome.storage.sync.set({'clip': data.clipText}, function() {
                                        console.log('Written clip to local storage!');
                                    });
                                })
                                    .catch(err => {
                                    console.log('Something went wrong', err);
                                });
                            }
                        });
                    }
                    });
                } else {
                    alert('invalid number');
                            chrome.storage.sync.set({'role': 0}, function() {
                                console.log('Role is set to 0 due to invalid');
                            });
                }
            }).catch((err) => {
                console.log("Connection lost: " + err);
            });

            return imm;
        }, 700);

    }
});


