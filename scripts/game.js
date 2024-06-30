import {export_save} from "./save.js"
import {load_map} from "./TileField.js"
import {MapField} from "./TileField.js"

async function get_local_data(request){
    return JSON.parse(localStorage.getItem(request))
}

async function set_local_data(request, entity){
    localStorage.setItem(request, JSON.stringify(entity))
}

export async function load_game(local, new_game_flag){

    // prepare user interface fields.

    let header = document.querySelector("header")
    header.textContent = ""
    let main = document.querySelector("main")
    main.innerHTML = ""



    // set map and entities objects.

    let game_field = ""
    if(new_game_flag){
        let map_filename = "../maps/testmap.json"
        load_map(map_filename).then((map_dict)=>{
            if(map_dict == false){
                let div_error = document.createElement("div")
                div_error.textContent = local["errors"]["map"]
                main.append(div_error)
            }else{
                set_local_data("map_dict", map_dict)
                game_field = new MapField(map_dict)
            }
            main.append(game_field.cast_html())
        })
    }else{
        let map_dict = await get_local_data("map_dict")
        game_field = new MapField(map_dict)
        main.append(game_field.cast_html())
    }

    console.log(game_field)

    // set user interface.

    let div_char = document.createElement("div")

    let char_head = document.createElement("div")

    let char_img = document.createElement("img")
    char_head.append(char_img)

    let char_data = document.createElement("div")

    let char_name = document.createElement("div")
    char_name.textContent = localStorage.getItem("user_name")
    char_data.append(char_name)

    let char_hp = document.createElement("div")

    char_hp.textContent = (game_field.hero.hp_cur +
        "/" +
        game_field.hero.hp_max
    )
    localStorage.getItem("user_name")
    char_data.append(char_hp)

    char_head.append(char_data)

    let btn_menu = document.createElement("input")
    btn_menu.type = "button"
    char_head.append(btn_menu)

    div_char.append(char_head)

    let div_menu = document.createElement("div")
    let menu_opt_export_save = document.createElement("input")
    menu_opt_export_save.type = "button"
    menu_opt_export_save.value = local["game_ui"]["menu"]["export_save"]
    menu_opt_export_save.onclick = export_save
    div_menu.append(menu_opt_export_save)

    let menu_opt_help = document.createElement("input")
    menu_opt_help.type = "button"
    menu_opt_help.value = local["game_ui"]["menu"]["help"]
    menu_opt_help.onclick = ()=>{
        window.open("https://github.com/verkhovma/journey/wiki")
    }
    div_menu.append(menu_opt_help)
    div_char.append(div_menu)



    let div_hero = document.createElement("div")

    let inv_btns = document.createElement("div")
    let inv_btn_equip = document.createElement("input")
    inv_btn_equip.type = "button"
    inv_btn_equip.value = local["game_ui"]["hero"]["equip"]
    inv_btns.append(inv_btn_equip)

    let inv_btn_store = document.createElement("input")
    inv_btn_store.type = "button"
    inv_btn_store.value = local["game_ui"]["hero"]["store"]
    inv_btns.append(inv_btn_store)

    let inv_btn_action = document.createElement("input")
    inv_btn_action.type = "button"
    inv_btn_action.value = local["game_ui"]["hero"]["action"]
    inv_btns.append(inv_btn_action)

    div_hero.append(inv_btns)

    let inv_equip = document.createElement("div")

    div_char.append(div_hero)

    main.append(div_char)



    // set user interface's buttons actions.

    btn_menu.onclick = ()=>{
        if(btn_menu.status == "hero"){
            btn_menu.status = "menu"
            btn_menu.value = local["game_ui"]["menu"]["hero"]
            div_menu.style.display = ""
            div_hero.style.display = "none"

        }else{
            btn_menu.status = "hero"
            btn_menu.value = local["game_ui"]["menu"]["menu"]
            div_menu.style.display = "none"
            div_hero.style.display = ""
        }
    }
    btn_menu.status = "menu"
    btn_menu.click()



    return false
}
