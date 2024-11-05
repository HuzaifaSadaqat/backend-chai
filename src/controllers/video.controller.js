import mongoose, { isValidObjectId } from "mongoose"
import { Video } from "../models/video.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    // const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination

    res.satus(200)
})

// TODO: get video, upload to cloudinary, create video
// get video 
// send by multer
// upload on cloudinary
// get link 
// upload in db
// returb
const publishAVideo = asyncHandler(async (req, res) => {
    res
        .satus(200)
         
    // const { title, description } = req.body
    // if ([title, description].some((field) => field?.trim() === "")) {
    //     throw new ApiError(400, "All fields are required")
    // }
    // console.log(req.files);

    // const videoLocalPath = req.files?.video[0].path;
    // const thumbnailLocalPath = req.files?.thumbnail[0].path;

    // if (!videoLocalPath || !thumbnailLocalPath) {
    //     throw new ApiError(400, "Video and thumbnail are required")
    // }

    // const videoFile = await uploadOnCloudinary(videoLocalPath)
    // const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    // if (!videoFile || !coverImg) {
    //     throw new ApiError(400, "Video or thumbnail is not uploaded")
    // }

    // const video = await Video.create({
    //     title,
    //     description,
    //     videoFile: videoFile.url,
    //     thumbnail: thumbnail.url,
    //     duration: thumbnail.duration,
    // })

    // res
    //     .satus(200)
    //     .json(
    //         new ApiResponse(200, { video }, "Video uploaded successfully")
    //     )
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}