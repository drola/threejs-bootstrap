define(['jquery', 'vendor/stats', 'vendor/three', 'vendor/jquery.mousewheel'], function($, Stats) {
    /**
     * Graph
     * @exports Graph
     * @param String targetElement        Selector for the target element (that will contain the canvas)
     * @constructor
     */
     var Graph = function(targetElement) {
        var canvas;
        var renderer;
        var camera;
        var scene;
        var stats;

        var convertToGLSpace = function() {
            return {
                x: 0,
                y: 0
            };
        };
        var mouseCoordinates = {
            x: 0,
            y: 0
        };

        var shownEvent;

        var init = function() {
            $(targetElement).append('<canvas class="plotterCanvas" style="border: none; width: 100%; height: 100%;"></canvas>');
            canvas = $(targetElement).find(".plotterCanvas");
            canvas = canvas[0];
            renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                antialias: true
            });
            renderer.setClearColorHex(0xaaaaaa, 1);
            camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 1, 500);
            camera.position.set(15, 15, 15);
            camera.lookAt(new THREE.Vector3(0, 0, 0));    
            scene = new THREE.Scene();
            var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
            directionalLight.position.set(0, 100, 0);
            scene.add(directionalLight);
            var light = new THREE.AmbientLight(0xaaaaaa); // soft white light
            scene.add(light);
        };

        /**
         * Resize viewport
         */
        var resize = function() {
            var w = $(targetElement).innerWidth();
            var h = $(targetElement).innerHeight();
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
            var offs = $(targetElement).offset();
            convertToGLSpace = function(x, y) {
                var x = ((x - offs.left) / w) * 2 - 1;
                var y = -((y - offs.top) / h) * 2 + 1;
                return {
                    x: x,
                    y: y
                };
            };
        };

        /**
         * Render frame
         */
        var render = function() {
            renderer.render(scene, camera);
        };

        /**
         * Run the rendering loop
         */
        var run = function() {
            requestAnimationFrame(run);
            if (stats !== undefined) {
                stats.begin();
                render();
                stats.end();
            } else {
                render();
            }
        };

        /**
         * Add/remove stats (FPS counter) box
         * @param  {boolean} show Whether to show the stats or not
         */
        var showStats = function(show) {
            if (show && !stats) {
                stats = new Stats();
                stats.setMode(0);
                $(targetElement).prepend(stats.domElement);
            } else if (!show && stats) {
                $(stats.domElement).remove();
                stats = undefined;
            }
        };

        /**
         * Handle mouse click
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        var mouseclick = function(e) {
            mouseCoordinates = convertToGLSpace(e.clientX, e.clientY);

            //picking
            var ray = new THREE.Raycaster();
            var projector = new THREE.Projector();
            var directionVector = new THREE.Vector3();
            directionVector.set(mouseCoordinates.x, mouseCoordinates.y, 1);
            projector.unprojectVector(directionVector, camera);
            directionVector.sub(camera.position);
            directionVector.normalize();
            ray.set(camera.position, directionVector);

            //var intersects = ray.intersectObject(dataController.eventsContainer, true);
        };


        init();

        return {
            resize: resize,
            run: run,
            showStats: showStats,
        };
    };


    return Graph;
});