import mongoose, { isValidObjectId } from "mongoose"
import { Video } from "../models/video.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
})

const publishAVideo = asyncHandler(async (req, res) => {
    // TODO: get video, upload to cloudinary, create video 

    const { title, description } = req.body
    if ([title, description].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const videoLocalPath = req.files?.videoFile[0].path;
    const thumbnailLocalPath = req.files?.thumbnail[0].path;

    if (!videoLocalPath || !thumbnailLocalPath) {
        throw new ApiError(400, "Video and thumbnail are required")
    }

    const videoFile = await uploadOnCloudinary(videoLocalPath)
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    if (!videoFile || !thumbnail) {
        throw new ApiError(400, "Video or thumbnail is not uploaded")
    }

    const video = await Video.create({
        title,
        description,
        videoFile: videoFile.url,
        thumbnail: thumbnail.url,
        duration: videoFile.duration,
        owner: req.user._id
    })

    res
        .status(201)
        .json(
            new ApiResponse(200, { video }, "Video uploaded successfully")
        )
})

//TODO: get video by id
const getVideoById = asyncHandler(async (req, res) => {

    const { videoId } = req.params
    if (!videoId?.trim()) {
        throw new ApiError(400, "Video id is missing")
    }

    const video = await Video.findById(videoId)
    if (!video) {
        throw new ApiError(400, "Video was not found in DB")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, { video }, "Video fetched successfully")
        )

})

//TODO: update video details like title, description, thumbnail
const updateVideo = asyncHandler(async (req, res) => {

    const { videoId } = req.params
    if (!videoId) {
        throw new ApiError(400, "No video id was found")
    }

    const { title, description, thumbnail } = req.body
    if ([title, description].some((field => field?.trim() === ""))) {
        throw new ApiError(400, "All files are required")
    }

    const thumbnailLocalPath = req.file?.path
    if (!thumbnailLocalPath) {
        throw new ApiError(400, "Thumbnail is required")
    }

    const thumbnailUrl = await uploadOnCloudinary(thumbnailLocalPath)
    if (!thumbnailUrl) {
        throw new ApiError(400, "Thumbnail was not uploaded")
    }


    const video = await Video.findByIdAndUpdate(
        videoId,
        {
            $set: {
                title,
                description,
                thumbnail: thumbnailUrl.url
            }
        },
        { new: true }
    )

    return res
        .status(200)
        .json(
            new ApiResponse(200, { video }, "Video updated successfully")
        )
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