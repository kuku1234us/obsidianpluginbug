import { Plugin, Modal } from "obsidian";
import React from "react";
import ReactDOM from "react-dom/client";

// Define a custom modal class that uses React
class PopupDialog extends Modal {
  private root: ReactDOM.Root | null = null;

  constructor(app: any, onClose: () => void) {
    super(app);
    this.onClose = onClose;
  }

  onClose: () => void;

  onOpen() {
    const { contentEl } = this;
    this.modalEl.classList.add("bg-blue-500");

    // Create a React root and render the HelloWorldPopup component
    // This line works on Desktop, but fails on iPhone:
    // this.root = ReactDOM.createRoot(contentEl);
    // this.root.render(<div>Hello World</div>);
  }

  onCloseModal() {
    // Unmount the React component when closing the modal
    if (this.root) {
      this.root.unmount();
    }

    // Call the onClose callback passed in the constructor
    this.onClose();
  }
}

// Main plugin class
export default class MyPlugin extends Plugin {
  async onload() {
    console.log("Loading MyPlugin");

    // Command to show the Hello World popup
    this.addCommand({
      id: "TestHello",
      name: "TestHello",
      callback: () => this.showHelloWorldPopup(),
    });
  }

  onunload() {
    console.log("Unloading MyPlugin");
  }

  showHelloWorldPopup() {
    const dialog = new PopupDialog(this.app, () => {
      console.log("Popup closed");
    });
    dialog.open();
  }
}
