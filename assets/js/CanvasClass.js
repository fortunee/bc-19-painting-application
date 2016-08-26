/** Canvas Class
*@class
*@param{object} canvasObj - The canvas object
*/
var CanvasClass = function(canvasObj){
    this.canvas = canvasObj;
    this.radius = 10;
    this.shapeSize = 100;
    this.context = this.canvas.getContext('2d');
    this.context.lineWidth = this.radius * 2;
    this.drawMode = 'Pencil';
};

/**
*  Stroke width
*/
CanvasClass.prototype.initStrokeWidth = function(){
    /* Set the stroke width */
    this.setStrokeWidth(document.getElementById('strokeRadius').value);
};

/**
* Drawing modes change binding
*/
CanvasClass.prototype.bindDrawingModesChangeListener = function(){
    var $this = this;
    var items = document.getElementsByClassName('drawingTool');

    var binder = function(){
        $this.drawMode = this.getAttribute("data-title");
        var strokeColor = document.getElementById('strokeColor').value;
        var fillColor = document.getElementById('fillColor').value;
        $this.setFillcolor(fillColor);
        $this.setStrokeColor(strokeColor);
    };

    for(var i=0; i<items.length; i++){
        items[i].addEventListener('click', binder, false);
    }
};

/**
*Binding settings and changes events
*/
CanvasClass.prototype
  .bindSettingsChangeListenters = function(){
    var $this = this;

    /* Setup eraser */
    document.getElementById('eraser')
      .addEventListener('click', function(){
        $this.drawMode = this.getAttribute("data-title");
    });

    /* Event for setting pencil stroke & fill color */
    document.getElementById('pencilDraw')
      .addEventListener('click', function(){
        var pencilColor = document.getElementById('pencilColor').value;
        $this.drawMode = this.getAttribute("data-title");
        $this.setFillcolor(pencilColor);
        $this.setStrokeColor(pencilColor);
    });

    /* Changes stroke width value */
    document.getElementById('strokeRadius')
      .addEventListener('change', function(){
        $this.setStrokeWidth(this.value);
    });

    /* Changes stroke color value */
    document.getElementById('strokeColor')
      .addEventListener('change', function(){
        $this.setStrokeColor(this.value);
    });

    /* Changes fill color value */
    document.getElementById('fillColor')
      .addEventListener('change', function(){
        $this.setFillcolor(this.value);
    });

    /* Changes pencil color value */
    document.getElementById('pencilColor')
      .addEventListener('change', function(){
        $this.setFillcolor(this.value);
        $this.setStrokeColor(this.value);
    });
};

/* Sets stroke width */
CanvasClass.prototype.setStrokeWidth = function(size){
    this.radius = size ;
    this.context.lineWidth = this.radius * 2;
    var counter = document.getElementById('widthCount');
    counter.innerHTML = size;
};

/* Sets stroke color */
CanvasClass.prototype.setStrokeColor = function(color){
    this.context.strokeStyle = color;
};

/* Sets fill color */
CanvasClass.prototype.setFillcolor = function(color){
    this.context.fillStyle = color;
};

/* Draws line on canvas*/
CanvasClass.prototype.drawLine = function(e){

    /* Pencil color fill and stroke color setup */
    var oldStroke = this.context.strokeStyle;
    var oldFill = this.context.fillStyle;
    var pencilColor = document.getElementById('pencilColor').value;
    this.setFillcolor(pencilColor);
    this.setStrokeColor(pencilColor);

    this.context.lineTo(e.offsetX, e.offsetY);
    this.context.stroke();
    this.context.beginPath();
    this.context.globalCompositeOperation="source-over";
    this.context.arc(e.offsetX, e.offsetY, this.radius, 0, Math.PI*2);
    this.context.fill();
    this.context.beginPath();
    this.context.moveTo(e.offsetX, e.offsetY);

    this.setFillcolor(oldFill);
    this.setStrokeColor(oldStroke);
};

/* Eraser method */
CanvasClass.prototype.eraseStuff = function(e){
    this.context.beginPath();
    this.context.globalCompositeOperation="destination-out";
    this.context.arc(e.offsetX, e.offsetY,this.radius *5,Math.PI*2,false);
    this.context.fill();
};

/* Save method */
CanvasClass.prototype.saveDrawing = function(){
    var data = this.canvas.toDataURL();
    window.open(data, '_blank',
      'location=0, left=500, top=300, menubar=0, height=603, width=1000, fullscreen=0');
};