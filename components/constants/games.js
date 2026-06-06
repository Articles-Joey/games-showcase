const games = [
    {
        name: 'Four Frogs',
        short_description: 'Four player capture the flag game. Each player gets three bugs(flags), lose all your flags and you are eliminated.',
        link: 'https://four-frogs.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        multiplayer: true,
        multiplayer_tag: '2-4 Players',
        single_player: false,
        image: `${process.env.NEXT_PUBLIC_CDN}games/Four%20Frogs/thumbnail.webp`,
        controls_support: [
            {
                name: 'Keyboard',
                methods: []
            },
            {
                name: 'Gamepad',
                methods: []
            },
            {
                name: 'Touch',
                methods: []
            }
        ],
        gamepadSupport: true,
        engine: 'Three.js',
        content_rating: "Everyone",
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/four-frogs',
    },
    {
        name: 'Race Game',
        short_description: 'Each round consists of picking a number between one to four. If two or more players choose the same number, they cannot advance.',
        link: 'https://race-game.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        multiplayer: true,
        multiplayer_tag: '2-4 Players',
        single_player: false,
        // preview: true,
        // preview_true_button_text: 'Summer 2023',
        // image: `${process.env.NEXT_PUBLIC_CDN}games/Race Game/thumbnail.jpg`,
        image: `https://raw.githubusercontent.com/Articles-Joey/race-game/refs/heads/main/public/img/preview.webp`,
        inspo_image: `${process.env.NEXT_PUBLIC_CDN}games/Race Game/race-game-toontown-thumbnail.webp`,
        engine: 'Three.js',
        content_rating: "Everyone",
        amcot_character: true,
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/race-game',
    },
    {
        name: 'Battle Trap',
        short_description: 'Turn based game where you trap players with a trail you leave behind from your moves.',
        link: 'https://battle-trap.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        multiplayer: true,
        multiplayer_tag: '2-4 Players',
        single_player: false,
        offline: true,
        offlineNote: 'Play offline in turned based rounds with other people on the same computer and/or bots.',
        // image: `${process.env.NEXT_PUBLIC_CDN}games/Battle Trap/thumbnail.png`,
        image: "https://raw.githubusercontent.com/Articles-Joey/battle-trap/refs/heads/main/public/img/game-preview.webp",
        engine: 'Three.js',
        content_rating: "Everyone",
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/battle-trap',
    },
    {
        name: `Plinko`,
        short_description: 'Mock Plinko game where you can redeem 10 plays a day for free, no real money involved. Join the scoreboard to compete with other users.',
        link: 'https://plinko.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        leaderboards: {
            local: true,
            online: true,
        },
        // multiplayer: false,
        single_player: true,
        // preview: true,
        // preview_true_button_text: 'This Month',
        // public: false,
        // image: `${process.env.NEXT_PUBLIC_CDN}games/Plinko/thumbnail.jpg`,
        image: "https://raw.githubusercontent.com/Articles-Joey/plinko/refs/heads/main/public/img/background.webp",
        engine: 'Three.js',
        content_rating: "Ages 12+",
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/plinko',
    },
    {
        name: 'Blackjack',
        short_description: 'Mock Blackjack game with joinable scoreboard. Acquire cards with a face value as close as possible to 21 without going over. No real money involved.',
        link: 'https://blackjack.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        leaderboards: {
            local: true,
            online: true,
        },
        // multiplayer: false,
        single_player: true,
        // preview: false,
        preview_true_button_text: '',
        // image: `${process.env.NEXT_PUBLIC_CDN}games/Blackjack/thumbnail.png`,
        image: "https://raw.githubusercontent.com/Articles-Joey/blackjack/refs/heads/main/public/img/game-preview.webp",
        engine: '',
        content_rating: "Ages 12+",
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/blackjack',
    },
    {
        name: 'Eager Eagle',
        short_description: 'Survive the longest amount of time while avoiding the obstacles.',
        link: 'https://eager-eagle.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        // multiplayer: false,
        single_player: true,
        gamepadSupport: true,
        // preview: true,
        // preview_true_button_text: 'Summer 2023',
        // image: ImageFlappy
        // image: `${process.env.NEXT_PUBLIC_CDN}games/Eager Eagle/eager-eagle-animated-css.svg`,
        image: "https://raw.githubusercontent.com/Articles-Joey/eager-eagle/refs/heads/main/public/img/preview.webp",
        inspo_image: `${process.env.NEXT_PUBLIC_CDN}games/Eager Eagle/flappy-bird-thumbnail.png`,
        engine: '',
        content_rating: "Everyone",
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/eager-eagle',
    },
    {
        name: 'Assets Gallery',
        short_description: 'Explore community assets in a virtual gallery.',
        link: 'https://assets-gallery.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        multiplayer: true,
        // multiplayer_tag: 'Open World',
        single_player: true,
        // preview: true,
        // preview_true_button_text: 'Winter 2023',
        // image: `${process.env.NEXT_PUBLIC_CDN}games/Assets Gallery/asset-gallery.jpg`,
        image: "https://raw.githubusercontent.com/Articles-Joey/assets-gallery/main/public/img/game-preview.gif",
        active_image: `https://raw.githubusercontent.com/Articles-Joey/assets-gallery/main/public/img/game-preview.gif`,
        engine: 'Three.js',
        content_rating: "Everyone",
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/assets-gallery',
    },
    {
        name: 'Tower Blocks',
        short_description: 'Stack the blocks to make the biggest tower.',
        link: 'https://tower-blocks.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        // multiplayer: false,
        single_player: true,
        preview: true,
        public: false,
        // preview_true_button_text: 'Summer 2023',
        // image: ImageTowerBlocks
        image: `${process.env.NEXT_PUBLIC_CDN}games/Tower Blocks/thumbnail.jpg`,
        engine: 'Three.js',
        content_rating: "Everyone",
        // github_repo: '',
    },
    {
        name: 'Ping Pong',
        short_description: 'Bounce the ping pong ball to score points.',
        link: 'https://ping-pong.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        // multiplayer: false,
        single_player: true,
        preview: true,
        public: false,
        // preview_true_button_text: 'January 2023',
        offline: true,
        offlineNote: 'Play offline but high scores will not be saved.',
        image: `${process.env.NEXT_PUBLIC_CDN}games/Ping Pong/Thumbnail.png`,
        engine: 'Three.js',
        content_rating: "Everyone",
        // github_repo: '',
    },
    {
        name: 'Glass Ceiling',
        short_description: 'See how close you can come to breaking the glass ceiling.',
        link: 'https://glass-ceiling.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        multiplayer: true,
        multiplayer_tag: '1+ Players',
        single_player: true,
        image: `${process.env.NEXT_PUBLIC_CDN}games/Glass Ceiling/preview.webp`,
        gamepadSupport: true,
        engine: 'Three.js',
        content_rating: "Ages 12+",
        amcot_character: true,
        github_public: false,
        github_repo: 'https://github.com/Articles-Joey/glass-ceiling',
    },
    {
        name: 'AMCOT MMO',
        short_description: 'Explore an experimental prototype community of tomorrow. Open world and open source, see what our cities could one day look like and the problems it will solve.',
        link: 'https://amcot.articles.media?redirect=mmo',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        single_player: true,
        single_player_flags: [
            "Always online single player"
        ],
        multiplayer: true,
        multiplayer_tag: 'Open World',
        // single_player: true,
        preview: true,
        preview_true_button_text: 'Beta 2027',
        image: `${process.env.NEXT_PUBLIC_CDN}games/Epcot/Random/thumbnail.jpg`,
        engine: 'AMCOT Spaces',
        content_rating: "Ages 17+",
        github_repo: 'https://github.com/Articles-Joey/amcot',
    },
    {
        name: 'AMCOT Spaces',
        short_description: 'Explore spaces and locations created with the engine that powers our MMO and city building game.',
        link: 'https://amcot.articles.media?redirect=spaces',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        single_player: true,
        single_player_flags: [
            "Always online single player"
        ],
        multiplayer: true,
        multiplayer_tag: 'Open World',
        // single_player: true,
        preview: true,
        preview_true_button_text: 'Beta 2027',
        // image: 'https://cdn.articles.media/games/Epcot/Spaces/66da9a044de5cdcd4178dce1/screenshot%202024-09-08%20052216.png',
        image: `${process.env.NEXT_PUBLIC_CDN}games/Epcot/Random/thumbnail-spaces.jpg`,
        engine: 'AMCOT Spaces',
        content_rating: "Ages 17+",
        github_repo: 'https://github.com/Articles-Joey/amcot',
    },
    {
        name: `Tic Tac Toe`,
        short_description: 'Simple Tic Tac Toe game that can be played with someone else locally, multiplayer is planned.',
        link: 'https://tic-tac-toe.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        // multiplayer: false,
        single_player: true,
        preview: true,
        preview_true_button_text: '',
        public: false,
        offline: true,
        offlineNote: 'Play offline with people on the same computer.',
        image: `${process.env.NEXT_PUBLIC_CDN}games/Tic Tac Toe/thumbnail.webp`,
        engine: '',
        content_rating: "Everyone",
        // github_repo: '',
    },
    // {
    //     name: `Socket Boilerplate`,
    //     short_description: 'Survive the longest amount of time while avoiding the obstacles.',
    //     link: ROUTES.EAGER_EAGLE,
    //     developer: 'ArticlesJoey',
    //     multiplayer: false,
    //     single_player: true,
    //     preview: false,
    //     preview_true_button_text: ''
    // },
    {
        name: `USA Tycoon`,
        short_description: 'Work your way to the top of the tax bracket in this USA themed tycoon game. Go from homeless to owning a beach front mansion!',
        link: 'https://usa-tycoon.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        multiplayer: true,
        single_player: true,
        gamepadSupport: true,
        single_player_flags: [
            "Always online single player"
        ],
        // preview: true,
        // preview_true_button_text: 'Summer 2026',
        // public: false,
        offline: true,
        offlineNote: 'Play offline on local save files.',
        image: `${process.env.NEXT_PUBLIC_CDN}games/USA Tycoon/preview.webp`,
        engine: 'Three.js',
        content_rating: "Ages 12+",
        amcot_character: true,
        github_public: false,
        github_repo: 'https://github.com/Articles-Joey/usa-tycoon',
    },
    {
        name: `Carousel of Progress`,
        short_description: `Experience Walt Disney's Carousel of Progress from your browser!`,
        link: 'https://carousel-of-progress.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        gamepadSupport: true,
        multiplayer: false,
        single_player: true,
        offline: true,
        offlineNote: 'Watch and explore offline.',
        image: `${process.env.NEXT_PUBLIC_CDN}games/Carousel of Progress/thumbnail.jpg`,
        engine: 'Three.js',
        content_rating: "Everyone",
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/carousel-of-progress',
    },
    {
        name: `Pinball`,
        short_description: 'Launch the ball into the game and score points by striking various targets. Use the flippers to prevent the ball from falling out of the game area.',
        link: 'https://pinball.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        // multiplayer: true,
        single_player: true,
        // preview: true,
        // preview_true_button_text: '',
        // public: false,
        offline: true,
        offlineNote: 'Play offline.',
        image: `https://raw.githubusercontent.com/Articles-Joey/pinball/main/public/img/game-preview.gif`,
        engine: 'Three.js',
        content_rating: "Everyone",
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/pinball',
    },
    {
        name: `Ocean Rings`,
        short_description: 'Swim through the most rings before the game is over while avoiding obstacles.',
        link: 'https://ocean-rings.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        multiplayer: false,
        single_player: true,
        // preview: true,
        // preview_true_button_text: '',
        // public: false,
        // offline: true,
        // offlineNote: 'Play offline.',
        image: `${process.env.NEXT_PUBLIC_CDN}games/Ocean Rings/video-preview.gif`,
        inspo_image: `${process.env.NEXT_PUBLIC_CDN}games/Ocean Rings/old-thumbnail.jpg`,
        welcome: {
            preview_gif: `${process.env.NEXT_PUBLIC_CDN}games/Ocean+Rings/preview.gif`,
            preview_text: 'Ocean Rings is a simple game. Swim through all the rings that match your color.'
        },
        engine: 'Three.js',
        content_rating: "Everyone",
        amcot_character: true,
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/ocean-rings',
    },
    {
        name: `Maze`,
        short_description: 'Collect the most coins inside the maze while avoiding the enemies.',
        link: 'https://maze.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        multiplayer: true,
        single_player: true,
        preview: true,
        preview_true_button_text: 'Summer 2026',
        // public: false,
        // offline: true,
        // offlineNote: 'Play offline.',
        image: `${process.env.NEXT_PUBLIC_CDN}games/Maze/background.webp`,
        engine: 'Three.js',
        content_rating: "Everyone",
        amcot_character: true,
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/maze',
    },
    {
        name: `School Run`,
        short_description: 'Escape the tagger and avoid tripping over your sleeping classmates!',
        link: 'https://school-run.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        leaderboards: {
            local: true,
            online: true,
        },
        // multiplayer: true,
        single_player: true,
        // single_player_flags: [
        //     "Online Leaderboards"
        // ],
        // preview: true,
        // preview_true_button_text: '',
        // public: false,
        // offline: true,
        // offlineNote: 'Play offline.',
        image: `${process.env.NEXT_PUBLIC_CDN}games/School Run/preview.webp`,
        engine: 'Three.js',
        content_rating: "Ages 17+",
        amcot_character: true,
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/school-run',
    },
    {
        name: `Move Match`,
        short_description: 'The objective is to repeat moves demonstrated by the NPC as fast as possible in the correct order by using the corresponding keys or buttons.',
        link: 'https://move-match.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        multiplayer: true,
        single_player: true,
        // preview: true,
        // preview_true_button_text: 'Summer 2026',
        // public: false,
        // offline: true,
        // offlineNote: 'Play offline.',
        image: `https://raw.githubusercontent.com/Articles-Joey/move-match/refs/heads/main/public/img/preview.webp`,
        inspo_image: `${process.env.NEXT_PUBLIC_CDN}games/Move Match/old-thumbnail.jpg`,
        engine: 'Three.js',
        content_rating: "Everyone",
        amcot_character: true,
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/move-match',
    },
    {
        name: `Cannon`,
        short_description: 'The objective is to land a character inside the water tower as soon as possible within the time limit.',
        link: 'https://cannon.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        multiplayer: true,
        multiplayer_tag: '1-4 Players',
        single_player: true,
        // public: false,
        // offline: true,
        // offlineNote: 'Play offline.',
        image: `${process.env.NEXT_PUBLIC_CDN}games/Cannon/cannon-thumbnail.jpg`,
        inspo_image: `${process.env.NEXT_PUBLIC_CDN}games/Cannon/thumbnail.jpg`,
        engine: 'Three.js',
        content_rating: "Everyone",
        amcot_character: true,
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/cannon',
    },
    {
        name: `Gamepad Test`,
        short_description: 'Simple page to test gamepad API.',
        link: 'https://gamepad.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        // multiplayer: true,
        single_player: true,
        preview: true,
        preview_true_button_text: 'Test',
        public: false,
        // offline: true,
        // offlineNote: 'Play offline.',
        image: `${process.env.NEXT_PUBLIC_CDN}games/Gamepad Test/thumbnail.jpg`,
        // github_repo: '',
    },
    {
        name: `Death Race`,
        short_description: 'Make it to the finish line while avoiding detection. If you see any suspicious NPCs that you might think are players then use your bullet to take them out.',
        link: 'https://death-race.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        multiplayer: true,
        multiplayer_tag: '2-8 Players',
        // single_player: true,
        // preview: true,
        // preview_true_button_text: '',
        // public: false,
        // offline: true,
        // offlineNote: 'Play offline.',
        image: `${process.env.NEXT_PUBLIC_CDN}games/Death Race/death-race-thumbnail.jpg`,
        inspo_image: `${process.env.NEXT_PUBLIC_CDN}games/Death Race/old-thumbnail.jpg`,
        welcome: {
            preview_gif: `${process.env.NEXT_PUBLIC_CDN}games/Death Race/preview.jpg`,
            preview_text: 'Get to the other side of the board without outing yourself as a player. All characters move randomly and all players only get one shot to take out a character.'
        },
        engine: 'Three.js',
        content_rating: "Ages 12+",
        amcot_character: true,
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/death-race',
    },
    {
        name: `Tag`,
        short_description: 'Tag the other players if you are it and avoid being tagged!',
        link: 'https://tag.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        multiplayer: true,
        // single_player: true,
        // public: false,
        // offline: true,
        // offlineNote: 'Play offline.',
        image: `https://raw.githubusercontent.com/Articles-Joey/tag/refs/heads/main/public/img/preview.webp`,
        engine: 'Three.js',
        content_rating: "Everyone",
        amcot_character: true,
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/tag',
        carousel: {
            // default_position_weight: 1,
            card: {
                backgroundColor: '#116406',
            }
        }
    },
    {
        name: `Fog City`,
        short_description: 'Simple demo of a procedural foggy city.',
        link: 'https://fog-city.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        // multiplayer: true,
        single_player: true,
        preview: true,
        preview_true_button_text: 'Test',
        public: false,
        // offline: true,
        // offlineNote: 'Play offline.',
        image: `${process.env.NEXT_PUBLIC_CDN}games/Fog City/thumbnail.jpg`,
        // github_repo: '',
    },
    {
        name: `Ice Slide`,
        short_description: 'Get your puck as close to the goal as possible. Avoid falling off the board and being knocked off by other players.',
        link: 'https://ice-slide.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        multiplayer: true,
        single_player: true,
        // public: false,
        // offline: true,
        // offlineNote: 'Play offline.',
        engine: 'Three.js',
        image: `${process.env.NEXT_PUBLIC_CDN}games/Ice Slide/ice-slide-thumbnail.jpg`,
        inspo_image: `${process.env.NEXT_PUBLIC_CDN}games/Ice Slide/thumbnail.jpg`,
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/ice-slide',
    },
    {
        name: `8 Ball Pool`,
        short_description: 'Play pool with friends at various AMCOT locations with your character.',
        link: 'https://8-ball-pool.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        multiplayer: true,
        single_player: true,
        engine: 'Three.js',
        // public: false,
        // offline: true,
        // offlineNote: 'Play offline.',
        // image: `${process.env.NEXT_PUBLIC_CDN}games/8 Ball Pool/8-ball-pool-thumbnail.jpg`,
        image: "https://raw.githubusercontent.com/Articles-Joey/8-ball-pool/refs/heads/main/public/img/game-preview.webp",
        amcot_character: true,
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/8-ball-pool',
    },
    {
        name: `Slingshot`,
        short_description: 'Launch yourself in the canyon and try to land on a target.',
        link: 'https://slingshot.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        multiplayer: true,
        single_player: true,
        preview: true,
        preview_true_button_text: 'Fall 2026',
        // public: false,
        // offline: true,
        // offlineNote: 'Play offline.',
        image: `${process.env.NEXT_PUBLIC_CDN}games/Slingshot/thumbnail.jpg`,
        engine: 'Three.js',
        content_rating: "Everyone",
        amcot_character: true,
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/slingshot',
    },
    {
        name: `FPS Example`,
        short_description: 'Random FPS test arena.',
        link: 'https://fps-example.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        multiplayer: true,
        single_player: true,
        preview: true,
        preview_true_button_text: 'Test',
        public: false,
        // offline: true,
        // offlineNote: 'Play offline.',
        image: `${process.env.NEXT_PUBLIC_CDN}games/FPS Example/thumbnail.jpg`,
        // github_repo: '',
    },
    {
        name: `Terrain Example`,
        short_description: 'Demo for generating terrain with Three.js',
        link: 'https://terrain-example.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        multiplayer: true,
        single_player: true,
        preview: true,
        preview_true_button_text: 'Test',
        public: false,
        // offline: true,
        // offlineNote: 'Play offline.',
        // image: ImageFpsExample,
        // github_repo: '',
    },
    {
        name: `Synthwave Example`,
        short_description: 'Testing of procedural synthwave landscape.',
        link: 'https://synthwave-example.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        multiplayer: true,
        single_player: true,
        preview: true,
        preview_true_button_text: 'Test',
        public: false,
        // offline: true,
        // offlineNote: 'Play offline.',
        // image: ImageFpsExample,
        // github_repo: '',
    },
    {
        name: `Parkour`,
        short_description: 'Complete various obstacle courses. Overcome the various obstacles like disappearing platforms, rope swings, swinging wrecking balls, balancing beams, and much more!',
        link: 'https://parkour.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        // multiplayer: true,
        // multiplayer: false,
        single_player: true,
        // public: false,
        // offline: true,
        // offlineNote: 'Play offline.',
        image: `${process.env.NEXT_PUBLIC_CDN}games/Parkour/parkour-thumbnail.png`,
        inspo_image: `${process.env.NEXT_PUBLIC_CDN}games/Parkour/thumbnail.jpg`,
        engine: 'Three.js',
        content_rating: "Everyone",
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/parkour',
    },
    {
        name: `Tug of War`,
        short_description: `Alternately tap the left and right arrow keys just fast enough to line up the green bar with the red line. Don't tap them too slow or too fast, or you'll end up in the water!`,
        link: 'https://tug-of-war.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        // multiplayer: true,
        multiplayer: false,
        single_player: true,
        // public: false,
        // offline: true,
        // offlineNote: 'Play offline.',
        image: `${process.env.NEXT_PUBLIC_CDN}games/Tug of War/tug-of-war-thumbnail.png`,
        inspo_image: `${process.env.NEXT_PUBLIC_CDN}games/Tug of War/tug-of-war-toontown-thumbnail.webp`,
        engine: 'Three.js',
        content_rating: "Everyone",
        amcot_character: true,
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/tug-of-war',
    },
    {
        name: `Platformer Escape`,
        short_description: `Escape as fast as you can! Collect starts as you escaple to gain even more points`,
        link: 'https://platformer-escape.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        // multiplayer: true,
        // multiplayer: false,
        single_player: true,
        // preview: true,
        // preview_true_button_text: 'Summer 2026',
        // public: false,
        // offline: true,
        // offlineNote: 'Play offline.',
        image: `${process.env.NEXT_PUBLIC_CDN}games/Platformer Escape/preview.webp`,
        engine: 'Three.js',
        content_rating: "Everyone",
        amcot_character: true,
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/platformer-escape',
    },
    {
        name: `Jungle Vines`,
        short_description: ``,
        link: 'https://jungle-vines.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        // multiplayer: true,
        multiplayer: false,
        multiplayer_tag: 'Coming Summer 2026',
        single_player: true,
        // preview: true,
        // preview_true_button_text: 'Summer 2026',
        // public: false,
        // offline: true,
        // offlineNote: 'Play offline.',
        image: `${process.env.NEXT_PUBLIC_CDN}games/Jungle Vines/preview.webp`,
        engine: 'Three.js',
        content_rating: "Everyone",
        amcot_character: true,
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/jungle-vines',
    },
    {
        name: `Treasure Dive`,
        short_description: `Treasures will appear at the bottom of the lake. Use the arrow keys to swim. Avoid the fish and get the treasures up to the boat!`,
        link: 'https://treasure-dive.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        multiplayer: false,
        single_player: true,
        image: `${process.env.NEXT_PUBLIC_CDN}games/Treasure Dive/treasure-dive-thumbnail.png`,
        inspo_image: `${process.env.NEXT_PUBLIC_CDN}games/Treasure Dive/treasure-dive-toontown-thumbnail.webp`,
        engine: 'Three.js',
        content_rating: "Everyone",
        amcot_character: true,
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/treasure-dive',
    },
    {
        name: `Memory Game`,
        short_description: `The objective is to match all cards in as few flips as possible. A player must flip the cards over to reveal an image and find a matching card hidden somewhere on the board. When playing alone, the player can flip two cards at one time. When playing with other players, each player may only flip one card at one time.`,
        link: 'https://memory-game.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        multiplayer: true,
        single_player: true,
        // image: `${process.env.NEXT_PUBLIC_CDN}games/Memory Game/memory-game-thumbnail.png`,
        image: "https://raw.githubusercontent.com/Articles-Joey/memory-game/refs/heads/main/public/img/preview.webp",
        inspo_image: `${process.env.NEXT_PUBLIC_CDN}games/Memory Game/memory-game-toontown-thumbnail.webp`,
        engine: 'Three.js',
        content_rating: "Everyone",
        amcot_character: true,
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/memory-game',
    },
    {
        name: `Catching Game`,
        short_description: `Catch as many fruits as you can. Watch out for the enemies, and try not to 'catch' any anvils!`,
        link: 'https://catching-game.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        multiplayer: true,
        single_player: true,
        // image: `${process.env.NEXT_PUBLIC_CDN}games/Catching Game/catching-game-thumbnail.png`,
        image: "https://raw.githubusercontent.com/Articles-Joey/catching-game/refs/heads/main/public/img/preview.webp",
        inspo_image: `${process.env.NEXT_PUBLIC_CDN}games/Catching Game/catching-game-toontown-thumbnail.webp`,
        engine: 'Three.js',
        content_rating: "Everyone",
        amcot_character: true,
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/catching-game',
    },
    {
        name: `Stop the Thieves`,
        short_description: `Prevent the thieves from taking all your valuables`,
        link: 'https://stop-the-thieves.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        multiplayer: true,
        single_player: true,
        image: `${process.env.NEXT_PUBLIC_CDN}games/Stop the Thiefs/preview.webp`,
        engine: 'Three.js',
        content_rating: "Everyone",
        amcot_character: true,
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/stop-the-thiefs',
    },
    {
        name: `Assassin`,
        short_description: `Pick from two teams, shooters and assassins. The shooters must find the assassins and stop them from eliminating the crowd of NPCs. The assassins must blend into the crowd and eliminate them while staying undetected.`,
        link: 'https://assassin.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        multiplayer: true,
        // multiplayer: false,
        // single_player: true,
        image: `https://raw.githubusercontent.com/Articles-Joey/assassin/refs/heads/main/public/img/preview.webp`,
        engine: 'Three.js',
        content_rating: "Everyone",
        amcot_character: true,
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/assassin',
    },
    {
        name: `Trash Chute`,
        short_description: `Make it to the top of the trash chute while avoiding the falling bits of trash. Watch out because these obstacles will move you back!`,
        link: 'https://trash-chute.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        multiplayer: false,
        single_player: true,
        image: `${process.env.NEXT_PUBLIC_CDN}games/Trash Chute/trash-chute-preview.webp`,
        engine: 'Three.js',
        content_rating: "Everyone",
        amcot_character: true,
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/trash-chute',
    },
    {
        name: `Spleef`,
        short_description: `Last the longest amount of time by moving around on the hexagon tiles. Tiles will disappear from under you 1 second after being touched.`,
        link: 'https://spleef.articles.media',
        developer: 'ArticlesJoey',
        developers: [
            {
                name: 'ArticlesJoey',
                user_id: '5e90cc96579a17440c5d7d52'
            }
        ],
        publisher: 'Articles Media',
        multiplayer: true,
        single_player: true,
        // image: `${process.env.NEXT_PUBLIC_CDN}games/Spleef/spleef-thumbnail.png`,
        image: "https://raw.githubusercontent.com/Articles-Joey/spleef/refs/heads/main/public/img/background.webp",
        engine: 'Three.js',
        content_rating: "Everyone",
        amcot_character: true,
        github_public: true,
        github_repo: 'https://github.com/Articles-Joey/spleef',
    },
]

export default games