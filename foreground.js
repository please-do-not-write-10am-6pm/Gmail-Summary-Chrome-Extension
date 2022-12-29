var ce_main_container = document.createElement('DIV');
var ce_icon = document.createElement('img');

ce_main_container.classList.add('ce_main');
ce_icon.src = chrome.runtime.getURL("/images/png-transparent-message-note-notification-pinterest-pinterest-ui-colored-icon.png")
ce_icon.style.width = '20px';
ce_icon.style.height = '20px';

var ce_iconwrapper = document.createElement('DIV');
ce_iconwrapper.style.width = '400px';
ce_iconwrapper.style.display = 'flex';
ce_iconwrapper.style.justifyContent = 'start';
ce_iconwrapper.style.alignItems = 'center';
ce_iconwrapper.append(ce_icon);

ce_main_container.appendChild(ce_iconwrapper);

var ce_content = document.createElement('pre');
var img_content = chrome.runtime.getURL("/images/messageContent.png");
ce_content.classList.add('sumerize-bubble');
ce_content.style.maxWidth = '400px';
ce_content.style.width = 'max-content'
ce_content.style.height = 'fit';
ce_content.style.position = 'absolute';
ce_content.style.borderRadius = '25px';
ce_content.style.border = '2px solid black'
ce_content.style.top = '22px';
ce_content.style.left = '-25px';
ce_content.style.fontSize = '15px';
ce_content.style.whiteSpace = 'break-spaces';
ce_content.innerHTML = 'Loading summary...'
ce_content.style.display = 'none';
ce_main_container.style.display = "inline-flex"
ce_main_container.appendChild(ce_content);
var hover = false;
var currentPage = location.href;
var flag = true;
var text_content="";
var inboxBtn;
var previous_email = 0;
setTimeout(() => {
    {
        inboxBtn = document.querySelector('div[class=ha]');
        if(inboxBtn) {
            
            inboxBtn.appendChild(ce_main_container);
        }
    }
    setInterval(function()
    {
        inboxBtn = document.querySelector('div[class=ha]');
        if(inboxBtn && !document.querySelector('div[class=ce_main]')) {
            inboxBtn.appendChild(ce_main_container);
        }
        if(inboxBtn &&  document.querySelector('div[jslog="20277; u014N:xr6bB; 4:W251bGwsbnVsbCxbXV0."]')) {
            text_content = 'Here is an email I received. Give me the most important points of this email in bullet points. The response should start with "Email Summary:" and show the most important point in bullets. Here is the email: ' + document.querySelector('div[jslog="20277; u014N:xr6bB; 4:W251bGwsbnVsbCxbXV0."]').innerText;
            if(text_content != previous_email && hover)
            {   
                if(document.querySelector('pre[class=sumerize-bubble]')) {
                    document.querySelector('pre[class=sumerize-bubble]').innerHTML = 'Loading summary...';
                }
                chrome.runtime.sendMessage({ 
                    message: "get_summary",
                    payload: text_content
                }, response => {

                    console.log(response);
                    if (response.message === 'success') {
                        let temp = response.payload;
                        while(temp[0] == '\n') temp = temp.slice(1);
                        ce_content.innerHTML = temp;
                        ce_content.style.color = 'black';
                        if(response.payload.trim() == ''){
                            ce_content.innerHTML = 'There is no proper summary for this email.'
                            ce_content.style.color = 'red';
                        }
                    }
                    else{
                        ce_content.innerHTML = 'There is no proper summary for this email.'
                        ce_content.style.color = 'red';
                    }
                    ce_main_container.style.display = "inline-flex"

                });
                previous_email = text_content;
                hover = false;
            }
                
        }
        else{
            ce_content.innerHTML = 'Loading summary...'
        }


    }, 1000);
    
    
    
}, 100);

ce_main_container.addEventListener('mouseover', (e) => {
    if( ce_content.innerHTML)    {
        ce_content.style.display = 'flex';
        hover = true;
    }
})


ce_main_container.addEventListener('mouseout', (e) => {
    ce_content.style.display = 'none';
})