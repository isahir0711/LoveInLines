export interface CallbackRequest{
    uri:string
}

export interface AuthResponse{
    token:string,
    refreshToken:string,
    expiresAt:Date
}