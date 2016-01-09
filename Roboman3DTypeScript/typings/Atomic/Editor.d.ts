//Atomic TypeScript Definitions


/// <reference path="Atomic.d.ts" />

declare module Editor {


   // enum EditMode
   export type EditMode = number;
   export var EDIT_SELECT: EditMode;
   export var EDIT_MOVE: EditMode;
   export var EDIT_ROTATE: EditMode;
   export var EDIT_SCALE: EditMode;


   // enum AxisMode
   export type AxisMode = number;
   export var AXIS_WORLD: AxisMode;
   export var AXIS_LOCAL: AxisMode;


   // enum SceneEditType
   export type SceneEditType = number;
   export var SCENEEDIT_UNKNOWN: SceneEditType;
   export var SCENEEDIT_SELECTION: SceneEditType;


   export var FINDTEXT_FLAG_NONE: number;
   export var FINDTEXT_FLAG_CASESENSITIVE: number;
   export var FINDTEXT_FLAG_WHOLEWORD: number;
   export var FINDTEXT_FLAG_WRAP: number;
   export var FINDTEXT_FLAG_NEXT: number;
   export var FINDTEXT_FLAG_PREV: number;
   export var EDITOR_MODALERROR: number;
   export var EDITOR_MODALINFO: number;


//----------------------------------------------------
// MODULE: Editor
//----------------------------------------------------


   export class FileUtils extends Atomic.AObject {

      mobileProvisionPath: string;

      // Construct.
      constructor();

      createDirs(folder: string): boolean;
      getMobileProvisionPath(): string;
      getAndroidSDKPath(defaultPath: string): string;
      getAntPath(defaultPath: string): string;
      getJDKRootPath(defaultPath: string): string;
      openProjectFileDialog(): string;
      newProjectFileDialog(): string;
      getBuildPath(defaultPath: string): string;
      revealInFinder(fullpath: string): void;

   }

   export class EditorMode extends Atomic.AObject {

      // Construct.
      constructor();

      playProject(addArgs: string, debug?: boolean): boolean;
      isPlayerEnabled(): boolean;

   }

   export class PlayerMode extends Atomic.AObject {

      // Construct.
      constructor();

      launchedByEditor(): boolean;

   }

   export class JSResourceEditor extends ResourceEditor {

      constructor(fullpath: string, container: Atomic.UITabContainer);

      findText(findText: string, flags: number): boolean;
      findTextClose(): void;
      gotoTokenPos(tokenPos: number): void;
      gotoLineNumber(lineNumber: number): void;
      formatCode(): void;
      setFocus(): void;
      save(): boolean;

   }

   export class ResourceEditor extends Atomic.AObject {

      button: Atomic.UIButton;
      fullPath: string;
      rootContentWidget: Atomic.UIWidget;
      modified: boolean;

      constructor(fullpath: string, container: Atomic.UITabContainer);

      getButton(): Atomic.UIButton;
      hasUnsavedModifications(): boolean;
      setFocus(): void;
      close(navigateToAvailableResource?: boolean): void;
      findText(text: string, flags: number): boolean;
      findTextClose(): void;
      requiresInspector(): boolean;
      getFullPath(): string;
      undo(): void;
      redo(): void;
      save(): boolean;
      getRootContentWidget(): Atomic.UIWidget;
      invokeShortcut(shortcut: string): void;
      requestClose(): void;
      setModified(modified: boolean): void;

   }

   export class Gizmo3D extends Atomic.AObject {

      view: SceneView3D;
      axisMode: AxisMode;
      editMode: EditMode;
      gizmoNode: Atomic.Node;
      snapTranslationX: number;
      snapTranslationY: number;
      snapTranslationZ: number;
      snapRotation: number;
      snapScale: number;

      constructor();

      setView(view3D: SceneView3D): void;
      setAxisMode(mode: AxisMode): void;
      getAxisMode(): AxisMode;
      setEditMode(mode: EditMode): void;
      selected(): boolean;
      show(): void;
      hide(): void;
      update(): void;
      getGizmoNode(): Atomic.Node;
      getSnapTranslationX(): number;
      getSnapTranslationY(): number;
      getSnapTranslationZ(): number;
      getSnapRotation(): number;
      getSnapScale(): number;
      setSnapTranslationX(value: number): void;
      setSnapTranslationY(value: number): void;
      setSnapTranslationZ(value: number): void;
      setSnapRotation(value: number): void;
      setSnapScale(value: number): void;

   }

   export class SceneEditor3D extends ResourceEditor {

      selection: SceneSelection;
      sceneView3D: SceneView3D;
      scene: Atomic.Scene;
      gizmo: Gizmo3D;

      constructor(fullpath: string, container: Atomic.UITabContainer);

      getSelection(): SceneSelection;
      getSceneView3D(): SceneView3D;
      registerNode(node: Atomic.Node): void;
      reparentNode(node: Atomic.Node, newParent: Atomic.Node): void;
      getScene(): Atomic.Scene;
      getGizmo(): Gizmo3D;
      setFocus(): void;
      requiresInspector(): boolean;
      close(navigateToAvailableResource?: boolean): void;
      save(): boolean;
      undo(): void;
      redo(): void;
      cut(): void;
      copy(): void;
      paste(): void;
      invokeShortcut(shortcut: string): void;
      static getSceneEditor(scene: Atomic.Scene): SceneEditor3D;

   }

   export class SceneSelection extends Atomic.AObject {

      selectedNodeCount: number;

      constructor(sceneEditor: SceneEditor3D);

      cut(): void;
      copy(): void;
      paste(): void;
      delete(): void;
      // Add a node to the selection, if clear specified removes current nodes first
      addNode(node: Atomic.Node, clear?: boolean): void;
      removeNode(node: Atomic.Node, quiet?: boolean): void;
      getBounds(bbox: Atomic.BoundingBox): void;
      contains(node: Atomic.Node): boolean;
      getSelectedNode(index: number): Atomic.Node;
      getSelectedNodeCount(): number;
      clear(): void;

   }

   export class SceneView3D extends Atomic.UISceneView {

      pitch: number;
      yaw: number;
      debugRenderer: Atomic.DebugRenderer;
      sceneEditor3D: SceneEditor3D;

      constructor(sceneEditor: SceneEditor3D);

      setPitch(pitch: number): void;
      setYaw(yaw: number): void;
      frameSelection(): void;
      enable(): void;
      disable(): void;
      isEnabled(): boolean;
      getDebugRenderer(): Atomic.DebugRenderer;
      getSceneEditor3D(): SceneEditor3D;

   }

   export class CubemapGenerator extends EditorComponent {

      imageSize: number;

      // Construct.
      constructor();

      render(): boolean;
      getImageSize(): number;
      setImageSize(size: number): void;

   }

   export class EditorComponent extends Atomic.Component {

      // Construct.
      constructor();


   }



}
