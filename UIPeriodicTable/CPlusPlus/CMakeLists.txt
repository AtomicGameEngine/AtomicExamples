
# Define source files
file (GLOB SOURCE_FILES Resources/Scripts/*.cpp Resources/Scripts/*.h Resources/Components/*.cpp  )

if (WIN32)
    add_definitions(-DATOMIC_WIN32_CONSOLE)
endif()

add_executable(UI ${SOURCE_FILES})

target_link_libraries(UIPeriodicTable Atomic)

# Copy AtomicTool to Artifacts
add_custom_command( TARGET UIPeriodicTable POST_BUILD
                    COMMAND "${CMAKE_COMMAND}"
                    ARGS -E make_directory \"${ATOMIC_SOURCE_DIR}/Artifacts/Examples/CPlusPlus\"
                    COMMAND "${CMAKE_COMMAND}"
                    ARGS -E copy_if_different \"$<TARGET_FILE:UIPeriodicTable>\" \"${ATOMIC_SOURCE_DIR}/Artifacts/Examples/CPlusPlus/\"
                    COMMENT "Copying UIPeriodicTable to Build Artifacts" )

if (WIN32)

  # pre-Windows 8 can't count on D3DCompiler_47.dll being on system
  add_custom_command (TARGET UIPeriodicTable POST_BUILD
  COMMAND ${CMAKE_COMMAND}
  ARGS -E copy_if_different \"${D3DCOMPILER_47_DLL}\" \"$<TARGET_FILE_DIR:UIPeriodicTable>/D3DCompiler_47.dll\"
  COMMAND ${CMAKE_COMMAND}
  ARGS -E copy_if_different \"${D3DCOMPILER_47_DLL}\" \"${ATOMIC_SOURCE_DIR}/Artifacts/Examples/CPlusPlus/D3DCompiler_47.dll\" )

endif(WIN32)
