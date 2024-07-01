import {ListField} from "./TileField.js"

export class Tile {
    constructor(land_code, img_href){
        if(land_code == 0){
            this.can_step = false
        }
        this.content = document.createElement("img")
        this.content.src = img_href
        this.content.onerror = ()=>{
            this.content.onerror = null
            this.content.src = "./images/" + img_href
            return false
        }
    }
    get_content(){
        return this.content
    }
}

class Entity extends Tile {
    constructor(name, coords, land_code, img_href){
        super(land_code, img_href)
        this.name = name
        this.coords = coords
    }
    get_coords(){
        return this.coords
    }
}

class Item extends Entity {

}

export class Weapon extends Item {
    constructor(name, image_href, row, col, range, damage){
        super(name, [row, col], 1, image_href)
        this.range = range
        this.damage = damage
    }
}

export class Armor extends Item {
    constructor(name, image_href, row, col, protection){
        super(name, [row, col], 1, image_href)
        this.protection = protection
    }
}

export class Potion extends Item {
    constructor(name, image_href, row, col, restore_hp){
        super(name, [row, col], 1, image_href)
        this.restore_hp = restore_hp
    }
}



export class LiveEntity extends Entity {
    constructor(name, list_data, img_href){
        super(name, list_data.slice(0, 2), 0, img_href)
        this.hp_max = list_data[2]
        this.hp_cur = list_data[3]
    }
}

export class Enemy extends LiveEntity {
    constructor(list_data, img_href){
        super(list_data[0], list_data.slice(2, 6), img_href)
    }
}

export class Hero extends LiveEntity {
    constructor(list_data, img_href, list_imgs_item){
        super(null, list_data.slice(1, 5), img_href)
        this.inventory = new ListField(list_data[6], list_imgs_item)
    }
}
