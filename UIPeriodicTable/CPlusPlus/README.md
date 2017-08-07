
## Atomic C++ UIPeriodicTable Example

### Using Atomic as a native game library

Atomic's core technology can be driven and extended with C++ using the same consistent API available to C#/JavaScript/TypeScript.  

The feature samples in this multi-example are written entirely in C++ and demonstrate that apps can be built solely using C++ without scripting features.


### Areas for improvement

1) The ResourcePaths/ResourcePreFixPaths are hard coded to the source tree for a dev build: https://github.com/AtomicGameEngine/AtomicExamples/blob/master/FeatureExamples/CPlusPlus/Source/FeatureExamples.cpp#L74

2) Atomic editor integration for C++ projects (component attribute editing, deployment, etc)

### Windows compilation instructions

1) Open a VS2015 64 bit command shell, cd to a work folder such as ```C:\Dev\Atomic\``` and run ```git clone --recursive https://github.com/AtomicGameEngine/AtomicGameEngine```

2) Once cloned, cd to ```AtomicGameEngine``` and run ```CMake_VS2015.bat```

![alt text](http://docs.atomicgameengine.com/forum_images/fecpp/fe_cpp_gitclonecmake.png)

3) A Visual Studio solution will be created next to the local repository folder, for example ```C:\Dev\Atomic\AtomicGameEngine-VS2015\Atomic.sln```

![alt text](http://docs.atomicgameengine.com/forum_images/fecpp/fe_cpp_cmakedone.png)

4) Open the Atomic solution in Visual Studio 2015

![alt text](http://docs.atomicgameengine.com/forum_images/fecpp/fe_cpp_opensolution.png)

5) Set UIPeriodicTable as the startup project and build the solution

6) Run the UIPeriodicTable example

7) There is also an executable copied to the Artifacts/Examples/CPlusPlus folder


