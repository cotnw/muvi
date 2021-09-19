let s = document.createElement('script');

// s.src = chrome.runtime.getURL('support/google/script.js'); //Uncomment this and comment the next line if you don't want auto-updates otherwise leave it as is
s.src = 'https://muvi-api.anshulsaha.repl.co/support/google.js'

s.onload = function() {
    this.remove();
};

(document.head || document.documentElement).appendChild(s);