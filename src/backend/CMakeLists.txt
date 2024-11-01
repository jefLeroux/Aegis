cmake_minimum_required(VERSION 3.10)
project(AegisBackend)

set(CMAKE_CXX_STANDARD 17)

# Include header files
include_directories(include)

# Source files
file(GLOB SOURCES "src/*.cpp")

# Build executable
add_executable(AegisBackend ${SOURCES})
