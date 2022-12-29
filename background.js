chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    var url = tab.url;
    if (url !== undefined && changeInfo.status === 'complete') 
    {
        chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./foreground_styles.css"]
        })
            .then(() => {
                console.log("INJECTED THE FOREGROUND STYLES.");

                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ["./foreground.js"]
                })
                    .then(() => {
                        console.log("INJECTED THE FOREGROUND SCRIPT.");
                    });
            })
            .catch(err => console.log(err));
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'get_summary') {
        (async () => {
            let data = {
                "model": "text-davinci-003",
                "prompt": request.payload,
                "temperature": 0.7,
                "max_tokens": 2048,
                "top_p": 1,
                "frequency_penalty": 0.0,
                "presence_penalty": 0.0
            };
            try {
                let response = await fetch("https://api.openai.com/v1/completions", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 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'
                    }, 
                    body: JSON.stringify(data)
                });
                response = await response.text();
                
                console.log(response);
                response = JSON.parse(response);
                sendResponse({
                    message: 'success',
                    payload: response.choices[0].text
                });
                return true;
            } catch (error) {
                console.log(error);
                sendResponse({
                        message: 'fail'
                });
    
                return;
            }
        })();
        

 
        return true;
    }

});