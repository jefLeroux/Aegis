#include <openssl/evp.h>
#include <openssl/err.h>
#include <fstream>
#include <iostream>
#include <iomanip>
#include <sstream>

using namespace std;

// function that hashes a fille using SHA256
string generateFileHash(string filePath) {
    // create a SHA256 hash object
    EVP_MD_CTX* ctx = EVP_MD_CTX_new();  // Create a new message digest context
    if (!ctx) {
        throw std::runtime_error("Failed to create EVP_MD_CTX");
    }

    // initialize the hash
    if (EVP_DigestInit_ex(ctx, EVP_sha256(), NULL) != 1) {
        EVP_MD_CTX_free(ctx);
        throw std::runtime_error("Failed to initialize digest");
    }

    // open the file in binary mode
    ifstream file(filePath, ios::binary);

    // make sure the file opened successfully
    if(!file) {
        EVP_MD_CTX_free(ctx);
        cerr << "Failed to open file: " << filePath << endl;
        return "";
    }

    // read the file and update the hash
    char buffer[8192];
    while (file.read(buffer, sizeof(buffer))) {
        if (EVP_DigestUpdate(ctx, buffer, file.gcount()) != 1) {
            EVP_MD_CTX_free(ctx);
            throw runtime_error("Failed to update digest");
        }
    }
    if (EVP_DigestUpdate(ctx, buffer, file.gcount()) != 1) {
        EVP_MD_CTX_free(ctx);
        throw runtime_error("Failed to update digest");
    }

    unsigned char hash[EVP_MAX_MD_SIZE];
    unsigned int hashLength = 0;

    // finalize the hash
    if (EVP_DigestFinal_ex(ctx, hash, &hashLength) != 1) {
        EVP_MD_CTX_free(ctx);
        throw runtime_error("Failed to finalize digest");
    }

    EVP_MD_CTX_free(ctx);  // Clean up

    // Convert hash to hex string for readability
    stringstream hexStream;
    for (unsigned int i = 0; i < hashLength; ++i) {
        hexStream << std::hex << std::setw(2) << std::setfill('0') << (int)hash[i];
    }
    return hexStream.str();
}

// Main function to compare file hash with provided hash
int main(int argc, char* argv[]) {
    // make sure the correct number of arguments are provided
    if (argc != 3) {
        cerr << "Usage: " << argv[0] << " <file> <hash>" << endl;
        return 1;
    }

    string filePath = argv[1];
    string correctHash = argv[2];

    try {
        string fileHash = generateFileHash(filePath);
        if (fileHash == correctHash) {
            cout << "Hash matches!" << endl;
            return 0;  // Indicate success
        } else {
            cout << "Hash does not match." << endl;
            return 2;  // Indicate mismatch
        }
    }
    catch(const exception& e) {
        cerr << e.what() << endl;
        return 1;
    }
}
