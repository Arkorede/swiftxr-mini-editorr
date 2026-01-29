# SwiftXR Mini Editor

A powerful, dual-mode 3D editor combining a pure React 3D viewer with a GrapesJS-based visual page builder. This project demonstrates seamless integration between a robust React 3D environment and a drag-and-drop web builder.

## Features

### 1. Dual Editing Modes

- **Original 3D Editor**: A focused, full-screen 3D editing environment.
- **GrapesJS Editor**: A visual page builder (drag-and-drop) that embeds the 3D viewer as a customizable component.

### 2. Advanced 3D Viewer

- **GLB Model Support**: Upload and view standard `.glb` and `.gltf` files.
- **Hotspot System**: click directly on the 3D model to add interactive hotspots.
- **Orbit Controls**: Fully interactive camera with zoom, pan, and rotate.
- **Auto-Fit Camera**: improved logic that automatically centers and scales the camera to fit the loaded model, respecting user-defined scaling.

### 3. GrapesJS Integration (@grapesjs/react)

- **Custom 3D Block**: A dedicated "3D Model Viewer" block available in the GrapesJS block manager.
- **Reactive Custom Traits**: Configure model properties directly from the GrapesJS Settings panel:
  - **Model Source**: File upload for GLB assets.
  - **Scale**: Real-time resizing of the 3D model without distorting the camera view.
  - **Camera Preset**: Quick toggle between Front, Side, and Top views.
  - **Background Color**: Customizable canvas background.
- **React-Renderer Plugin**: A specialized plugin that bridges GrapesJS's HTML rendering with React's component lifecycle, allowing complex interactive components (like Three.js scenes) to live inside the visual builder.

## Assumptions

- **File Format**: The application is optimized for `.glb` (binary glTF) files.
- **Environment**: Designed to run in a modern browser environment supporting WebGL.
- **Development**: The project assumes a standard Node.js development environment.
- **Data Persistence**: Currently, all data (uploaded models, hotspots) is stored in **local component state** or temporary **Blob URLs**. Refreshing the page will reset the application to its initial state.
- **State Management**: The "Original 3D Editor" and "GrapesJS Editor" currently maintain separate instances of the hotspot state. Hotspots created in one mode do not automatically persist to the other.
- **Single Model**: The 3D Viewer block is designed to display a single model. Adding multiple blocks will create independent viewer instances.

## Tech Stack

- **Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **3D Engine**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://drei.docs.pmnd.rs/)
- **Page Builder**: [GrapesJS](https://grapesjs.com/), [@grapesjs/react](https://github.com/GrapesJS/react)
- **Styling**: [TailwindCSS 4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)

## Installation

1.  **Clone the repository**:

    ```bash
    git clone <repository-url>
    cd swiftxr-mini-editorr
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Start the development server**:

    ```bash
    npm run dev
    ```

4.  **Open the application**:
    Navigate to `http://localhost:5173` (or the port shown in your terminal).

## How to Use

### 1. The Landing Page (GrapesJS Editor)

By default, you start in the **GrapesJS Editor** mode.

- **Add a 3D Viewer**: Open the "Blocks" panel (left sidebar) and drag the "3D Model Viewer" block onto the canvas.
- **Add text and section**: Open the "Blocks" panel (left sidebar) and drag the "Text" and "Section" blocks onto the canvas.
- **Configure**: Select the component on the canvas and open the "Settings" panel (gear icon, right sidebar).
  - **Upload**: Click the file input to upload a `.glb` file.
  - **Adjust**: Change the Scale, Background Color, or Camera Preset.
- **Switch Modes**: Click the "Switch to Original 3D Editor" button in the top-left corner to enter the standalone 3D mode.

### 2. Original 3D Editor

This mode focuses entirely on the model.

- **Upload**: Use the panel on the left to upload a model if one isn't already loaded.
- **Hotspots**: Click anywhere on the 3D model to place a hotspot. You can label these hotspots for interactive annotations.
- **Switch Back**: Click "Switch to GrapesJS Editor" to return to the page builder.

## Project Structure

- `src/components/Editor3D.tsx`: The core React Three Fiber scene. Handles models, lights, and camera logic.
- `src/components/GrapesJSEditor.tsx`: The main GrapesJS shell. Configures the editor, panels, and plugins.
- `src/components/grapesjs-3d-viewer-component.ts`: Defines the custom GrapesJS block and its traits (settings).
- `src/components/react-renderer-plugin.ts`: The bridge that mounts React components into the GrapesJS canvas.
- `src/components/ThreeJSViewerWrapper.tsx`: The adapter component that receives props from GrapesJS and renders the `Editor3D` component.
