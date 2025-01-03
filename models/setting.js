import database from "../config/database.js";

export const getSetting = async () => {
    const result = await database("settings").select("*").first();
    return result.premium_extension_minutes;
}

export const updateSetting = async (premium_time) => {
    const interval = `${premium_time} minutes`;

    // Cập nhật giá trị trong PostgreSQL
    await database("settings").update({ premium_extension_minutes: database.raw(`?::interval`, [interval]) }).where({ id: 1 });
}