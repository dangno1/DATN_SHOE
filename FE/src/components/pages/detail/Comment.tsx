import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useGetCommentsQuery } from "@/api/comment";
import { useCreateCommentMutation } from "@/api/comment";
import "./comment.css";
import { useDeleteCommentMutation } from "@/api/comment";
import { IComment } from "@/interface/comment";
const Comment = () => {
  const { id } = useParams<{ id: string }>()
  const userData = localStorage.getItem('user');
  const { data: allComments } = useGetCommentsQuery();
  if (allComments) {
    
    if (allComments.length > 0) {
    } else {
      console.log("No comments available.");
    }
  } else {
    console.log("Loading comments..."); 
  }
 
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (allComments) {
      const filteredComments = allComments.filter((comment) => comment.ProductID?._id == id);
      console.log(filteredComments);

      setComments(filteredComments); 
    }
  }, [allComments, id]);
  const [valuecmt, setValuecmt] = useState('');
  const [addComment, { isLoading, isError }] = useCreateCommentMutation();
  const handleCommentSubmit = async (e: any) => {
    e.preventDefault();

    if (!userData) {
      alert("Please log in to post a comment.");
      return;
    }

    if (valuecmt) {
      const userId = JSON.parse(userData)._id;
      const newComment = {
        CommentContent: valuecmt,
        UserID: userId,
        ProductID: id,
        DatePosted: new Date().toISOString(),
        
      };

      
      setComments([...comments, newComment]);
      await addComment({ CommentContent: valuecmt, ProductID: id, UserID: userId });
      setValuecmt("");
    } else {
      alert("Comment content cannot be empty.");
    }
  };
  // ------------------------
  const [deleteComment] = useDeleteCommentMutation();
  const handleDeleteComment = async (commentId: any) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this comment?');
    if (!shouldDelete) {
      return; 
    }

    try {
      const response = await deleteComment(commentId); 

      if ((response as any).error) {
        console.error('Error deleting comment:', (response as any).error);
        alert('An error occurred while deleting the comment. Please try again.');
      } else {
        setTimeout(() => {
          const updatedComments = comments.filter(comment => comment._id !== commentId);
          setComments(updatedComments);
          console.log(`Comment with ID ${commentId} has been deleted.`);
        }, 3000); // Đợi 3 giây trước khi xóa
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('An error occurred while deleting the comment. Please try again.');
    }
  };


  return (
    <div>
      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
        <h1 className="text-center font-bold text-4xl">Bình luận về sản phẩm</h1>
        <div className="2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4">
          <div className="mt-5 py-2 px-4 mb-4  bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow-md ">
            {comments?.map((comment: any) => (
              <article key={comment.id} className="p-2 text-base bg-white   rounded-lg dark:bg-gray-900">
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-lg text-gray-900 dark:text-white font-semibold">
                      <img
                        className="mr-2 w-6 h-6 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                        alt="Michael Gough"
                      />
                      {comment?.UserID?.fullname}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 ">
                      <time title="">
                        {comment?.DatePosted}
                      </time>
                    </p>
                  </div>
                  {/* <button
                    id="dropdownComment1Button"
                    data-dropdown-toggle="dropdownComment1"
                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    type="button"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 3"
                    >
                      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                    <span className="sr-only">Comment settings</span>
                  </button> */}
                  <div className="p-6">

                    <div className="dropdown inline-block relative">
                      <button className=" text-gray-700 bg-gray-200 font-semibold py-2 px-4 rounded inline-flex items-center">
                        <span className="mr-1">...</span>
                        {/* <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg> */}
                      </button>
                      <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
                        <li key={comment._id} className=""><a className="rounded-t  py-2 px-4 block whitespace-no-wrap" href="#"><button onClick={() => handleDeleteComment(comment._id)}>xóa</button></a></li>
                        {/* <li className=""><a className=" py-2 px-4 block whitespace-no-wrap" href="#"></a></li> */}

                      </ul>
                    </div>

                  </div>
                  {/* Dropdown menu */}
                  {/* <div
                    id="dropdownComment1"
                    className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                  >
                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                      <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          Edit
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          Remove
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          Report
                        </a>
                      </li>
                    </ul>
                  </div> */}
                </footer>
                <p className="text-gray-500 dark:text-gray-400">
                  {comment?.CommentContent}
                </p>
                {/* <div className="flex items-center mt-4 space-x-4">
                  <button
                    type="button"
                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                  >
                    <svg
                      className="mr-1.5 w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 18"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                      />
                    </svg>
                    Reply
                  </button>
                </div> */}
              </article>
            ))}
            <form className="mb-16">
              <div className="py-8 px-2 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label htmlFor="comment" className="sr-only">Your comment</label>
                <input
                  id="comment"
                  className=" text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                  placeholder={userData ? "Write a comment..." : "Please log in to post a comment."}
                  required
                  type="text"
                  value={valuecmt}
                  onChange={(e) => setValuecmt(e.target.value)}
                ></input>
              </div>
              <button
                type="submit"
                className="inline-flex items-center py-4 px-4 bg-blue-700 float-left text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 transform hover:scale-105 transition-transform"
                onClick={handleCommentSubmit} disabled={isLoading}
              >
                Post comment
              </button>
              {isError && <div>không thể comment</div>}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Comment;