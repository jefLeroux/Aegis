# Set the minimum required CMake version
cmake_minimum_required(VERSION 3.15)

# Set the project name and version
project(AegisBackend VERSION 1.0 LANGUAGES CXX)

# Specify C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)
set(OPENSSL_ROOT_DIR "C:/Users/jleroux/Documents/warRoom/vcpkg/installed/x64-windows")


# Enable vcpkg integration for dependency management
# Update this path if your vcpkg is located in a different directory
set(CMAKE_TOOLCHAIN_FILE "C:/Users/jleroux/Documents/warRoom/vcpkg/scripts/buildsystems/vcpkg.cmake" CACHE STRING "Vcpkg toolchain file")

# Find OpenSSL package
find_package(OpenSSL REQUIRED)

# Add executable for the hash generator
add_executable(hash_checker src/hash_checker.cpp)

# Link OpenSSL libraries to the hash generator executable
target_link_libraries(hash_checker PRIVATE OpenSSL::SSL OpenSSL::Crypto)
