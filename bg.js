{
  let onStartup = () => {
    let { userScripts } = chrome;
    userScripts &&
    userScripts.getScripts(scripts =>
      scripts.length || (
        userScripts.register([{
          id: "0",
          js: [{ code: "for(let g=document.images,p,s,i=0;i<g.length;++i)(s=(p=g[i]).dataset.src)&&(p.src=s)" }],
          matches: ["https://gigazine.net/","https://gigazine.net/P*"],
          runAt: "document_end"
        }]),
        chrome.runtime.onStartup.removeListener(onStartup)
      )
    );
  }
  chrome.runtime.onStartup.addListener(onStartup);
  chrome.runtime.onInstalled.addListener(() => (
    chrome.contentSettings.javascript.get({
     primaryUrl: "https://gigazine.net"
    }, details =>
      details.setting == "allow" &&
      chrome.contentSettings.javascript.set({
        primaryPattern: "https://gigazine.net/*",
        setting: "block"
      })
    ),
    onStartup()
  ));
}