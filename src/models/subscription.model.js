import e from "express";
import mongoose, { Schema, SchemaType } from "mongoose";

const subscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId, //subscribing user
        ref: "User"
    },
    channel: {
        type: Schema.Types.ObjectId, //subscribed user(channel)
        ref: "User"
    }
}, { timestamps: true })

export const Subscription = mongoose.model("Subscription", subscriptionSchema)