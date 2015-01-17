var game = Atomic.game;
var node = self.node;

function start() {

	var spaceSheet = game.getSpriteSheet("Sprites/spacegame_sheet.xml");

    var sprite2D = node.createComponent("StaticSprite2D");
    sprite2D.sprite = spaceSheet.getSprite("spaceship_mantis");
    sprite2D.blendMode = Atomic.BLEND_ALPHA;    
    
    node.position2D =  [0, 0];

}

