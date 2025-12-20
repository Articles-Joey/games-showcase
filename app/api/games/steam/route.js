
import { NextResponse } from 'next/server';

import fs from 'fs';
import path from 'path';

// 1. Common default path (You should ideally check Registry for actual install path)
// const steamPath = 'C:\\Program Files (x86)\\Steam\\steamapps';
const steamPath = 'D:\\Programs\\Steam\\steamapps';

function getSteamGames(libraryPath) {
    const files = fs.readdirSync(libraryPath);
    const games = [];

    const libraryCachePath = path.join(path.dirname(libraryPath), 'appcache', 'librarycache');
    let cacheFiles = [];
    try {
        if (fs.existsSync(libraryCachePath)) {
            cacheFiles = fs.readdirSync(libraryCachePath);
        }
    } catch (err) {
        console.error('Error reading library cache:', err);
    }

    files.forEach(file => {
        if (file.startsWith('appmanifest_') && file.endsWith('.acf')) {
            const content = fs.readFileSync(path.join(libraryPath, file), 'utf8');
            
            // Simple Regex to grab name and ID without a full VDF parser
            const nameMatch = content.match(/"name"\s+"(.+)"/);
            const idMatch = content.match(/"appid"\s+"(\d+)"/);
            
            if (nameMatch && idMatch) {
                const appId = idMatch[1];
                const gameCacheFiles = cacheFiles.filter(f => f.startsWith(`${appId}_`));

                let imageBase64 = null;
                const headerFilename = gameCacheFiles.find(f => f.endsWith('_header.jpg'));
                
                if (headerFilename) {
                    const imagePath = path.join(path.dirname(libraryPath), 'appcache', 'librarycache', headerFilename);
                    try {
                        const imageBuffer = fs.readFileSync(imagePath);
                        imageBase64 = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
                    } catch (err) {
                        console.error('Error reading image:', err);
                    }
                }

                games.push({
                    name: nameMatch[1],
                    id: appId,
                    platform: 'Steam',
                    cacheFiles: gameCacheFiles,
                    image: imageBase64,
                });
            }
        }
    });
    return games;
}

export async function GET(request) {

  const cookies = request.cookies ? Object.fromEntries(request.cookies) : {};

  const games = getSteamGames(steamPath);

  return NextResponse.json({ games });
}
