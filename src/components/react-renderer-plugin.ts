import React from "react";
import { createRoot, type Root } from "react-dom/client";
import type { Editor } from "grapesjs";

export const reactRendererPlugin = (editor: Editor) => {
  const mountedRoots = new Map<HTMLElement, Root>();

  const unmountReactComponent = (element: HTMLElement) => {
    if (mountedRoots.has(element)) {
      const root = mountedRoots.get(element);
      setTimeout(() => {
        root?.unmount();
      }, 0);
      mountedRoots.delete(element);
    }
  };

  const renderReactComponent = (
    element: HTMLElement,
    component: React.ReactElement,
  ) => {
    if (mountedRoots.has(element)) {
      const root = mountedRoots.get(element);
      if (root) {
        root.render(component);
        return;
      }
    }

    const root = createRoot(element);
    root.render(component);

    mountedRoots.set(element, root);
  };

  editor.on("destroy", () => {
    mountedRoots.forEach((root) => {
      setTimeout(() => root.unmount(), 0);
    });
    mountedRoots.clear();
  });

  (editor as any).renderReactComponent = renderReactComponent;
  (editor as any).unmountReactComponent = unmountReactComponent;
};
