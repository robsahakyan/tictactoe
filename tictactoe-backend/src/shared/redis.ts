import redisConnection from './redisConnection';

export const setBoardInRedis =  async (data: any) => {
    return await redisConnection.set('board', JSON.stringify(data));
}

export const getBoardData = async () => {
    return JSON.parse(await redisConnection.get('board')  || "{}")
}

export const clearRedisCache = async () => {
    return await redisConnection.del('board')
}
