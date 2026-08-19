body { background: #f0f2f5; display: flex; height: 100vh; margin: 0; }
.app-container { display: flex; width: 100%; }
.controls-panel { width: 350px; background: #fff; padding: 20px; overflow-y: auto; }
.canvas-container { flex: 1; display: flex; justify-content: center; align-items: center; overflow: auto; padding: 40px; }

#card-canvas { 
    position: relative; 
    background: white; 
    border: 1px solid #ccc; 
    overflow: hidden; 
    transition: all 0.2s;
}

#bg-wrapper { position: absolute; width: 100%; height: 100%; overflow: hidden; }
#card-bg { width: 100%; height: 100%; object-fit: cover; transform-origin: center; }

.draggable { position: absolute; cursor: move; padding: 5px; border: 1px dashed transparent; }
.draggable:hover { border-color: #1a73e8; }
.control-group { margin-bottom: 20px; }
.bg-controls { margin-top: 10px; display: flex; flex-direction: column; gap: 5px; }
input[type="number"], input[type="text"] { padding: 8px; width: 100%; }
button { width: 100%; padding: 10px; background: #1a73e8; color: #fff; border: none; cursor: pointer; }
