export interface UploadImage{
    imageBase64:string,
    imageName:string,
    imageType:string
}

export interface DrawingServerResponse{
    drawingURL:string,
    totalLikes:number,
    userProfilePic:string,
}