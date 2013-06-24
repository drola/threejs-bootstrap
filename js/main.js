require(["jquery", "graph", "vendor/jquery-ui", "vendor/jquery.csv", "vendor/jquery.mousewheel", 'vendor/spin', "vendor/jquery.spinner", "vendor/rison", 'vendor/bootstrapSwitch'], function($, Graph) {
    var graph;

    /**
     * Called when windows is resized and on initialization
     */
    var resizeCanvas = function() {
        var height = $("#footerBar").offset().top - $("#topNavbar").offset().top - $("#topNavbar").height();
        $("#canvasContainer").height(height);
        graph.resize();
    };

    $(document).ready(function() {
        graph = new Graph("#canvasContainer");
        $(window).resize(resizeCanvas);
        resizeCanvas();
        graph.showStats(true);
        graph.run();
    });
});