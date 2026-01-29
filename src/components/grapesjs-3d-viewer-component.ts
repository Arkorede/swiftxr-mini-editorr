import React from "react";
import type { Editor } from "grapesjs";
import { ThreeJSViewerWrapper } from "./ThreeJSViewerWrapper";

export const register3DViewerComponent = (editor: Editor) => {
  editor.TraitManager.addType("file-upload", {
    createInput({ trait }: any) {
      const el = document.createElement("div");
      el.innerHTML = `
        <div style="margin: 10px 0;">
          <input 
            type="file" 
            accept=".glb,.gltf"
            style="
              width: 100%;
              padding: 8px;
              border: 1px solid #4a5568;
              border-radius: 4px;
              background: #1a202c;
              color: white;
              cursor: pointer;
            "
          />
          <div style="margin-top: 5px; font-size: 11px; color: #a0aec0;">
            Upload a GLB or GLTF file
          </div>
        </div>
      `;

      const input = el.querySelector("input") as HTMLInputElement;

      input.addEventListener("change", (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const dataUrl = event.target?.result as string;
            trait.set("value", dataUrl);
          };
          reader.readAsDataURL(file);
        }
      });

      return el;
    },
  });

  editor.Components.addType("3d-model-viewer", {
    model: {
      defaults: {
        tagName: "div",
        attributes: {
          "data-model-url": "",
          "data-model-scale": "1",
          "data-bg-color": "#0f172a",
          "data-camera-position": "front",
          "data-auto-fit": "true",
        },
        traits: [
          {
            type: "file-upload",
            name: "data-model-url",
            label: "3D Model File",
          },
          {
            type: "checkbox",
            name: "data-auto-fit",
            label: "Auto Fit Camera",
          },
          {
            type: "number",
            name: "data-model-scale",
            label: "Model Scale",
            min: 0.1,
            max: 5,
            step: 0.1,
          },
          {
            type: "color",
            name: "data-bg-color",
            label: "Background Color",
          },
          {
            type: "select",
            name: "data-camera-position",
            label: "Camera Preset",
            options: [
              { id: "front", value: "front", name: "Front" },
              { id: "side", value: "side", name: "Side" },
              { id: "top", value: "top", name: "Top" },
            ],
          },
        ],
        styles: `
          .gjs-3d-viewer-container {
            min-height: 500px;
            width: 100%;
            position: relative;
          }
        `,
        script: function () {
          // This script runs in the canvas iframe
          // The rendering is handled via the view instead
        },
      },
    },
    view: {
      init() {
        this.listenTo(this.model, "change:attributes", this.render);
      },
      onRender({ el, model }: any) {
        const targetEl = el || this.el;
        const targetModel = model || this.model;

        const attributes = targetModel.getAttributes();
        const modelUrl = attributes["data-model-url"] || "";
        const modelScale = parseFloat(attributes["data-model-scale"] || "1");
        const backgroundColor = attributes["data-bg-color"] || "#0f172a";
        const cameraPosition = attributes["data-camera-position"] || "front";
        const autoFit = attributes["data-auto-fit"] !== "false";

        let container = targetEl.querySelector(".gjs-3d-viewer-container");

        if (!container) {
          targetEl.innerHTML = "";
          container = document.createElement("div");
          container.className = "gjs-3d-viewer-container";
          targetEl.appendChild(container);
        }

        const renderComponent = (editor as any).renderReactComponent;
        if (renderComponent) {
          renderComponent(
            container,
            React.createElement(ThreeJSViewerWrapper, {
              modelUrl,
              modelScale,
              backgroundColor,
              cameraPosition: cameraPosition as "front" | "side" | "top",
              width: "100%",
              height: "500px",
              autoFit,
            }),
          );
        }
      },
      onRemove() {
        const targetEl = this.el;
        if (targetEl) {
          const container = targetEl.querySelector(".gjs-3d-viewer-container");
          if (container) {
            const unmountComponent = (editor as any).unmountReactComponent;
            if (unmountComponent) {
              unmountComponent(container);
            }
          }
        }
      },
    },
  });

  editor.BlockManager.add("3d-model-viewer", {
    label: "3D Model Viewer",
    category: "3D",
    content: { type: "3d-model-viewer" },
    media: `<svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18-.21 0-.41-.06-.57-.18l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18.21 0 .41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9zM12 4.15L6.04 7.5 12 10.85l5.96-3.35L12 4.15zM5 15.91l6 3.38v-6.71L5 9.21v6.7zm14 0v-6.7l-6 3.37v6.71l6-3.38z"/>
    </svg>`,
  });
};
