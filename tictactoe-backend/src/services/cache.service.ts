import {createClient} from 'redis';

export class CacheService {
    private readonly redisClient: any;

    constructor(redisClient: any) {
        this.redisClient = redisClient;

        redisClient.on('error', (err: any) => {
            console.log(err);
        });
        redisClient.on('connect', function() {
            console.log('Connected!');
        });
        redisClient.connect();
    }

    get boardKey() {
        return 'board';
    }

    async setBoard(data: any) {
        return this.redisClient.set(this.boardKey, JSON.stringify(data));
    }

    async getBoard() {
        return JSON.parse(await this.redisClient.get(this.boardKey)  || "{}")
    }

    async clear() {
        return this.redisClient.del(this.boardKey)
    }
}

export const cacheService = new CacheService(createClient());
