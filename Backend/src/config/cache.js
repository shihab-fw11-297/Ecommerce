const redis = require("redis");
let redisClient;

// Redis connection
(async () => {
    redisClient = redis.createClient({
        url: process.env.REDISURI
    });
    redisClient.on('error', (error) => console.log('redis error' + error));
    await redisClient.connect();
})();

const deleteCache = async (pattern) => {
    redisClient.del(pattern);
    const keys_arr = await redisClient.keys(pattern);

    if (keys_arr) {
        for (let i = 0; i < keys_arr.length; i++) {
            redisClient.del(keys_arr[i]);
        }
    }
}

const storeCache = async (pattern, data) => {
    await redisClient.set(pattern, JSON.stringify(data), {
        EX: 1800,
        NX: true
    });
}

const storeListCache = async (pattern, result, count) => {
    await redisClient.set(pattern, JSON.stringify({ result: result, count: count }), {
        EX: 1800,
        NX: true
    });
}

const findCacheData = async (pattern) => {
    const cachedData = await redisClient.get(pattern);
    return cachedData
}

module.exports = { redisClient, deleteCache, storeCache, findCacheData, storeListCache }