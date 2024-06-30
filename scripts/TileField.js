import {Tile} from "./Entity.js"
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

export class MapField {
    constructor(dict){
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
            dict["images"]["char"][dict["chars"]["hero"][0]]
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
    }
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

        let coords = this.hero.get_coords()
        let row = field.querySelectorAll("tr")[coords[0]]
        let cell = field.querySelectorAll("td")[coords[1]]
        cell.innerHTML = ""
        cell.append(this.hero.get_content())

        for(let i = 0; i < this.enemies.length; i++){

        }

        return field
    }
}
