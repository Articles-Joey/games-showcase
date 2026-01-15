import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';

export async function POST(req) {

    if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json({
            message: "Only available in development mode."
        }, {
            status: 403
        });
    }
    
    try {
        const { location } = await req.json();
        console.log("Received location:", location);

        if (!location) {
            return NextResponse.json({ message: 'Location is required' }, { status: 400 });
        }

        // Clean up potential double-escaping artifacts from user input/env vars
        // e.g. "cd /d \"C:\\Path\"" -> "cd /d "C:\Path""
        let cleanLocation = location.replace(/\\"/g, '"');
        
        // Optional: Fix double backslashes if they are not needed (though CMD usually handles them)
        // cleanLocation = cleanLocation.replace(/\\\\/g, '\\'); 

        let command;

        // 1. If the user provided a full command string (contains && or starts with cd), use it as is.
        if (cleanLocation.includes('&&') || cleanLocation.trim().toLowerCase().startsWith('cd ')) {
            command = cleanLocation;
        } 
        // 2. Try to parse as "Path to Exe" + "Args"
        else {
            const exeMatch = cleanLocation.match(/^"?(.*\.exe)"?\s*(.*)$/i);

            if (exeMatch) {
                const fullExePath = exeMatch[1]; // e.g. F:\Programs\PrismLauncher\prismlauncher.exe
                const args = exeMatch[2];        // e.g. -l 1.21.1

                // Extract directory and filename
                // We use string manipulation to be safe with Windows paths regardless of server OS
                const lastSlashIndex = Math.max(fullExePath.lastIndexOf('\\'), fullExePath.lastIndexOf('/'));
                
                let directory, fileName;
                if (lastSlashIndex !== -1) {
                    directory = fullExePath.substring(0, lastSlashIndex);
                    fileName = fullExePath.substring(lastSlashIndex + 1);
                } else {
                    directory = ".";
                    fileName = fullExePath;
                }

                // Construct the command: Change Directory -> Start Exe with Args
                command = `cd /d "${directory}" && start "" "${fileName}" ${args}`;
            } else {
                // Fallback: just try to start it directly
                command = `start "" "${cleanLocation}"`;
            }
        }

        console.log("Executing command:", command);

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
            }
        });

        return NextResponse.json({ message: 'Game launched', location, command });
    } catch (error) {
        console.error('Launch error:', error);
        return NextResponse.json({ message: 'Error launching game', error: error.message }, { status: 500 });
    }
}
