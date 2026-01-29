import GjsEditor, { Canvas } from "@grapesjs/react";
import grapesjs, { type Editor } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { reactRendererPlugin } from "./react-renderer-plugin";
import { register3DViewerComponent } from "./grapesjs-3d-viewer-component";

export const GrapesJSEditor = () => {
  const onEditor = (editor: Editor) => {
    register3DViewerComponent(editor);

    editor.BlockManager.add("text-block", {
      label: "Text",
      category: "Basic",
      content: '<div style="padding: 20px;">Edit this text</div>',
    });

    editor.BlockManager.add("section", {
      label: "Section",
      category: "Basic",
      content:
        '<section style="padding: 50px; background: #f5f5f5;"><h2>Section Title</h2><p>Section content</p></section>',
    });
  };

  return (
    <GjsEditor
      grapesjs={grapesjs}
      options={{
        height: "100vh",
        width: "100%",
        storageManager: false,
        panels: { defaults: [] },
        blockManager: {
          appendTo: "#blocks",
        },
        styleManager: {
          appendTo: "#styles-container",
          sectors: [
            {
              name: "Dimension",
              open: false,
              buildProps: ["width", "min-height", "padding"],
            },
            {
              name: "Extra",
              open: false,
              buildProps: ["background-color", "box-shadow", "border-radius"],
            },
          ],
        },
        layerManager: {
          appendTo: "#layers-container",
        },
        traitManager: {
          appendTo: "#traits-container",
        },
        deviceManager: {
          devices: [
            {
              name: "Desktop",
              width: "",
            },
            {
              name: "Tablet",
              width: "768px",
              widthMedia: "992px",
            },
            {
              name: "Mobile",
              width: "320px",
              widthMedia: "480px",
            },
          ],
        },
        plugins: [reactRendererPlugin],
      }}
      onEditor={onEditor}
    >
      <div className="grapesjs-wrapper">
        <style>{`
          .grapesjs-wrapper {
            display: flex;
            height: 100vh;
            overflow: hidden;
          }
          
          #blocks {
            width: 250px;
            min-width: 250px;
            flex-shrink: 0;
            background-color: #2d3748;
            border-right: 1px solid #4a5568;
            overflow-y: auto;
            padding: 10px;
          }
          
          #gjs-editor {
            flex: 1;
            position: relative;
            display: flex;
            flex-direction: column;
          }

          /* Ensure canvas takes full height */
          .gjs-editor-cont {
             height: 100% !important;
          }
          
          .right-panel {
            width: 300px;
            min-width: 300px;
            flex-shrink: 0;
            background-color: #2d3748;
            color: white;
            overflow-y: auto;
            border-left: 1px solid #4a5568;
            display: flex;
            flex-direction: column;
          }
          
          .panel-tabs {
            display: flex;
            background: #1a202c;
            border-bottom: 1px solid #4a5568;
          }
          
          .panel-tab {
            flex: 1;
            padding: 10px;
            background: transparent;
            border: none;
            color: #a0aec0;
            cursor: pointer;
            font-size: 12px;
            font-weight: 500;
            transition: all 0.2s;
          }
          
          .panel-tab:hover {
            background: #2d3748;
            color: white;
          }
          
          .panel-tab.active {
            background: #2d3748;
            color: white;
            border-bottom: 2px solid #3182ce;
          }
          
          .panel-content {
            flex: 1;
            overflow-y: auto;
            padding: 10px;
          }
          
          #layers-container,
          #styles-container,
          #traits-container {
            display: none;
          }
          
          #layers-container.active,
          #styles-container.active,
          #traits-container.active {
            display: block;
          }
          
          /* GrapesJS Styling */
          .gjs-block {
            background: #4a5568;
            border-radius: 4px;
            margin-bottom: 10px;
            color: white;
          }
          
          .gjs-block:hover {
            background: #5a6578;
          }
          
          .gjs-cv-canvas {
            background-color: #f7fafc;
            height: 100%;
            top: 0;
            width: 100%;
            left: 0;
          }
          
          .gjs-pn-panel {
            background-color: #2d3748;
          }
        `}</style>

        <div id="blocks"></div>

        <div id="gjs-editor">
          <Canvas />
        </div>

        <div className="right-panel">
          <div className="panel-tabs">
            <button
              className="panel-tab active"
              onClick={(e) => {
                document
                  .querySelectorAll(".panel-tab")
                  .forEach((t) => t.classList.remove("active"));
                e.currentTarget.classList.add("active");
                document
                  .querySelectorAll(
                    "#layers-container, #styles-container, #traits-container",
                  )
                  .forEach((c) => c.classList.remove("active"));
                document
                  .getElementById("layers-container")
                  ?.classList.add("active");
              }}
            >
              Layers
            </button>
            <button
              className="panel-tab"
              onClick={(e) => {
                document
                  .querySelectorAll(".panel-tab")
                  .forEach((t) => t.classList.remove("active"));
                e.currentTarget.classList.add("active");
                document
                  .querySelectorAll(
                    "#layers-container, #styles-container, #traits-container",
                  )
                  .forEach((c) => c.classList.remove("active"));
                document
                  .getElementById("styles-container")
                  ?.classList.add("active");
              }}
            >
              Styles
            </button>
            <button
              className="panel-tab"
              onClick={(e) => {
                document
                  .querySelectorAll(".panel-tab")
                  .forEach((t) => t.classList.remove("active"));
                e.currentTarget.classList.add("active");
                document
                  .querySelectorAll(
                    "#layers-container, #styles-container, #traits-container",
                  )
                  .forEach((c) => c.classList.remove("active"));
                document
                  .getElementById("traits-container")
                  ?.classList.add("active");
              }}
            >
              Settings
            </button>
          </div>

          <div className="panel-content">
            <div id="layers-container" className="active"></div>
            <div id="styles-container"></div>
            <div id="traits-container"></div>
          </div>
        </div>
      </div>
    </GjsEditor>
  );
};
