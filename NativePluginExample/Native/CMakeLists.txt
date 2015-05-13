cmake_minimum_required (VERSION 2.8)

set (PLUGINNAME MyNativePlugin)

set (SOURCEFILES MyNativePlugin.cpp)

if (WIN32)

	# compile with static runtime, so our plugin doesn't depend on having some MSVC runtime installed

	set(CompilerFlags CMAKE_CXX_FLAGS CMAKE_CXX_FLAGS_DEBUG CMAKE_CXX_FLAGS_RELEASE CMAKE_C_FLAGS CMAKE_C_FLAGS_DEBUG CMAKE_C_FLAGS_RELEASE)

	foreach(CompilerFlag ${CompilerFlags})
	    string(REPLACE "/MD" "/MT" ${CompilerFlag} "${${CompilerFlag}}")
	endforeach()

	set (PLUGINPATH Windows/x64)

else()

	set (PLUGINPATH Mac/x64)

endif()

project(${PLUGINNAME})

include_directories("${NATIVESDK}/Windows")

add_library(${PLUGINNAME} SHARED ${SOURCEFILES})

add_custom_command (TARGET ${PLUGINNAME} POST_BUILD
	COMMAND ${CMAKE_COMMAND}
	ARGS -E copy \"$<TARGET_FILE:${PLUGINNAME}>\" \"${CMAKE_SOURCE_DIR}/../Resources/Plugins/${PLUGINPATH}/$<TARGET_FILE_NAME:${PLUGINNAME}>\")
