import database from "../config/database.js";
import { getUserByEmail } from './user.js';

export const findOrCreateUser = async (profile) => {
    let socialUser = await database("social_networks")
        .where({
            provider: profile.provider,
            social_id: profile.social_id
        })
        .first();

    if (socialUser) {
        let user = await database("users")
            .where({ id: socialUser.user_id })
            .first();
        return user;
    } else {
        let user = await getUserByEmail(profile.email);
        if (user) {
            await database("social_networks").insert({
                user_id: user.id,
                provider: profile.provider,
                social_id: profile.social_id
            });
            return user;
        }
        else {
            const newUser = {
                email: profile.email,
                fullname: profile.fullname,
                username: profile.username || profile.email.split('@')[0],
                password: "",
                role: "subscriber"
            };
            const createdUserId = await database("users").insert(newUser, 'id');
            const id = createdUserId[0].id;
            await database("social_networks").insert({
                user_id: id,
                provider: profile.provider,
                social_id: profile.social_id
            });
            const createdUser = await database("users").where({ id: id }).first();
            return createdUser;
        }
    }
};

export const getSocialNetworkByUserId = async (userId) => {
    const result = await database("social_networks")
        .where("user_id", userId)
        .first();
    return result;
};