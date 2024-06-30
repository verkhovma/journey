"use strict"

// setup language.
let lang = window.location.href.split("?")[1];
if((lang == undefined) || (lang == "")){
    lang = localStorage.getItem("lang")
    if(lang == null){
        lang = "en"
    }
}
localStorage.setItem("lang", lang)

lang = "../locals/" + lang + ".json"

// load and display login page.
import {load_login_page} from "./login.js"
load_login_page(lang).then((load_status)=>{
    if(load_status == false){
        lang = "en"
        localStorage.setItem("lang", lang)
        lang = "../locals/" + lang + ".json"
        load_login_page(lang)
    }
})

// set other language buttons.
let footer = document.querySelector("footer")
let lang_btns = document.createElement("div")
let langs = ["en", "ru"]
for(let i of langs){
    let other_lang_btn = document.createElement("input")
    other_lang_btn.type = "button"
    other_lang_btn.value = i
    other_lang_btn.onclick = ()=>{
        location.href = "./?" + i
    }
    lang_btns.append(other_lang_btn)
}
footer.append(lang_btns)

// set contacts.
let link_github = document.createElement("a")
link_github.href = "https://github.com/verkhovma/journey"
link_github.textContent = "github"
footer.append(link_github)
