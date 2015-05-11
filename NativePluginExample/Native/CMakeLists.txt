cmake_minimum_required (VERSION 2.8)

#set the native sdk folder, could also be an environment variable, stored locally, etc
set (NATIVESDK "C:/Dev/atomic/AtomicGameEngine/Bin/NativeSDK")

set (PLUGINNAME MyNativePlugin) 

set (SOURCEFILES MyNativePlugin.cpp)

if (WIN32)

	# compile with static runtime, so our plugin doesn't depend on having some MSVC runtime installed
	
	set(CompilerFlags CMAKE_CXX_FLAGS CMAKE_CXX_FLAGS_DEBUG CMAKE_CXX_FLAGS_RELEASE CMAKE_C_FLAGS CMAKE_C_FLAGS_DEBUG CMAKE_C_FLAGS_RELEASE)

	foreach(CompilerFlag ${CompilerFlags})
    	string(REPLACE "/MD" "/MT" ${CompilerFlag} "${${CompilerFlag}}")
	endforeach()

endif()

project(${PLUGINNAME})

include_directories("${NATIVESDK}/Windows")

add_library(${PLUGINNAME} SHARED ${SOURCEFILES})

target_link_libraries(${PLUGINNAME} ${NATIVESDK}/Windows/x64/AtomicPlugin.lib)

add_custom_command (TARGET ${PLUGINNAME} POST_BUILD
	COMMAND ${CMAKE_COMMAND}
	ARGS -E copy \"$<TARGET_FILE:${PLUGINNAME}>\" \"${CMAKE_SOURCE_DIR}/../Resources/Plugins/Windows/x64/$<TARGET_FILE_NAME:${PLUGINNAME}>\")
