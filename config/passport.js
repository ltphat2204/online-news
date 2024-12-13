import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import GitHubStrategy from 'passport-github2';
import FacebookStrategy from 'passport-facebook';
import { findOrCreateUser } from '../models/social_network.js';
import { getUserById } from '../models/user.js';

const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET,
} = process.env;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    (accessToken, refreshToken, profile, cb) => { //Removed async from here
        const user = {
            social_id: profile.id,
            provider: 'google',
            email: profile.emails[0].value,
            fullname: profile.displayName,
            username: profile.displayName,
        };
        
        findOrCreateUser(user)
        .then(dbUser => {
            return cb(null, dbUser);
        })
        .catch(err => {
            return cb(err);
        })
    }
));

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback",
    scope: ['user:email']
},
    (accessToken, refreshToken, profile, cb) => { //Removed async from here
        const user = {
            social_id: profile.id,
            provider: 'github',
            email: profile.emails[0].value,
            fullname: profile.displayName,
            username: profile.displayName,
        };
        
        findOrCreateUser(user)
        .then(dbUser => {
            return cb(null, dbUser);
        })
        .catch(err => {
            return cb(err);
        })
    }
));

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'email']
},
    (accessToken, refreshToken, profile, cb) => { //Removed async from here
        const user = {
            social_id: profile.id,
            provider: 'facebook',
            email: profile.emails[0].value,
            fullname: profile.displayName,
            username: profile.displayName,
        };
        
        findOrCreateUser(user)
        .then(dbUser => {
            return cb(null, dbUser);
        })
        .catch(err => {
            return cb(err);
        })
    }
));

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
    const user = await getUserById(id);
    cb(null, user);
});

export default passport;