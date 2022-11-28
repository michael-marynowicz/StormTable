export default class Draw {
    createButton(drawSpace){
        const container = document.createElement("div");
        container.style= "display: inline-block; margin-left: 10px; border-style : solid; padding : 2em; border-width : 2px; margin-top: 5px; width: fit-content;";

        const buttonCache = document.createElement("button");
        buttonCache.id = "drawing-mode";
        buttonCache.class = "btn btn-info";
        buttonCache.textContent = "Cancel drawing mode";
        container.appendChild(buttonCache);


        const drawingOption = document.createElement("div");
        drawingOption.id = "drawing-mode-options";

        const lineWidth = document.createElement("label");
        lineWidth.for="drawing-line-width";
        lineWidth.text = "Line width:";

        const info = document.createElement("span");
        info.class = "info";
        info.innerHTML="10";

        const inputWidth = document.createElement("input");
        inputWidth.type="range";
        inputWidth.value="10";
        inputWidth.min="0";
        inputWidth.max="150";
        inputWidth.id="drawing-line-width";


        const color = document.createElement("label");
        color.for="drawing-color";
        color.textContent = "Line color:";

        const inputColor = document.createElement("input");
        inputColor.type="color";
        inputColor.value="005E7A";
        inputColor.id="drawing-color";
        inputColor.style = "margin-left : 2em";
        document.createElement("br");

        drawingOption.appendChild(lineWidth);
        drawingOption.appendChild(info);
        drawingOption.appendChild(inputWidth);
        drawingOption.appendChild(document.createElement("br"));
        drawingOption.appendChild(color);
        drawingOption.appendChild(inputColor);
        drawingOption.appendChild(document.createElement("br"));

        const buttonClear = document.createElement("button");
        buttonClear.id = "clear-canvas";
        buttonClear.class = "btn btn-info";
        buttonClear.style="display:block; margin : auto; margin-top: 2em;"
        buttonClear.textContent = "Clear";

        drawingOption.appendChild(buttonClear);


        container.appendChild(drawingOption);
        drawSpace.appendChild(container)
        document.body.appendChild(drawSpace);

    }
    draw() {
        const drawSpace = document.createElement("div");
        drawSpace.style="display: grid;width: fit-content;"

        const canvasToDraw = document.createElement("canvas");
        canvasToDraw.id="c";
        canvasToDraw.width="500";
        canvasToDraw.height="500";
        canvasToDraw.style="border:2px dashed #aaa";

        var $ = function (id) {
            return document.getElementById(id)
        };
        drawSpace.appendChild(canvasToDraw)
        this.createButton(drawSpace);

        const canvasWrapper = document.getElementById('c')
// initial dimensions
        canvasWrapper.width = '500'
        canvasWrapper.height = '500'

        let width
        let height
        setInterval(() => {
            const newWidth = canvasToDraw.clientWidth
            const newHeight = canvasToDraw.clientHeight
            if (newWidth !== width || newHeight !== height) {
                width = newWidth
                height = newHeight
                canvasToDraw.setWidth(newWidth)
                canvasToDraw.setHeight(newHeight)
            }
        }, 100)

        var canvas = new fabric.Canvas('c', {
            isDrawingMode: true
        });

        fabric.Object.prototype.transparentCorners = false;

        const drawingModeEl = $('drawing-mode'),
            drawingOptionsEl = $('drawing-mode-options'),
            drawingColorEl = $('drawing-color'),
            drawingLineWidthEl = $('drawing-line-width'),
            clearEl = $('clear-canvas');

        clearEl.onclick = function () {
            canvas.clear()
        };

        drawingModeEl.onclick = function () {
            canvas.isDrawingMode = !canvas.isDrawingMode;
            if (canvas.isDrawingMode) {
                drawingModeEl.innerHTML = 'Cancel drawing mode';
                drawingOptionsEl.style.display = '';
            } else {
                drawingModeEl.innerHTML = 'Enter drawing mode';
                drawingOptionsEl.style.display = 'none';
            }
        };

        if (fabric.PatternBrush) {
            var vLinePatternBrush = new fabric.PatternBrush(canvas);
            vLinePatternBrush.getPatternSrc = function () {

                var patternCanvas = fabric.document.createElement('canvas');
                patternCanvas.width = patternCanvas.height = 10;
                var ctx = patternCanvas.getContext('2d');

                ctx.strokeStyle = this.color;
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.moveTo(0, 5);
                ctx.lineTo(10, 5);
                ctx.closePath();
                ctx.stroke();

                return patternCanvas;
            };

            var hLinePatternBrush = new fabric.PatternBrush(canvas);
            hLinePatternBrush.getPatternSrc = function () {

                var patternCanvas = fabric.document.createElement('canvas');
                patternCanvas.width = patternCanvas.height = 10;
                var ctx = patternCanvas.getContext('2d');

                ctx.strokeStyle = this.color;
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.moveTo(5, 0);
                ctx.lineTo(5, 10);
                ctx.closePath();
                ctx.stroke();

                return patternCanvas;
            };

            var squarePatternBrush = new fabric.PatternBrush(canvas);
            squarePatternBrush.getPatternSrc = function () {

                var squareWidth = 10, squareDistance = 2;

                var patternCanvas = fabric.document.createElement('canvas');
                patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
                var ctx = patternCanvas.getContext('2d');

                ctx.fillStyle = this.color;
                ctx.fillRect(0, 0, squareWidth, squareWidth);

                return patternCanvas;
            };

            var diamondPatternBrush = new fabric.PatternBrush(canvas);
            diamondPatternBrush.getPatternSrc = function () {

                var square = 10;
                var squareDistance = 5;
                var patternCanvas = fabric.document.createElement('canvas');
                var rect = new fabric.Rect({
                    width: square,
                    height: square,
                    angle: 45,
                    fill: this.color
                });

                var canvasWidth = rect.getBoundingRect().width;

                patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
                rect.set({left: canvasWidth / 2, top: canvasWidth / 2});

                var ctx = patternCanvas.getContext('2d');
                rect.render(ctx);

                return patternCanvas;
            };

        }

        drawingColorEl.onchange = function () {
            var brush = canvas.freeDrawingBrush;
            brush.color = this.value;
            if (brush.getPatternSrc) {
                brush.source = brush.getPatternSrc.call(brush);
            }
        };

        drawingLineWidthEl.onchange = function () {
            canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
            this.previousSibling.innerHTML = this.value;
        };

        if (canvas.freeDrawingBrush) {
            canvas.freeDrawingBrush.color = drawingColorEl.value;
            canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;

        }
    };
}
