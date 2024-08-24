import apiRequest from "./apiRequest"
import { defer } from "react-router-dom"
export const singlePageloader = async ({request, params}) => {
    const res = await apiRequest("/post/"+ params.id)
    return res.data;
}

export const listPageloader = async ({request, params}) => {

    // const res = await apiRequest("/post/"+ params.id)
    // return res.data;
    console.log(request)
    const query = request.url.split("?")[1]

    const res =  await apiRequest("/post?" + query)
    return res
    // const postPromise =  apiRequest("/post?" + query)
    // return defer({
    //     postResponse: postPromise
    // })

}

export const profilePageloader = async () => {

    const posts =  await apiRequest("/users/profilePosts")
    const chats =  await apiRequest("/chats")

    return { posts,chats }

}