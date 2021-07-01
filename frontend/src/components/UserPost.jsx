import React, { Component } from "react";

class UserPost extends Component {
  render() {
    return (
        // <!-- This is an example component -->
        <div className="">
            {/* <div className='mx-w-xl my-10 border rounded-lg  overflow-hidden mx-auto'> */}
                {/* <div className = 'flex flex-row w-max mt-3 mx-3'>
                    <div className = 'mr-40 text-grey-600 font-bold'>
                        Posts
                    </div>
                    <div className = 'ml-20 text-gray-600'>
                        <button type="button">see all</button>
                    </div>
                </div> */}
                <div className='flex flex-wrap max-w-xl mt-3 mb-10 bg-white border rounded-lg  overflow-hidden mx-auto'>
                    {/* post */}
                    <div className='flex items-center w-full '>
                        <div className='w-full'>
                            <div className="flex flex-row mt-2 px-2 py-3 mx-3">
                                <div className="w-auto h-auto border-2 border-white-500">
                                    <img className='w-12 h-12 object-cover shadow cursor-pointer' alt='User avatar' src='https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200'/>
                                </div>
                                <div className="flex flex-col mb-2 ml-4 mt-1">
                                    <div className='text-gray-600 text-sm font-semibold'>Finding Team Members!!</div>
                                    <div className='flex w-full mt-1'>
                                        {/* <div className='text-indigo-700 font-base text-xs mr-1 cursor-pointer'>
                                            UX Design
                                        </div>  */}
                                        <div className='text-gray-400 font-thin text-xs'>
                                            May 29 at 9:10 am
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="border-b border-gray-100"></div>  */}
                            <div className='text-gray-500 font-thin text-sm mb-6 mx-3 px-2'>lasdcfuiopwsvnoi oiasmsv o nmo jafeojicnop oierjdmopav noeiwd xopqwv nop eocmqwiop cfoiamsopdc oae;kj opaws yudco;jal;sd nawe hco</div>
                            <div className='text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2'><img className="rounded" src="https://picsum.photos/536/354"/></div>
                            {/* <div className='text-gray-600 font-semibold text-lg mb-2 mx-3 px-2'>Dummy text of the printing and typesetting industry</div> */}
                            <div className="flex justify-start mb-4">
                                <div className="flex w-full mt-1 pt-2 pl-5">
                                    
                                    
                                    <botton className="bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2" >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="14px" viewBox="0 0 20 20" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.19,4.155c-1.672-1.534-4.383-1.534-6.055,0L10,5.197L8.864,4.155c-1.672-1.534-4.382-1.534-6.054,0
                                                                    c-1.881,1.727-1.881,4.52,0,6.246L10,17l7.19-6.599C19.07,8.675,19.07,5.881,17.19,4.155z" />
                                        </svg>
                                    </botton>
                                    
                                    
    
                                    {/* Show users who liked this post, at most four */}
                                    <div className="flex ">
                                        <img className="inline-block object-cover w-8 h-8 text-white border-2 border-white rounded-full shadow-sm cursor-pointer" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                        <img className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                        <img className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="" />
                                        <img className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" />
                                    </div>
                                </div>
                            </div>
    
                            <div className="flex w-full ">
                                <div className="mt-3 mx-5 flex flex-row">
                                    <div className='flex text-gray-700 font-normal text-sm rounded-md mb-2 mr-4 items-center'>Comments:<div className="ml-1 text-gray-400 font-thin text-ms"> 30</div></div>
                                    {/* <div cl ass='flex text-gray-700 font-normal text-sm rounded-md mb-2 mr-4 items-center'>Views: <div className="ml-1 text-gray-400 font-thin text-ms"> 60k</div></div> */}
                                </div>
                                <div className="mt-3 mx-5 w-full flex justify-end">
                                    <div className='flex text-gray-700 font-normal text-sm rounded-md mb-2 mr-4 items-center'>Likes: <div className="ml-1 text-gray-400 font-thin text-ms"> 120k</div></div>
                                </div>
                            </div>
                            <div className="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
                                <img className='w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer' alt='User avatar' src='https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200'/>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-6">
                                    {/* <button type="submit" className="p-1 focus:outline-none focus:shadow-none hover:text-blue-500">
                                        <svg className="w-6 h-6 transition ease-out duration-300 hover:text-blue-500 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </button> */}
                                </span>
                                <input type="search" className="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"  placeholder="Post a comment..." autocomplete="off"/>
                            </div>
                        </div>
                    </div>
                </div>
                <script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="matheusgongo" data-description="Support me on Buy me a coffee!" data-message="Thank you for visiting! :D" data-color="#BD5FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>
            {/* </div> */}
        </div>
    );
  }

  getTitle() {
    return this.props.title === undefined ? "UNKNOWN" : this.props.title;
  }

  getContent() {
    return this.props.content === undefined ? "UNKNOWN" : this.props.content;
  }

  getLocation() {
    return this.props.Location === undefined ? "UNKNOWN" : this.props.Location;
  }

  getType() {
    return this.props.Type === undefined ? "UNKNOWN" : this.props.Type;
  }
}

export default UserPost;