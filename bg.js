chrome.contentSettings.javascript.get({ primaryUrl: "https://gigazine.net" }, async e => (
  e.setting == "allow" && chrome.contentSettings.javascript.set({
    primaryPattern: "https://gigazine.net/",
    setting: "block"
  }),
  await chrome.userScripts.unregister(),
  chrome.userScripts.register([{
    id: "0",
    js: [{ code: "{let g=document.images,i=g.length,p,s;while((s=(p=g[--i]).dataset.src)&&(p.src=s),i);}" }],
    matches: ["https://gigazine.net/", "https://gigazine.net/P*"]
  }])
));