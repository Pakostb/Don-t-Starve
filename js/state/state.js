function helloState() {
    console.log("📊 Game State ready");
}

// Initial game state setup
window.GameState = {
    // Игровые флаги
    gameActive: true,

    // Данные игрока
    player: {
        x: 400,
        y: 500,
        hp: 100,
        hunger: 100,
        wood: 0,
        targetX: null,
        targetY: null
    },

    // Мир
    world: {
        trees: [],
        berries: [],
        width: GameConfig.WORLD_WIDTH,
        height: GameConfig.WORLD_HEIGHT
    },

    day: 1,
    dayTimer: 0,
    spawnTimer: 0,
    enemies: [],

    // Инициализация состояния
    init: function() {
        this.reset();
    },

    // Генерация мира
    generateWorld: function() {
        this.world.trees = [];
        this.world.berries = [];

        // Генерация деревьев кластерами
        const treeClusters = 12;
        for (let c = 0; c < treeClusters; c++) {
            const centerX = 200 + Math.random() * (GameConfig.WORLD_WIDTH - 400);
            const centerY = 150 + Math.random() * (GameConfig.WORLD_HEIGHT - 300);
            const clusterSize = 4 + Math.floor(Math.random() * 6);

            for (let i = 0; i < clusterSize; i++) {
                const angle = Math.random() * Math.PI * 2;
                const radius = 40 + Math.random() * 70;
                this.world.trees.push({
                    x: Math.max(50, Math.min(GameConfig.WORLD_WIDTH - 50, centerX + Math.cos(angle) * radius)),
                    y: Math.max(50, Math.min(GameConfig.WORLD_HEIGHT - 50, centerY + Math.sin(angle) * radius)),
                    wood: 12 + Math.floor(Math.random() * 10)
                });
            }
        }

        // Генерация ягод
        const berryClusters = 8;
        for (let c = 0; c < berryClusters; c++) {
            const centerX = 150 + Math.random() * (GameConfig.WORLD_WIDTH - 300);
            const centerY = 100 + Math.random() * (GameConfig.WORLD_HEIGHT - 200);
            const clusterSize = 3 + Math.floor(Math.random() * 4);

            for (let i = 0; i < clusterSize; i++) {
                const angle = Math.random() * Math.PI * 2;
                const radius = 30 + Math.random() * 50;
                this.world.berries.push({
                    x: Math.max(40, Math.min(GameConfig.WORLD_WIDTH - 40, centerX + Math.cos(angle) * radius)),
                    y: Math.max(40, Math.min(GameConfig.WORLD_HEIGHT - 40, centerY + Math.sin(angle) * radius)),
                    count: 6 + Math.floor(Math.random() * 8)
                });
            }
        }
    },

    reset: function() {
        this.gameActive = true;
        this.player = {
            x: GameConfig.WORLD_WIDTH / 2,
            y: GameConfig.WORLD_HEIGHT / 2,
            hp: 100,
            hunger: 100,
            wood: 0,
            targetX: null,
            targetY: null
        };
        this.day = 1;
        this.dayTimer = 0;
        this.spawnTimer = 0;
        this.generateWorld();
        this.enemies = [];

        // Создаем начальных врагов
        for (let i = 0; i < 6; i++) {
            this.spawnEnemy();
        }
    },

    // Установка цели движения
    setPlayerTarget: function(x, y) {
        if (this.gameActive) {
            this.player.targetX = Math.max(30, Math.min(770, x));
            this.player.targetY = Math.max(50, Math.min(540, y));
        }
    },

    // Движение игрока
    movePlayer: function(delta, speed = 180) {
        if (!this.gameActive || this.player.targetX === null) return;

        let dx = this.player.targetX - this.player.x;
        let dy = this.player.targetY - this.player.y;
        let dist = Math.hypot(dx, dy);

        if (dist < 5) {
            this.player.targetX = null;
            return;
        }

        let move = speed * delta;
        this.player.x += (dx / dist) * move;
        this.player.y += (dy / dist) * move;

        this.player.x = Math.max(30, Math.min(770, this.player.x));
        this.player.y = Math.max(50, Math.min(540, this.player.y));
    },

    // Добавление древесины
    addWood: function(amount) {
        this.player.wood += amount;
    },

    // Восстановление голода
    addHunger: function(amount) {
        this.player.hunger = Math.min(100, this.player.hunger + amount);
    },

    // Урон игроку
    damagePlayer: function(amount) {
        this.player.hp -= amount;
        if (window.SoundManager) {
            SoundManager.play('hit_player');
        }
        if (this.player.hp <= 0) {
            this.gameActive = false;
        }
    },

    // Лечение игрока
    healPlayer: function(amount) {
        this.player.hp = Math.min(100, this.player.hp + amount);
    },

    // Следующий день
    nextDay: function() {
        this.day++;
        this.healPlayer(5);
        this.addHunger(8);
        if (window.SoundManager) {
            SoundManager.play('day_change');
        }
        console.log(`🌞 Day ${this.day}`);
    },

    // Удаление дерева
    removeTree: function(index) {
        this.world.trees.splice(index, 1);
    },

    // Удаление ягод
    removeBerry: function(index) {
        this.world.berries.splice(index, 1);
    },

    // Получение деревьев
    getTrees: function() {
        return this.world.trees;
    },

    // Получение ягод
    getBerries: function() {
        return this.world.berries;
    },

    // Получение состояния
    getState: function() {
        return {
            gameActive: this.gameActive,
            player: { ...this.player },
            trees: [...this.world.trees],
            berries: [...this.world.berries],
            day: this.day
        };
    },

    // Спавн врагов
    spawnEnemy: function() {
        const enemyTypes = ['patrol', 'guard', 'wander'];
        const type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];

        let x, y;
        let attempts = 0;
        do {
            x = 100 + Math.random() * (GameConfig.WORLD_WIDTH - 200);
            y = 100 + Math.random() * (GameConfig.WORLD_HEIGHT - 200);
            attempts++;
            if (attempts > 50) break;
        } while (Math.hypot(x - this.player.x, y - this.player.y) < 300);

        const enemy = {
            id: Date.now() + Math.random(),
            x: x,
            y: y,
            hp: GameBalance.ENEMY_BASE_HP + Math.floor(Math.random() * 20),
            maxHp: GameBalance.ENEMY_BASE_HP + Math.floor(Math.random() * 20),
            type: type,
            behavior: this.createEnemyBehavior(type, x, y)
        };

        this.enemies.push(enemy);
        console.log(`👾 ${type} enemy spawned at (${Math.floor(x)},${Math.floor(y)})`);
        return enemy;
    }
};

helloState();
