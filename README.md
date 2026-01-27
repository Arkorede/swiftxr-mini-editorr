# SwiftXR Mini Editor

A lightweight, web-based 3D model editor built with React, Three.js, and TypeScript. This application allows users to upload `.glb` models, view them in a 3D environment, and interactively add, edit, and manage hotspots on the model surface.

## 🚀 Features

- **3D Model Visualization**: Seamlessly load and view `.glb` 3D files.
- **Interactive Hotspots**:
  - **Click to Add**: simply click anywhere on the 3D model to place a hotspot.
  - **Edit Labels**: Real-time identification and labeling of hotspots.
  - **Manage**: Update texts or delete hotspots as needed.
- **Camera Controls**: Orbit controls for rotating, panning, and zooming around the model.
- **Responsive Design**: Modern, dark-themed UI built with Tailwind CSS.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **3D Engine**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) (Three.js)
- **3D Utilities**: [React Three Drei](https://drei.docs.pmnd.rs/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Arkorede/swiftxr-mini-editorr.git
   cd swiftxr-mini-editorr
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

## 🎮 Usage

1. **Upload a Model**: Click the "Choose File" button on the UI to upload a local `.glb` file.
2. **Add Hotspot**: Click anywhere on the 3D model surface to place a new hotspot pinpoint.
3. **Edit Hotspot**:
   - Click on an existing hotspot label to enter edit mode.
   - Type the new label text.
   - Click "Save" to confirm.
   - Click "Cancel" to revert changes.
4. **Delete Hotspot**: Use the Hotspot Manager panel on the right to remove specific hotspots.

## 📂 Project Structure

```
src/
├── components/
│   ├── Editor3D.tsx       # Main 3D Canvas and Scene setup
│   ├── HotSpot.tsx        # Individual Hotspot component with HTML overlays
│   ├── HotSpotManager.tsx # UI panel for managing list of hotspots
│   └── ui/                # Shared UI components (inputs, buttons, etc.)
├── hooks/
│   └── useHotSpot.tsx     # Custom hook for hotspot state management logic
├── App.tsx                # Main application entry and layout
└── main.tsx               # DOM rendering
```
