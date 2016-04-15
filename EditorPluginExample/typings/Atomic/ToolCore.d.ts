//////////////////////////////////////////////////////////
// IMPORTANT: THIS FILE IS GENERATED, CHANGES WILL BE LOST
//////////////////////////////////////////////////////////

// Atomic TypeScript Definitions

/// <reference path="Atomic.d.ts" />

declare module ToolCore {


   // enum PlatformID
   export type PlatformID = number;
   export var PLATFORMID_UNDEFINED: PlatformID;
   export var PLATFORMID_WINDOWS: PlatformID;
   export var PLATFORMID_MAC: PlatformID;
   export var PLATFORMID_ANDROID: PlatformID;
   export var PLATFORMID_IOS: PlatformID;
   export var PLATFORMID_WEB: PlatformID;


   export var PROJECTFILE_VERSION: number;


//----------------------------------------------------
// MODULE: ToolCore
//----------------------------------------------------


   export class ToolEnvironment extends Atomic.AObject {

      rootSourceDir: string;
      toolPrefs: ToolPrefs;
      rootBuildDir: string;
      editorBinary: string;
      playerBinary: string;
      toolBinary: string;
      coreDataDir: string;
      playerDataDir: string;
      editorDataDir: string;
      nETCoreCLRAbsPath: string;
      nETAssemblyLoadPaths: string;
      nETTPAPaths: string;
      atomicNETEngineAssemblyPath: string;
      deploymentDataDir: string;
      toolDataDir: string;
      devConfigFilename: string;
      playerAppFolder: string;
      iOSDeployBinary: string;

      constructor();

      initFromPackage(): boolean;
      initFromJSON(atomicTool?: boolean): boolean;
      // Root source and build directories for development source tree builds
      setRootSourceDir(sourceDir: string): void;
      setRootBuildDir(buildDir: string, setBinaryPaths?: boolean): void;
      getToolPrefs(): ToolPrefs;
      saveToolPrefs(): void;
      loadToolPrefs(): void;
      getRootSourceDir(): string;
      getRootBuildDir(): string;
      // Binaries
      getEditorBinary(): string;
      getPlayerBinary(): string;
      getToolBinary(): string;
      // Resource directories
      getCoreDataDir(): string;
      getPlayerDataDir(): string;
      getEditorDataDir(): string;
      // AtomicNET
      getNETCoreCLRAbsPath(): string;
      getNETAssemblyLoadPaths(): string;
      getNETTPAPaths(): string;
      getAtomicNETEngineAssemblyPath(): string;
      // Data directories
      getDeploymentDataDir(): string;
      getToolDataDir(): string;
      getDevConfigFilename(): string;
      getPlayerAppFolder(): string;
      getIOSDeployBinary(): string;
      dump(): void;

   }

   export class ToolPrefs extends Atomic.AObject {

      androidSDKPath: string;
      jDKRootPath: string;
      antPath: string;
      prefsPath: string;

      constructor();

      getAndroidSDKPath(): string;
      getJDKRootPath(): string;
      getAntPath(): string;
      setAndroidSDKPath(path: string): void;
      setJDKRootPath(path: string): void;
      setAntPath(path: string): void;
      getPrefsPath(): string;
      load(): void;
      save(): void;

   }

   export class ToolSystem extends Atomic.AObject {

      project: Project;
      dataPath: string;
      currentPlatform: Platform;

      constructor();

      loadProject(fullpath: string): boolean;
      getProject(): Project;
      closeProject(): void;
      getDataPath(): string;
      setDataPath(path: string): void;
      registerPlatform(platform: Platform): void;
      getPlatformByID(platform: PlatformID): Platform;
      getPlatformByName(name: string): Platform;
      setCurrentPlatform(platform: PlatformID): void;
      getCurrentPlatform(): Platform;
      setCLI(): void;
      isCLI(): boolean;

   }

   export class Project extends Atomic.AObject {

      resourcePath: string;
      componentsPath: string;
      scriptsPath: string;
      modulesPath: string;
      buildSettings: ProjectBuildSettings;
      userPrefs: ProjectUserPrefs;
      projectPath: string;
      projectFilePath: string;
      userPrefsFullPath: string;
      buildSettingsFullPath: string;
      version: string;

      // Construct.
      constructor();

      load(fullpath: string): boolean;
      save(fullpath?: string): void;
      // Paths
      getResourcePath(): string;
      setResourcePath(resourcePath: string): void;
      getComponentsPath(): string;
      getScriptsPath(): string;
      getModulesPath(): string;
      isComponentsDirOrFile(fullPath: string): boolean;
      isScriptsDirOrFile(fullPath: string): boolean;
      isModulesDirOrFile(fullPath: string): boolean;
      addPlatform(platformID: PlatformID): void;
      containsPlatform(platformID: PlatformID): boolean;
      removePlatform(platformID: PlatformID): void;
      isDirty(): boolean;
      setDirty(): void;
      getBuildSettings(): ProjectBuildSettings;
      getUserPrefs(): ProjectUserPrefs;
      getProjectPath(): string;
      getProjectFilePath(): string;
      getUserPrefsFullPath(): string;
      getBuildSettingsFullPath(): string;
      getVersion(): string;
      setVersion(version: string): void;
      saveBuildSettings(): void;
      loadBuildSettings(): boolean;
      saveUserPrefs(): void;
      loadUserPrefs(): boolean;

   }

   export class MacBuildSettings extends Atomic.RefCounted {

      appName: string;
      packageName: string;
      companyName: string;
      productName: string;

      constructor();

      getAppName(): string;
      getPackageName(): string;
      getCompanyName(): string;
      getProductName(): string;
      setAppName(name: string): void;
      setPackageName(packageName: string): void;
      setCompanyName(companyName: string): void;
      setProductName(productName: string): void;

   }

   export class WebBuildSettings extends Atomic.RefCounted {

      appName: string;
      packageName: string;
      companyName: string;
      productName: string;

      constructor();

      getAppName(): string;
      getPackageName(): string;
      getCompanyName(): string;
      getProductName(): string;
      setAppName(name: string): void;
      setPackageName(packageName: string): void;
      setCompanyName(companyName: string): void;
      setProductName(productName: string): void;

   }

   export class WindowsBuildSettings extends Atomic.RefCounted {

      appName: string;
      packageName: string;
      companyName: string;
      productName: string;

      constructor();

      getAppName(): string;
      getPackageName(): string;
      getCompanyName(): string;
      getProductName(): string;
      setAppName(name: string): void;
      setPackageName(packageName: string): void;
      setCompanyName(companyName: string): void;
      setProductName(productName: string): void;

   }

   export class AndroidBuildSettings extends Atomic.RefCounted {

      appName: string;
      packageName: string;
      companyName: string;
      productName: string;
      sDKVersion: string;
      minSDKVersion: string;
      activityName: string;

      constructor();

      getAppName(): string;
      getPackageName(): string;
      getCompanyName(): string;
      getProductName(): string;
      getSDKVersion(): string;
      getMinSDKVersion(): string;
      getActivityName(): string;
      setAppName(name: string): void;
      setPackageName(packageName: string): void;
      setCompanyName(companyName: string): void;
      setProductName(productName: string): void;
      setSDKVersion(value: string): void;
      setMinSDKVersion(value: string): void;
      setActivityName(value: string): void;

   }

   export class IOSBuildSettings extends Atomic.RefCounted {

      appName: string;
      packageName: string;
      companyName: string;
      productName: string;
      provisionFile: string;
      appIDPrefix: string;

      constructor();

      getAppName(): string;
      getPackageName(): string;
      getCompanyName(): string;
      getProductName(): string;
      getProvisionFile(): string;
      getAppIDPrefix(): string;
      setAppName(name: string): void;
      setPackageName(packageName: string): void;
      setCompanyName(companyName: string): void;
      setProductName(productName: string): void;
      setProvisionFile(value: string): void;
      setAppIDPrefix(value: string): void;

   }

   export class ProjectBuildSettings extends Atomic.AObject {

      macBuildSettings: MacBuildSettings;
      windowsBuildSettings: WindowsBuildSettings;
      webBuildSettings: WebBuildSettings;
      androidBuildSettings: AndroidBuildSettings;
      iOSBuildSettings: IOSBuildSettings;

      // Construct.
      constructor();

      getMacBuildSettings(): MacBuildSettings;
      getWindowsBuildSettings(): WindowsBuildSettings;
      getWebBuildSettings(): WebBuildSettings;
      getAndroidBuildSettings(): AndroidBuildSettings;
      getIOSBuildSettings(): IOSBuildSettings;
      load(path: string): boolean;
      save(path: string): void;

   }

   export class ProjectFile extends Atomic.AObject {

      // Construct.
      constructor();

      save(project: Project): void;
      load(project: Project): boolean;
      writeNewProject(fullpath: string): void;

   }

   export class ProjectUserPrefs extends Atomic.AObject {

      defaultPlatform: PlatformID;
      lastBuildPath: string;
      snapTranslationX: number;
      snapTranslationY: number;
      snapTranslationZ: number;
      snapRotation: number;
      snapScale: number;

      // Construct.
      constructor();

      getDefaultPlatform(): PlatformID;
      getLastBuildPath(): string;
      setLastBuildPath(path: string): void;
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

   export class Platform extends Atomic.AObject {

      license: boolean;
      name: string;
      platformID: PlatformID;

      constructor();

      getLicense(): boolean;
      getName(): string;
      getPlatformID(): PlatformID;
      newBuild(project: Project): BuildBase;

   }

   export class PlatformAndroid extends Platform {

      license: boolean;
      name: string;
      platformID: PlatformID;
      androidCommand: string;
      aDBCommand: string;
      androidTargets: string[];

      constructor();

      getLicense(): boolean;
      getName(): string;
      getPlatformID(): PlatformID;
      getAndroidCommand(): string;
      getADBCommand(): string;
      refreshAndroidTargets(): void;
      getAndroidTargets(): string[];
      newBuild(project: Project): BuildBase;

   }

   export class PlatformIOS extends Platform {

      name: string;
      platformID: PlatformID;
      license: boolean;

      constructor();

      getName(): string;
      getPlatformID(): PlatformID;
      newBuild(project: Project): BuildBase;
      parseProvisionAppIdentifierPrefix(provisionFile: string): string;
      getLicense(): boolean;

   }

   export class PlatformMac extends Platform {

      name: string;
      platformID: PlatformID;
      license: boolean;

      constructor();

      getName(): string;
      getPlatformID(): PlatformID;
      newBuild(project: Project): BuildBase;
      getLicense(): boolean;

   }

   export class PlatformWeb extends Platform {

      name: string;
      platformID: PlatformID;
      license: boolean;

      constructor();

      getName(): string;
      getPlatformID(): PlatformID;
      newBuild(project: Project): BuildBase;
      getLicense(): boolean;

   }

   export class PlatformWindows extends Platform {

      name: string;
      platformID: PlatformID;
      license: boolean;

      constructor();

      getName(): string;
      getPlatformID(): PlatformID;
      newBuild(project: Project): BuildBase;
      getLicense(): boolean;

   }

   export class Command extends Atomic.AObject {

      constructor();

      parse(command: string): boolean;
      run(): void;
      finished(): void;
      error(errorMsg: string): void;
      cancel(): void;
      requiresProjectLoad(): boolean;
      requiresLicenseValidation(): boolean;

   }

   export class PlayCmd extends Command {

      constructor();

      run(): void;

   }

   export class OpenAssetImporter extends Atomic.AObject {

      errorMessage: string;
      importNode: Atomic.Node;
      startTime: number;
      endTime: number;
      scale: number;
      exportAnimations: boolean;
      verboseLog: boolean;

      constructor();

      load(assetPath: string): boolean;
      getErrorMessage(): string;
      exportModel(outName: string, animName?: string, animationOnly?: boolean): boolean;
      setImportNode(node: Atomic.Node): void;
      setStartTime(startTime: number): void;
      setEndTime(endTime: number): void;
      setScale(scale: number): void;
      setExportAnimations(exportAnimations: boolean): void;
      setVerboseLog(verboseLog: boolean): void;

   }

   export class Asset extends Atomic.AObject {

      guid: string;
      name: string;
      path: string;
      extension: string;
      relativePath: string;
      cachePath: string;
      importerType: string;
      importerTypeName: string;
      importer: AssetImporter;
      parent: Asset;
      dirty: boolean;
      fileTimestamp: number;
      dotAssetFilename: string;

      // Construct.
      constructor();

      import(): boolean;
      preload(): boolean;
      setPath(path: string): boolean;
      getGUID(): string;
      getName(): string;
      getPath(): string;
      getExtension(): string;
      // Get the path relative to project
      getRelativePath(): string;
      getCachePath(): string;
      getResource(typeName?: string): Atomic.Resource;
      getImporterType(): string;
      getImporterTypeName(): string;
      getImporter(): AssetImporter;
      postImportError(message: string): void;
      getParent(): Asset;
      setDirty(dirty: boolean): void;
      isDirty(): boolean;
      // Get the last timestamp as seen by the AssetDatabase
      getFileTimestamp(): number;
      // Sets the time stamp to the asset files current time
      updateFileTimestamp(): void;
      getDotAssetFilename(): string;
      // Rename the asset, which depending on the asset type may be nontrivial
      rename(newName: string): boolean;
      // Move the asset, which depending on the asset type may be nontrivial
      move(newPath: string): boolean;
      isFolder(): boolean;
      load(): boolean;
      save(): boolean;
      // Instantiate a node from the asset
      instantiateNode(parent: Atomic.Node, name: string): Atomic.Node;

   }

   export class AssetDatabase extends Atomic.AObject {

      cachePath: string;

      // Construct.
      constructor();

      getAssetByGUID(guid: string): Asset;
      getAssetByPath(path: string): Asset;
      getAssetByCachePath(cachePath: string): Asset;
      generateAssetGUID(): string;
      registerGUID(guid: string): void;
      getCachePath(): string;
      deleteAsset(asset: Asset): void;
      scan(): void;
      reimportAllAssets(): void;
      reimportAllAssetsInDirectory(directoryPath: string): void;
      getResourceImporterName(resourceTypeName: string): string;
      getDotAssetFilename(path: string): string;
      getFolderAssets(folder:string):ToolCore.Asset[];
      getAssetsByImporterType(importerType:string, resourceType:string):ToolCore.Asset[];

   }

   export class AssetImporter extends Atomic.AObject {

      asset: Asset;

      // Construct.
      constructor(asset: Asset);

      setDefaults(): void;
      preload(): boolean;
      getAsset(): Asset;
      getResource(typeName?: string): Atomic.Resource;
      requiresCacheFile(): boolean;
      // Instantiate a node from the asset
      instantiateNode(parent: Atomic.Node, name: string): Atomic.Node;
      rename(newName: string): boolean;
      move(newPath: string): boolean;

   }

   export class AudioImporter extends AssetImporter {

      // Construct.
      constructor(asset: Asset);

      setDefaults(): void;
      getResource(typeName?: string): Atomic.Resource;

   }

   export class JSONImporter extends AssetImporter {

      // Construct.
      constructor(asset: Asset);

      setDefaults(): void;
      getResource(typeName?: string): Atomic.Resource;

   }

   export class JavascriptImporter extends AssetImporter {

      // Construct.
      constructor(asset: Asset);

      setDefaults(): void;
      isComponentFile(): boolean;
      getResource(typeName?: string): Atomic.Resource;

   }

   export class MaterialImporter extends AssetImporter {

      // Construct.
      constructor(asset: Asset);

      setDefaults(): void;
      saveMaterial(): void;
      getResource(typeName?: string): Atomic.Resource;

   }

   export class AnimationImportInfo extends Atomic.AObject {

      name: string;
      startTime: number;
      endTime: number;

      constructor();

      getName(): string;
      getStartTime(): number;
      getEndTime(): number;
      setName(name: string): void;
      setStartTime(time: number): void;
      setEndTime(time: number): void;

   }

   export class ModelImporter extends AssetImporter {

      scale: number;
      importAnimations: boolean;
      animationCount: number;

      // Construct.
      constructor(asset: Asset);

      setDefaults(): void;
      getScale(): number;
      setScale(scale: number): void;
      getImportAnimations(): boolean;
      setImportAnimations(importAnimations: boolean): void;
      getAnimationCount(): number;
      setAnimationCount(count: number): void;
      getResource(typeName?: string): Atomic.Resource;
      getAnimationInfo(index: number): AnimationImportInfo;
      // Instantiate a node from the asset
      instantiateNode(parent: Atomic.Node, name: string): Atomic.Node;
      getAnimations():Atomic.Animation[];

   }

   export class NETAssemblyImporter extends AssetImporter {

      // Construct.
      constructor(asset: Asset);

      setDefaults(): void;
      getResource(typeName?: string): Atomic.Resource;

   }

   export class PEXImporter extends AssetImporter {

      // Construct.
      constructor(asset: Asset);

      setDefaults(): void;
      getResource(typeName: string): Atomic.Resource;

   }

   export class PrefabImporter extends AssetImporter {

      // Construct.
      constructor(asset: Asset);

      setDefaults(): void;
      preload(): boolean;
      // Instantiate a node from the asset
      instantiateNode(parent: Atomic.Node, name: string): Atomic.Node;

   }

   export class SpriterImporter extends AssetImporter {

      // Construct.
      constructor(asset: Asset);

      setDefaults(): void;
      getResource(typeName?: string): Atomic.Resource;
      instantiateNode(parent: Atomic.Node, name: string): Atomic.Node;

   }

   export class TextureImporter extends AssetImporter {

      // Construct.
      constructor(asset: Asset);

      setDefaults(): void;
      getResource(typeName?: string): Atomic.Resource;
      instantiateNode(parent: Atomic.Node, name: string): Atomic.Node;

   }

   export class LicenseSystem extends Atomic.AObject {

      sourceBuild: boolean;
      licenseWindows: boolean;
      licenseMac: boolean;
      licenseAndroid: boolean;
      licenseIOS: boolean;
      licenseHTML5: boolean;
      licenseModule3D: boolean;
      key: string;
      email: string;

      // Construct.
      constructor();

      initialize(): void;
      getSourceBuild(): boolean;
      getLicenseWindows(): boolean;
      getLicenseMac(): boolean;
      getLicenseAndroid(): boolean;
      getLicenseIOS(): boolean;
      getLicenseHTML5(): boolean;
      getLicenseModule3D(): boolean;
      // Returns whether there are any platform licenses available
      isStandardLicense(): boolean;
      // Returns true if request to deactivate is made
      deactivate(): boolean;
      resetLicense(): void;
      loadLicense(): boolean;
      // Basic key validation
      validateKey(key: string): boolean;
      // Activate on server
      requestServerActivation(key: string): void;
      getKey(): string;
      generateMachineID(): string;
      getEmail(): string;
      licenseAgreementConfirmed(): void;

   }

   export class BuildAndroid extends BuildBase {

      buildSubfolder: string;

      constructor(project: Project);

      build(buildPath: string): void;
      getBuildSubfolder(): string;

   }

   export class BuildBase extends Atomic.AObject {

      buildSubfolder: string;

      constructor(project: Project, platform: PlatformID);

      build(buildPath: string): void;
      useResourcePackager(): boolean;
      getBuildSubfolder(): string;
      addResourceDir(dir: string): void;
      buildLog(message: string, sendEvent?: boolean): void;
      buildWarn(warning: string, sendEvent?: boolean): void;
      buildError(error: string, sendEvent?: boolean): void;
      // Fail the current build
      failBuild(message: string): void;

   }

   export class BuildIOS extends BuildBase {

      buildSubfolder: string;

      constructor(project: Project);

      getBuildSubfolder(): string;
      build(buildPath: string): void;

   }

   export class BuildMac extends BuildBase {

      buildSubfolder: string;

      constructor(project: Project);

      getBuildSubfolder(): string;
      build(buildPath: string): void;

   }

   export class BuildSystem extends Atomic.AObject {

      buildPath: string;

      // Construct.
      constructor();

      setBuildPath(path: string): void;
      getBuildPath(): string;
      queueBuild(buildBase: BuildBase): void;
      startNextBuild(): boolean;
      buildComplete(platform: PlatformID, buildFolder: string, success?: boolean, buildMessage?: string): void;

   }

   export class BuildWeb extends BuildBase {

      buildSubfolder: string;

      constructor(project: Project);

      build(buildPath: string): void;
      getBuildSubfolder(): string;

   }

   export class BuildWindows extends BuildBase {

      buildSubfolder: string;

      constructor(project: Project);

      getBuildSubfolder(): string;
      build(buildPath: string): void;

   }

   export class Subprocess extends Atomic.AObject {

      // Construct.
      constructor();


   }

   export class SubprocessSystem extends Atomic.AObject {

      // Construct.
      constructor();

      launch(command: string, args: string[], initialDirectory?: string): Subprocess;

   }



}
