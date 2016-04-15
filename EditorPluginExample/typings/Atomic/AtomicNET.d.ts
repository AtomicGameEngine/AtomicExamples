//////////////////////////////////////////////////////////
// IMPORTANT: THIS FILE IS GENERATED, CHANGES WILL BE LOST
//////////////////////////////////////////////////////////

// Atomic TypeScript Definitions

/// <reference path="Atomic.d.ts" />

declare module AtomicNET {


   // enum CSComponentMethod
   export type CSComponentMethod = number;
   export var CSComponentMethod_Start: CSComponentMethod;
   export var CSComponentMethod_DelayedStart: CSComponentMethod;
   export var CSComponentMethod_Update: CSComponentMethod;
   export var CSComponentMethod_PostUpdate: CSComponentMethod;
   export var CSComponentMethod_FixedUpdate: CSComponentMethod;
   export var CSComponentMethod_PostFixedUpdate: CSComponentMethod;


//----------------------------------------------------
// MODULE: NETCore
//----------------------------------------------------


   export class NETCore extends Atomic.AObject {

      context: Atomic.Context;

      // Construct.
      constructor();

      shutdown(): void;
      addAssemblyLoadPath(assemblyPath: string): void;
      execAssembly(assemblyName: string, args: string[]): number;
      waitForDebuggerConnect(): void;
      // to get a reference from
      static getContext(): Atomic.Context;

   }

   export class NETVariantMap extends Atomic.RefCounted {

      constructor();

      getBool(key: string): boolean;
      getInt(key: string): number;
      getFloat(key: string): number;
      getVector3(key: string): Atomic.Vector3;
      getQuaternion(key: string): Atomic.Quaternion;
      getPtr(key: string): Atomic.RefCounted;
      getString(key: string): string;
      getVariantType(key: string): Atomic.VariantType;
      getResourceFromRef(key: string): Atomic.Resource;
      contains(key: string): boolean;

   }



//----------------------------------------------------
// MODULE: NETScript
//----------------------------------------------------


   export class CSComponent extends Atomic.ScriptComponent {

      componentClassName: string;
      componentFile: Atomic.ScriptComponentFile;
      assemblyFile: CSComponentAssembly;

      // Construct.
      constructor();

      applyAttributes(): void;
      // Handle enabled/disabled state change. Changes update event subscription.
      onSetEnabled(): void;
      applyFieldValues(): void;
      setComponentClassName(name: string): void;
      getComponentClassName(): string;
      getComponentFile(): Atomic.ScriptComponentFile;
      getAssemblyFile(): CSComponentAssembly;
      setAssemblyFile(assemblyFile: CSComponentAssembly): void;

   }

   export class CSComponentAssembly extends Atomic.ScriptComponentFile {

      classNames: string[];

      // Construct.
      constructor();

      createCSComponent(classname: string): CSComponent;
      // Only valid in editor, as we don't inspect assembly at runtime
      getClassNames(): string[];

   }

   export class CSManaged extends Atomic.AObject {

      // Construct.
      constructor();

      initialize(): boolean;
      nETUpdate(timeStep: number): void;
      cSComponentCreate(assemblyName: string, componentName: string): CSComponent;
      cSComponentApplyFields(component: CSComponent, fieldMapPtr: NETVariantMap): void;
      cSComponentCallMethod(id: number, methodID: CSComponentMethod, value?: number): void;

   }

   export class CSScriptObject extends Atomic.AObject {

      // Construct.
      constructor();


   }



}
