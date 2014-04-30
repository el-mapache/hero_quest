Crafty.scene('PlayerSelection', function() {
    Crafty.e('MainScreen')
        .requires('2D, HTML')
        .attr({w: 1280, h: 740})
        .css({
          "background": "black",
          'background-position': 'center center',
          backgroundRepeat:"no-repeat",
          backgroundSize: "cover",
          paddingTop: "100px"
        });
  Crafty.e('SelectionBox')
        .requires('2D, DOM')
        .attr({w: 296, h: 200, x: 450, y: 320})
        .css({
          border: "1px solid white",
          borderRadius: "4px 4px"
        });

  Crafty.e('Button')
      .attr({h: 45, w: 248, x: 516, y: 500})
      .label('Start', {
        fontFamily: "munro_smallregular",
        color: "white",
        fontSize: "40px",
        textAlign: "center",
      }).registerCallback(function() {
        loadScene('Loading', 24);
      });
});
