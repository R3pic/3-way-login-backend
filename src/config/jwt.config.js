const accessTokenConfig = {
    expiresIn: "1m",
    issuer: "R3"
};

const refreshTokenConfig = {
    expiresIn: "1h",
    issuer: "R3"
};

export const JWTConfig = {
    accessTokenConfig,
    refreshTokenConfig,
}