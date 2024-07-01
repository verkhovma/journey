import {Tile} from "./Entity.js"
import {Weapon} from "./Entity.js"
import {Armor} from "./Entity.js"
import {Potion} from "./Entity.js"

import {LiveEntity} from "./Entity.js"
import {Hero} from "./Entity.js"
import {Enemy} from "./Entity.js"

export async function load_map(map_filename){
    let response = await fetch(map_filename)
    if(response.status != 200)
        return false
    let map_dict = await response.json()
    return map_dict
}

function create_item(class_item, list_data, list_imgs_item, coords = [null, null]){
    switch(class_item){
        case "weapons":{
            return new Weapon(
                list_data[0],
                list_imgs_item[list_data[1]],
                coords[0],
                coords[1],
                list_data[2],
                list_data[3]
            )
        } break
        case "armors":{
            return new Armor(
                list_data[0],
                list_imgs_item[list_data[1]],
                coords[0],
                coords[1],
                list_data[2]
            )
        } break
        case "potions":{
            return new Potion(
                list_data[0],
                list_imgs_item[list_data[1]],
                coords[0],
                coords[1],
                list_data[2]
            )
        } break
    }
}

class TileField {
    cast_html(){
        let field = document.createElement("table")
        for(let i = 0; i < this.field.length; i++){
            let row = document.createElement("tr")
            for(let j = 0; j < this.field[0].length; j++){
                let cell = document.createElement("td")
                cell.append(this.field[i][j].get_content())
                row.append(cell)
            }
            field.append(row)
        }
        return field
    }
}

export class ListField extends TileField {
    constructor(list_items, list_imgs_item){
        super()

        this.field = []
        let rows = Math.round(list_items.length / 3 + 0.56)
        for(let i = 0; i < rows; i++){
            this.field[i] = []
            for(let j = 0; j < 3; j++){
                let item_number = (i * 3 + j)
                if(item_number < list_items.length){
                    this.field[i][j] = create_item(
                        list_items[item_number][0],
                        list_items[item_number].slice(1),
                        list_imgs_item
                    )
                } else {
                    this.field[i][j] = new Tile(0, "empty.png")
                }
            }
        }
    }
}

export class MapField extends TileField {
    constructor(dict){
        super()

        let list_map = dict["map"]
        this.field = []
        for(let i = 0; i < list_map.length; i++){
            this.field[i] = []
            for(let j = 0; j < list_map[i].length; j++){
                this.field[i][j] = new Tile(
                    list_map[i][j],
                    dict["images"]["land"][list_map[i][j]]
                )
            }
        }

        this.hero = new Hero(
            dict["chars"]["hero"],
            dict["images"]["char"][dict["chars"]["hero"][0]],
            dict["images"]["item"]
        )
        this.princess = new LiveEntity(
            "princess",
            dict["chars"]["princess"].slice(1),
            dict["images"]["char"][dict["chars"]["princess"][0]]
        )

        let list_enemies = dict["chars"]["enemies"]
        this.enemies = []
        for(let i = 0; i < list_enemies.length; i++){
            this.enemies[i] = new Enemy(
                list_enemies[i],
                dict["images"]["char"][list_enemies[i][1]]
            )
        }

        let list_items_categories = [
            "weapons",
            "armors",
            "potions"
        ]
        this.items = []
        for(let i = 0; i < list_items_categories.length; i++){
            let list_items = dict["items"][list_items_categories[i]]
            for(let j = 0; j < list_items.length; j++){
                let list_data = list_items[j].slice(0, 2).concat(list_items[j].slice(4))
                this.items[this.items.length] = create_item(
                    list_items_categories[i],
                    list_data,
                    dict["images"]["item"],
                    list_items[j].slice(2, 4)
                )
            }
        }
    }
    cast_html(){
        let field = super.cast_html()

        function place_entity(char){
            let coords = char.get_coords()
            let row = field.querySelectorAll("tr")[coords[0]]
            let cell = row.querySelectorAll("td")[coords[1]]
            cell.querySelector("img").style.display = "none"
            cell.append(char.get_content())
        }

        for(let i = 0; i < this.items.length; i++){
            place_entity(this.items[i])
        }

        place_entity(this.hero)
        place_entity(this.princess)

        for(let i = 0; i < this.enemies.length; i++){
            place_entity(this.enemies[i])
        }

        return field
    }
}
