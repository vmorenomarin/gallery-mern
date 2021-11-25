import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export const Posts = () => {
  const history = useHistory();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await axios.get("/list");
      setPosts(data.posts);
    } catch (error) {
      if (!error.response.data.ok) {
        return alert(error.response.data.message);
      }
      console.log("Error in function getData", error.message);
    }
  };

  const updatePost = (id) => {
    history.push("/actions/" + id);
  };

  const deletePost = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axios.delete(
            "/delete/" + id
          );
          getData();
          Swal.fire({
            text: data.message,
            icon: "success",
            showCloseButton: false,
            timer: 1000,
          });
        }
      });
    } catch (error) {
      if (!error.response.data.ok) {
        return alert(error.response.data.message);
      }
      console.log("Error in function deletePost", error);
    }
  };
  return (
    //   <div><h1>Post</h1></div>
    <div className="card-gallery mt-3">
      <div className="container">
        <div className="heading text-center mb-4">
          <h4 className="fw-bold">Card Posts</h4>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {posts.map((post) => (
            <div className="col-12 col-md-6 col-xxl-4" key={post._id}>
              <div className="card h-100 border-0 transform-on-hover shadow pb-4">
                <img src={post.img} />
                <div className="card-body">
                  <h6 className="card-title fw-bold">{post.title}</h6>
                  <p className="text-muted card-text">{post.description}</p>
                </div>
                <div className="d-flex justify-content-around mb">
                  <button
                    className="btn btn-lg  btn-danger"
                    onClick={() => deletePost(post._id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                  <button
                    className="btn btn-lg btn-warning"
                    onClick={() => updatePost(post._id)}
                  >
                    <i className="bi bi-pen"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
