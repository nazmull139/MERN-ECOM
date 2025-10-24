import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';


export const reviewApi = createApi({
    reducerPath: 'reviewApi',
    baseQuery: fetchBaseQuery({
        baseUrl:`${getBaseUrl()}/api/reviews`, /// a space can occur error 
        credentials:'include',
    }),
    tagTypes: ["Reviews"],
    endpoints:(builder)=>({
        postReview : builder.mutation({
            query:(reviewData)=>({
                url:"/post-review",
                method:"POST",
                body: reviewData
            }),
            invalidatesTags:(result , error , {postId})=>[{type: "Reviews" , id: postId }],

        }),
        getReviewsCount: builder.query({
            query:()=>({
                url:"/total-reviews"
            })
        }),
        getReviewsByUserId: builder.query({
            query:(userId)=>({
                url:`/${userId}`
            }),
            providesTags:(result)=> result ? [{type:"Reviews" , id: result[0]?.email}] : []
        }),
        getReviewsByProductId: builder.query({
            query:(productId)=>({
                url:`/product/${productId}`
            }),
            providesTags:(result)=> result ? [{type:"Reviews" , id: result[0]?.email}] : []
        })
    })
})

export const { usePostReviewMutation , useGetReviewsCountQuery , useGetReviewsByUserIdQuery , useGetReviewsByProductIdQuery } = reviewApi ;


export default reviewApi;