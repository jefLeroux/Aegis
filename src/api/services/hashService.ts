import { execFile } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execFilePromise = promisify(execFile);

// Function to verify hash using the C++ executable
export async function verifyHash(filePath: string, correctHash: string): Promise<{ match: boolean; message: string }> {
    const hashGeneratorPath = path.resolve(__dirname, '../../../build/hash_checker'); // Adjust the path to your executable

    try {
        const { stdout } = await execFilePromise(hashGeneratorPath, [filePath, correctHash]);

        // Check the output from the C++ executable
        if (stdout.includes("Hash matches!")) {
            return { match: true, message: "Hash matches!" };
        } else {
            return { match: false, message: "Hash does not match." };
        }
    } catch (error: any) {
        // Handle execution errors
        if (error.stderr) {
            throw new Error(`Execution error: ${error.stderr}`);
        }
        throw new Error(`Execution error: ${error.message}`);
    }
}
