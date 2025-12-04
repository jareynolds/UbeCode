/**
 * Game Configuration
 * Central configuration for the Stick Figure Fighting Game
 */
window.GameConfig = {
    // Canvas dimensions
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 400,
    
    // Game states
    GAME_STATES: {
        MENU: 'menu',
        PLAYER_SELECTION: 'player_selection',
        CHARACTER_CREATION: 'character_creation',
        GAME_INITIALIZATION: 'game_initialization',
        PLAYING: 'playing',
        PAUSED: 'paused',
        GAME_OVER: 'game_over'
    },
    
    // Player configuration
    PLAYER_CONFIG: {
        MAX_HEALTH: 100,
        MIN_HEALTH: 0,
        STARTING_HEALTH: 100,
        PLAYER_COUNT: 2
    },
    
    // Combat configuration
    COMBAT_CONFIG: {
        BASE_DAMAGE: 20,
        CRITICAL_MULTIPLIER: 1.5,
        DEFENSE_REDUCTION: 0.5,
        ATTACK_COOLDOWN: 500, // ms
        HIT_DETECTION_RANGE: 50
    },
    
    // Animation configuration
    ANIMATION_CONFIG: {
        TARGET_FPS: 60,
        FRAME_TIME: 1000 / 60,
        ANIMATION_DURATION: 300,
        TRANSITION_DURATION: 200
    },
    
    // Rendering configuration
    RENDERING_CONFIG: {
        STICK_FIGURE_HEIGHT: 120,
        STICK_FIGURE_WIDTH: 60,
        HEAD_RADIUS: 20,
        BODY_LENGTH: 60,
        ARM_LENGTH: 40,
        LEG_LENGTH: 50,
        LINE_WIDTH: 4
    },
    
    // Arena configuration
    ARENA_CONFIG: {
        GROUND_HEIGHT: 50,
        BACKGROUND_COLOR: '#87CEEB',
        GROUND_COLOR: '#8FBC8F',
        PLAYER1_START_X: 150,
        PLAYER2_START_X: 650,
        PLAYER_START_Y: 300
    },
    
    // Input configuration
    INPUT_CONFIG: {
        PLAYER1_CONTROLS: {
            ATTACK: 'KeyA',
            DEFEND: 'KeyS',
            MOVE_LEFT: 'ArrowLeft',
            MOVE_RIGHT: 'ArrowRight'
        },
        PLAYER2_CONTROLS: {
            ATTACK: 'KeyL',
            DEFEND: 'KeyK',
            MOVE_LEFT: 'KeyJ',
            MOVE_RIGHT: 'Semicolon'
        }
    },
    
    // Character customization defaults
    CHARACTER_DEFAULTS: {
        HEAD_COLOR: '#FFE4C4',
        BODY_COLOR: '#000000',
        ARM_COLOR: '#FFE4C4',
        LEG_COLOR: '#000000',
        HEAD_SIZE: 1.0,
        BODY_SIZE: 1.0,
        ARM_SIZE: 1.0,
        LEG_SIZE: 1.0
    },
    
    // Performance settings
    PERFORMANCE_CONFIG: {
        MAX_PARTICLES: 50,
        PARTICLE_LIFETIME: 1000,
        EFFECT_QUALITY: 'high'
    },
    
    // Error handling
    ERROR_CONFIG: {
        MAX_RETRIES: 3,
        RETRY_DELAY: 1000,
        FALLBACK_STATE: 'menu'
    }
};