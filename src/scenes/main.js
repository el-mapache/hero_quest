Crafty.scene('Main', function() {
  Crafty.e('MainScreen')
        .requires('2D, HTML')
        .attr({w: 1280, h: 740})
        .css({
          "background": "url(assets/heroquest.png)",
          overflow: 'hidden',
          'background-position': 'center center',
          backgroundRepeat:"no-repeat",
          backgroundSize: "cover",
          paddingTop: "100px"
        });

  Crafty.e('Button')
        .attr({h: 45, w: 248, x: 516, y: 500})
        .label('New Game', {
          fontFamily: "munro_smallregular",
          color: "white",
          fontSize: "40px",
          textAlign: "center",
        }).registerCallback(function() {
          loadScene('Loading', 24);
        });
});

function loadScene(scene, duration) {
  Crafty.e("2D, Canvas, Tween, Color, HTML")
        .attr({alpha: 0, x:0, y:0, w: 1280, h: 740})
        .color("#000000")
        .tween({alpha: 1}, duration)
        .bind("TweenEnd", function() {
            Crafty.scene(scene);
            Crafty.e("2D, Canvas, Tween, Color, HTML")
                .attr({alpha: 1, x: 0, y: 0, w: 1280, h: 740})
                .color("#000000")
                .tween({alpha: 0}, duration)
        });
}
