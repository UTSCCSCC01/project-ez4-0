import React, {useState} from "react";

export default function UserPost({props}) {

    // const [like,setLike] = useState(post.like)
    // const [isLiked,setIsLiked] = useState(false)

    // const likeHandler =()=>{
    //     setLike(isLiked ? like-1 : like+1)
    //     setIsLiked(!isLiked)
    // }

    // const getPostInformation = (post.id) => {
    //     fetch('http://localhost:5000/api/v1/posts/{post.id}')
    //         .then(response => response.json())
    //         .then(data => {this.setState({postContent:data.content});})
    // }
    

    const [content, setContent] = useState("");
    const ID = this.props.pid;
    const TT = "asdfsdafasdf";
    
    const getContent = (e) => {
        e.preventDefault();
        const requestOptions = {
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            
          })
        }
        fetch("http://localhost:5000/api/v1/posts/{post.id}", requestOptions)
          .then(response => response.json())
          .then(result => {
            
          });
      }

    return (
        // <!-- This is an example component -->
        <div class="">
            {/* <div class='mx-w-xl my-10 border rounded-lg  overflow-hidden mx-auto'> */}
                {/* <div class = 'flex flex-row w-max mt-3 mx-3'>
                    <div class = 'mr-40 text-grey-600 font-bold'>
                        Posts
                    </div>
                    <div class = 'ml-20 text-gray-600'>
                        <button type="button">see all</button>
                    </div>
                </div> */}
                <div class='flex flex-wrap max-w-xl mt-3 mb-10 bg-white border rounded-lg  overflow-hidden mx-auto'>
                    {/* post */}
                    <div class='flex items-center w-full '>
                        <div class='w-full'>
                            <div class="flex flex-row mt-2 px-2 py-3 mx-3">
                                <div class="w-auto h-auto border-2 border-white-500">
                                    <img class='w-12 h-12 object-cover shadow cursor-pointer' alt='User avatar' src='https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200'/>
                                </div>
                                <div class="flex flex-col mb-2 ml-4 mt-1">
                                    <div class='text-gray-600 text-sm font-semibold'>Finding Team Members!!</div>
                                    <div class='flex w-full mt-1'>
                                        {/* <div class='text-indigo-700 font-base text-xs mr-1 cursor-pointer'>
                                            UX Design
                                        </div>  */}
                                        <div class='text-gray-400 font-thin text-xs'>
                                            May 29 at 9:10 am
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div class="border-b border-gray-100"></div>  */}
                            <div class='text-gray-500 font-thin text-sm mb-6 mx-3 px-2'>{ID}</div>
                            <div class='text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2'><img class="rounded" src="https://picsum.photos/536/354"/></div>
                            {/* <div class='text-gray-600 font-semibold text-lg mb-2 mx-3 px-2'>Dummy text of the printing and typesetting industry</div> */}
                            <div class="flex justify-start mb-4">
                                <div class="flex w-full mt-1 pt-2 pl-5">
                                    
                                    
                                    <botton class="bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2" >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="14px" viewBox="0 0 20 20" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.19,4.155c-1.672-1.534-4.383-1.534-6.055,0L10,5.197L8.864,4.155c-1.672-1.534-4.382-1.534-6.054,0
                                                                    c-1.881,1.727-1.881,4.52,0,6.246L10,17l7.19-6.599C19.07,8.675,19.07,5.881,17.19,4.155z" />
                                        </svg>
                                    </botton>
                                    
                                    

                                    {/* Show users who liked this post, at most four */}
                                    <div class="flex ">
                                        <img class="inline-block object-cover w-8 h-8 text-white border-2 border-white rounded-full shadow-sm cursor-pointer" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                        <img class="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                        <img class="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="" />
                                        <img class="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" />
                                    </div>
                                </div>
                            </div>

                            <div class="flex w-full ">
                                <div class="mt-3 mx-5 flex flex-row">
                                    <div class='flex text-gray-700 font-normal text-sm rounded-md mb-2 mr-4 items-center'>Comments:<div class="ml-1 text-gray-400 font-thin text-ms"> 30</div></div>
                                    {/* <div cl ass='flex text-gray-700 font-normal text-sm rounded-md mb-2 mr-4 items-center'>Views: <div class="ml-1 text-gray-400 font-thin text-ms"> 60k</div></div> */}
                                </div>
                                <div class="mt-3 mx-5 w-full flex justify-end">
                                    <div class='flex text-gray-700 font-normal text-sm rounded-md mb-2 mr-4 items-center'>Likes: <div class="ml-1 text-gray-400 font-thin text-ms"> 120k</div></div>
                                </div>
                            </div>
                            <div class="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
                                <img class='w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer' alt='User avatar' src='https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200'/>
                                <span class="absolute inset-y-0 right-0 flex items-center pr-6">
                                    {/* <button type="submit" class="p-1 focus:outline-none focus:shadow-none hover:text-blue-500">
                                        <svg class="w-6 h-6 transition ease-out duration-300 hover:text-blue-500 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </button> */}
                                </span>
                                <input type="search" class="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"  placeholder="Post a comment..." autocomplete="off"/>
                            </div>
                        </div>
                    </div>
                </div>
                <script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="matheusgongo" data-description="Support me on Buy me a coffee!" data-message="Thank you for visiting! :D" data-color="#BD5FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>
            {/* </div> */}
        </div>
    );
  }