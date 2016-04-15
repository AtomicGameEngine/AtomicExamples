//////////////////////////////////////////////////////////
// IMPORTANT: THIS FILE IS GENERATED, CHANGES WILL BE LOST
//////////////////////////////////////////////////////////

// Atomic TypeScript Definitions

/// <reference path="Atomic.d.ts" />

declare module WebView {


//----------------------------------------------------
// MODULE: WebView
//----------------------------------------------------


   export class UIWebView extends Atomic.UIWidget {

      webClient: WebClient;
      webTexture2D: WebTexture2D;

      constructor(initialURL?: string);

      // Get the widget's WebClient
      getWebClient(): WebClient;
      // Get the WebTexture in use by the WebView
      getWebTexture2D(): WebTexture2D;

   }

   export class WebBrowserHost extends Atomic.AObject {

      // Construct.
      constructor();

      // Set global property object values, available as read only on page
      static setGlobalBoolProperty(globalVar: string, property: string, value: boolean): void;
      static setGlobalStringProperty(globalVar: string, property: string, value: string): void;
      static setGlobalNumberProperty(globalVar: string, property: string, value: number): void;

   }

   export class WebClient extends Atomic.AObject {

      webRenderHandler: WebRenderHandler;

      // Construct.
      constructor();

      // Create the browser, call only once initialized with handlers
      createBrowser(initialURL: string, width: number, height: number): boolean;
      // Set the browser's width and height
      setSize(width: number, height: number): void;
      // Send a mouse click event to the browser
      sendMouseClickEvent(x: number, y: number, button: number, mouseUp: boolean, modifier: number, clickCount?: number): void;
      // Send a mouse press event to the browser
      sendMousePressEvent(x: number, y: number, button?: number, modifier?: number, clickCount?: number): void;
      // Send a mouse move event to the browser
      sendMouseMoveEvent(x: number, y: number, modifier: number, mouseLeave?: boolean): void;
      // Send a mouse wheel event to the browser
      sendMouseWheelEvent(x: number, y: number, modifier: number, deltaX: number, deltaY: number): void;
      // Send a focus event to the browser
      sendFocusEvent(focus?: boolean): void;
      // Invoke the Cut shortcut on the browser's main frame
      shortcutCut(): void;
      // Invoke the Copy shortcut on the browser's main frame
      shortcutCopy(): void;
      // Invoke the Paste shortcut on the browser's main frame
      shortcutPaste(): void;
      // Invoke the SelectAll shortcut on the browser's main frame
      shortcutSelectAll(): void;
      // Invoke the Undo shortcut on the browser's main frame
      shortcutUndo(): void;
      // Invoke the Redo shortcut on the browser's main frame
      shortcutRedo(): void;
      // Invoke the Delete shortcut on the browser's main frame
      shortcutDelete(): void;
      // Execute some JavaScript in the browser
      executeJavaScript(script: string): void;
      // Eval some JavaScript in the browser (async return value referenced by evalID)
      evalJavaScript(evalID: number, script: string): void;
      // Returns true if the page is currently loading
      isLoading(): boolean;
      // Load the specified url into the main frame of the browser
      loadURL(url: string): void;
      // Load html source into main frame of browser
      loadString(source: string, url?: string): void;
      // Go back in page history
      goBack(): void;
      // Go forward in page history
      goForward(): void;
      // Reload the current page
      reload(): void;
      // Set the render handler for this client
      setWebRenderHandler(handler: WebRenderHandler): void;

   }

   export class WebRenderHandler extends Atomic.AObject {

      width: number;
      height: number;
      webClient: WebClient;

      // Construct.
      constructor();

      // Get the current renderer width
      getWidth(): number;
      // Get the current renderer height
      getHeight(): number;
      // Get the WebClient associated with the render handler
      getWebClient(): WebClient;
      // Set the dimensions of the render handler
      setSize(width: number, height: number): void;
      // Set the render handlers WebClient
      setWebClient(webClient: WebClient): void;

   }

   export class WebTexture2D extends WebRenderHandler {

      width: number;
      height: number;
      texture2D: Atomic.Texture2D;
      clearColor: Atomic.Color;

      // Construct.
      constructor();

      // Get the current width of the texture
      getWidth(): number;
      // Get the current height of the texture
      getHeight(): number;
      // Get the Texture2D associated with the WebTexture2D
      getTexture2D(): Atomic.Texture2D;
      // get the clear color for the WebTexture
      getClearColor(): Atomic.Color;
      // Set the dimensions of the texture
      setSize(width: number, height: number): void;
      // Set the clear color for the WebTexture
      setClearColor(color: Atomic.Color): void;

   }



}
