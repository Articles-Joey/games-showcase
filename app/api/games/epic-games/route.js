
import { NextResponse } from 'next/server';

import fs from 'fs';
import path from 'path';

const epicManifestPath = 'C:\\ProgramData\\Epic\\EpicGamesLauncher\\Data\\Manifests';

function getEpicGames() {
    if (!fs.existsSync(epicManifestPath)) return [];

    const files = fs.readdirSync(epicManifestPath);
    const games = [];

    files.forEach(file => {
        if (file.endsWith('.item')) {
            const content = fs.readFileSync(path.join(epicManifestPath, file), 'utf8');
            try {
                const data = JSON.parse(content);
                games.push({
                    name: data.DisplayName,
                    installLocation: data.InstallLocation,
                    platform: 'Epic'
                });
            } catch (err) {
                console.error("Error parsing manifest:", file);
            }
        }
    });
    return games;
}

export async function GET(request) {

    if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json({
            message: "Only available in development mode."
         }, {
            status: 403
         });
    }

    const cookies = request.cookies ? Object.fromEntries(request.cookies) : {};

    const games = getEpicGames();

    return NextResponse.json({ games });
}
