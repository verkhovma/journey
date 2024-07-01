import {import_save} from "./save.js"
import {load_game} from "./game.js"

export async function load_login_page(lang){

    let response = await fetch(lang)
    if(response.status != 200)
        return false
    let local = await response.json()

    // login header.
    let header = document.querySelector("header")
    header.textContent = local["login"]["header"]

    let main = document.querySelector("main")

    // user login or registration.
    let form_login = document.createElement("form")
    form_login.autocomplete = "off";
    let user_name = document.createElement("input")
    user_name.required = true
    let btn_continue = document.createElement("input")
    btn_continue.type = "submit"
    btn_continue.value = local["login"]["btns"]["continue"]
    btn_continue.code = 0
    let btn_new_game = document.createElement("input")
    btn_new_game.type = "submit"
    btn_new_game.value = local["login"]["btns"]["new game"]
    btn_new_game.code = 1
    let btn_import_save = document.createElement("input")
    btn_import_save.type = "button"
    btn_import_save.value = local["login"]["btns"]["import save"]
    btn_import_save.onclick = import_save

    form_login.append(user_name)
    form_login.append(btn_continue)
    form_login.append(btn_new_game)
    form_login.append(btn_import_save)

    // check if saved data available,
    // then provide actions.
    let saved_user_name = localStorage.getItem("user_name")
    if(saved_user_name != null){
        user_name.value = saved_user_name
        let same_continue = btn_continue.value + saved_user_name
        let rename_continue = local["login"]["btns"]["rename_cont"]
        btn_continue.value = same_continue

        user_name.onkeyup = ()=>{
            if(user_name.value != saved_user_name)
                btn_continue.value = rename_continue + user_name.value
            else
                btn_continue.value = same_continue
        }
    }else{
        btn_continue.disabled = true
    }

    form_login.onsubmit = ()=>{
        localStorage.setItem("user_name", user_name.value)

        // second arg is flag of new game.
        if(event.submitter.code == btn_new_game.code)
            load_game(local, true)
        else if(event.submitter.code == btn_continue.code)
            load_game(local, false)

        return false
    }

    main.append(form_login)

}
