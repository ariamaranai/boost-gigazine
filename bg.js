{
  let f = () => {
    let { userScripts } = chrome;
    userScripts &&
    userScripts.getScripts(scripts =>
      scripts.length || (
        userScripts.register([{
          id: "0",
          js: [{ code: "for(let g=document.images,i=0,p,s;i<g.length;++i)(s=(p=g[i]).dataset.src)&&(p.src=s)" }],
          matches: ["https://gigazine.net/", "https://gigazine.net/P*"],
          runAt: "document_end"
        }]),
        chrome.runtime.onStartup.removeListener(f)
      )
    );
  }
  chrome.runtime.onStartup.addListener(f);
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
    f()
  ));
}