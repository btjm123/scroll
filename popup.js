//roles: 0: inactive, 1: follower, 2: master
document.addEventListener('DOMContentLoaded', function() {
    var link1 = document.getElementById('main-button');
    var link2 = document.getElementById('main-button-2');
    var link3 = document.getElementById('main-button-3');
    var link4 = document.getElementById('main-button-4');

    chrome.storage.sync.get(['role'], function(data){
        var currentCode = 1234;
        chrome.storage.sync.get(['code'], function(data1){
            currentCode = data1.code;
            // alert("hello!" + data1.code);

            if(typeof data.role != "undefined"){
                switch(data.role){
                    case 1:
                        document.getElementById('main-label').textContent = "You are following!"; 
                        link4.value = currentCode;
                        break;
    
                    case 2:
                        document.getElementById('main-label').textContent = "You are the master!";
                        link4.value = currentCode;
                        break;
    
                    default:
                        document.getElementById('main-label').textContent = "You are inactive!";
                }
    
            } else {
                chrome.storage.sync.set({'role': 0}, function() {
                    console.log('Role is set to 0' );
                });
            }
        });
        
    });


    // onClick's logic below:
    link2.addEventListener('click', function() {
        
        chrome.storage.sync.set({'role': 1}, function() {
            console.log('Role is set to 1');
        });
        
        
      fetch("https://dummyhnr.tech:5223/getscroll/" + link4.value).then((response) => {
          
          if (response.ok) {

                                let json = response.json();
                                json.then((data) => {
                                    /*chrome.tabs.getSelected(null, function(tab) {
                                    var code = `window.open('${data.url}', '_blank');`;
                                        
                                    chrome.tabs.executeScript(tab.id, {code: code});
                                    });*/
                                    //alert(data.url);
                                    if(data.url=== undefined){
                                    alert('Invalid number entered.');
                                    chrome.storage.sync.set({'role': 0}, function() {
                                        console.log('Role is set to 0 due to invalid');
                                    });} else {
                                    document.getElementById('main-label').textContent = "You are following!";
                                    chrome.tabs.create({ url: data.url });
                                    }
                                });
          }
      });
  
    });

    // onClick's logic below:
    link3.addEventListener('click', function() {
        document.getElementById('main-label').textContent = "You are inactive!";
        chrome.storage.sync.set({'role': 0}, function() {
            console.log('Role is set to 0');
        });
        if($("#main-button-4").prop('disabled')){
            $("#main-button-4").prop("disabled", false);
        }
        chrome.tabs.getSelected(null, function(tab) {
            var code = 'window.location.reload();';
            chrome.tabs.executeScript(tab.id, {code: code});
        });
    });

    link1.addEventListener('click', function() {
        document.getElementById('main-label').textContent = "You are the master!";
        chrome.storage.sync.set({'role': 2}, function() {
            console.log('Role is set to 2');
        });
        chrome.tabs.getSelected(null, function(tab) {
            var code = 'window.location.reload();';
            chrome.tabs.executeScript(tab.id, {code: code});
        });
        window.location.reload();

    });
    
        link4.addEventListener('input', function() {
            chrome.storage.sync.set({'code': link4.value}, function() {
                console.log('Code is set to ' + link4.value);
            });
    });
    
    
    
});


chrome.storage.sync.get(['role'], function(data){

    if(typeof data.role != "undefined"){
        switch(data.role){
            case 1:
                console.log('Role is set to 1');
                $("#main-button-4").prop('disabled', true);
                break;

            case 2:
                console.log('Role is set to 2');
                $("#main-button-4").prop('disabled', true);
                break;

            default:
                console.log('Role is set to 0');
                $("#main-button-4").prop('disabled', false);
        }

    } else {
        chrome.storage.sync.set({'role': 0}, function() {
            console.log('Role is set to 0' );
        });
    }
});

