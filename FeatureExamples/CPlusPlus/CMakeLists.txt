

include_directories(${CMAKE_SOURCE_DIR}/Source)
include_directories ( ${CMAKE_SOURCE_DIR}/Source/ThirdParty
                      ${CMAKE_SOURCE_DIR}/Source/ThirdParty/rapidjson/include
                      ${CMAKE_SOURCE_DIR}/Source/ThirdParty/kNet/include
                      ${CMAKE_SOURCE_DIR}/Source/ThirdParty/FreeType/include
                      ${CMAKE_SOURCE_DIR}/Source/ThirdParty/Box2D )

# Define source files
file (GLOB SOURCE_FILES Source/*.cpp Source/*.h)

add_executable(FeatureExamples ${SOURCE_FILES})

target_link_libraries(FeatureExamples ${ATOMIC_LINK_LIBRARIES})

# Copy AtomicTool to Artifacts
add_custom_command( TARGET FeatureExamples POST_BUILD
                    COMMAND "${CMAKE_COMMAND}"
                    ARGS -E make_directory \"${CMAKE_SOURCE_DIR}/Artifacts/Examples/CPlusPlus\"
                    COMMAND "${CMAKE_COMMAND}"
                    ARGS -E copy_if_different \"$<TARGET_FILE:FeatureExamples>\" \"${CMAKE_SOURCE_DIR}/Artifacts/Examples/CPlusPlus/\"
                    COMMENT "Copying FeatureExamples to Build Artifacts" )

if (MSVC)

  # pre-Windows 8 can't count on D3DCompiler_47.dll being on system
  add_custom_command (TARGET FeatureExamples POST_BUILD
  COMMAND ${CMAKE_COMMAND}
  ARGS -E copy_if_different \"${D3DCOMPILER_47_DLL}\" \"$<TARGET_FILE_DIR:FeatureExamples>/D3DCompiler_47.dll\"
  COMMAND ${CMAKE_COMMAND}
  ARGS -E copy_if_different \"${D3DCOMPILER_47_DLL}\" \"${CMAKE_SOURCE_DIR}/Artifacts/Examples/CPlusPlus/D3DCompiler_47.dll\" )

endif(MSVC)


