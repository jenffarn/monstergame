function Player(name, life, maxLife, strength, bag) {
    this.name = name;
    this.life = life;
    this.maxLife = maxLife;
    this.strength = strength;
    this.bag = bag;
    this.attack = function(victim) {
        console.log(`${this.name} attacks ${victim.name}.`);
        victim.life = victim.life - this.strength;
    }
    this.collectItem = function(item) {
        this.bag.push(item);
    }
    this.useItem = function(item) {
        var itemIndex = this.bag.indexOf(item);
        if (itemIndex == -1) {
            console.log(`No ${item} found.`);
        } else {
            console.log(`${this.name} uses ${item}.`);
            this.bag.splice(itemIndex, 1);
            switch (item) {
                case "herbs":
                    this.life = this.life + 20;
                    break;
                case "potion":
                    this.life = this.life + 50;
                    break;
                case "elixir":
                    this.life = this.life + 100;
                    break;
        }
        }
        if (this.life > this.maxLife) {
            this.life = this.maxLife;
        }
    }
}

function Monsters(name, life, maxLife, strength) {
    this.name = name;
    this.life = life;
    this.maxLife = maxLife;
    this.strength = strength;
}

Monsters.prototype.attack = function(victim) {
    console.log(`${this.name} attacks ${victim.name}.`);
    victim.life = victim.life - this.strength;
}

function explore() {
    var event = Math.floor(Math.random() * 7);
    switch (event) {
        case 0:
            console.log(`${player.name} explores the area and found nothing.`);
            break;
        case 1:
            console.log(`${player.name} found some herbs.`);
            player.collectItem("herbs");
            break;
        case 2:
            console.log(`${player.name} found a potion.`);
            player.collectItem("potion");
            break;
        case 3:
            console.log(`${player.name} found an elixir.`);
            player.collectItem("elixir");
            break;
        case 4:
            console.log(`${player.name} encounters a goblin.`);
            goblin.attack(player);
            combat(goblin);
            break;
        case 5:
            console.log(`${player.name} encounters an orc.`);
            orc.attack(player);
            combat(orc);
            break;
        case 6:
            console.log(`${player.name} encounters a dragon.`);
            dragon.attack(player);
            combat(dragon);
            break;
    }
}

function combat(enemy) {
    if (player.life > 0) {
        var option = window.prompt("1.Attack, 2.Use item, 3.Flee:");
        if (option == 1) {
            player.attack(enemy);
            if (enemy.life > 0) {
                enemy.attack(player);
                combat(enemy);
            } else {
                console.log(`${player.name} kills ${enemy.name}.`);
                enemy.life = enemy.maxLife;
            }
        } else if (option == 2) {
            var item = window.prompt("1.Herbs, 2.Potion, 3.Elixir:");
            if (item == 1) {
                player.useItem("herbs");
            } else if (item == 2) {
                player.useItem("potion");
            } else if (item == 3) {
                player.useItem("elixir");
            } else {
                player.useItem("item");
            }
            enemy.attack(player);
            combat(enemy);
        } else if (option == 3) {
            console.log(`${player.name} runs away.`);
            enemy.life = enemy.maxLife;
        } else {
            combat(enemy);
        }
    } else {
        console.log(`${enemy.name} kills ${player.name}.`);
        console.log(`Game over.`);
    }    
}

var playerName = window.prompt("Key in your name: ");

var player = new Player(playerName, 100, 100, 20, []);
var goblin = new Monsters("Goblin", 100, 100, 10);
var orc = new Monsters("Orc", 150, 150, 25);
var dragon = new Monsters("Dragon", 300, 300, 50);

var playGame = true;
while (player.life > 0 && playGame == true) {
    var action = window.prompt("1.Explore, 2.Health status, 3.Inventory, 4.Use item, 5.Exit game:");
    switch (action) {
        case "1":
            explore();
            break;
        case "2":
            console.log(`${player.life}/${player.maxLife}`);
            break;
        case "3":
            console.log(player.bag);
            break;
        case "4":
            var item = window.prompt("1.Herbs, 2.Potion, 3.Elixir:");
            if (item == 1) {
                player.useItem("herbs");
            } else if (item == 2) {
                player.useItem("potion");
            } else if (item == 3) {
                player.useItem("elixir");
            } else {
                player.useItem("item");
            }
            break;
        case "5":
            playGame = false;
            console.log(`Good bye, ${player.name}!`)
        break;     
    }
} 
