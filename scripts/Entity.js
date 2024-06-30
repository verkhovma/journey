export class Tile {
    constructor(land_code, img_href){
        if(land_code == 0){
            this.can_step = false
        }
        this.content = document.createElement("img")
        this.content.src = img_href
        this.content.onerror = ()=>{
            this.content.src = "../images/" + img_href
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

export class Potion extends Item {
    constructor(name, image, row, col, restore_hp){
        super(name, image, row, col)
        this.restore_hp = restore_hp
    }
}

export class Weapon extends Item {
    constructor(name, image, row, col, range, damage){
        super(name, image, row, col)
        this.range = range
        this.damage = damage
    }
}

export class Armor extends Item {
    constructor(name, image, row, col, protection){
        super(name, image, row, col)
        this.protection = protection
    }
}

export class LiveEntity extends Entity {
    constructor(name, list_data, img_href){
        super(name, list_data.slice(0, 2), 0, img_href)
        this.hp_max = list_data[2]
        this.hp_cur = list_data[3]
    }
}

/*
["knight", 2, 2, 1, 12, 12,
                {
                    "weapon": ["sword", 0, 1, 2],
                    "armor": ["armor", 1, 1]
                }
            ],
*/

export class Enemy extends LiveEntity {
    constructor(list_data, img_href){
        super(list_data[0], list_data.slice(2, 6), img_href)
    }
}

// every character contain pointer to image (0 - "hero.png",
        // 1 - "enemy.png", and so on),
        // coordinates of row and col on map (start by 0),
        // max hp, current hp,
        // current equipment list,
        // and hero - inventory list.
//"hero": [0, 1, 3, 10, 10,
//           {
                // weapon contain pointer to name in local,
                // image, range, damage.
//                "weapon": null,
                // armor - pointer to name, image, protection.
//                "armor": null
//            },
            // inventory is just simple list.
            // potion - pointer to name, image, amount of restore hp.
//            []
//        ],

export class Hero extends LiveEntity {
    constructor(list_data, img_href){
        super(null, list_data.slice(1, 5), img_href)
    }
}
