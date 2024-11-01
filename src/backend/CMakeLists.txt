cmake_minimum_required(VERSION 3.10)
project(AegisBackend)

set(CMAKE_CXX_STANDARD 17)

# Include header files
include_directories(include)

# Source files
file(GLOB SOURCES "src/*.cpp")

# Build executable
if(SOURCES)
    add_executable(AegisBackend ${SOURCES})
else()
    message(WARNING "No source files found. Please add some .cpp files.")
endif()
