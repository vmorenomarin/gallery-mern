import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Swal from "sweetalert2";

export const Actions = () => {
  const history = useHistory();
  const { id } = useParams();
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    img: "",
    preview: "",
  });
  const [uploadState, setUploadState] = useState(0);
  const [loading, setLoading] = useState(false);

  const options = {
    onUploadProgress: (ProgressEvent) => {
      const { loaded, total } = ProgressEvent;
      let percent = parseInt((loaded * 100) / total);
      setUploadState(percent);
    },
  };

  useEffect(() => {
    const searchPostById = async () => {
      try {
        const { data } = await axios.get("/listid/" + id);
        setEditData({
          ...editData,
          title: data.post.title,
          description: data.post.title,
          img: data.post.img,
          preview: data.post.img,
        });
      } catch (error) {
        if (!error.response.data.ok) {
          return alert(error.response.data.message);
        }
        console.log("Error in function searchPostById", error.message);
      }
    };
    id
      ? searchPostById()
      : setEditData({
          ...editData,
          title: "",
          description: "",
          img: "",
          preview: "",
        });
  }, []);

  const actions = (e) => {
    e.preventDefault();
    const formData = new FormData();
    editData.img !== "" && formData.append("img", editData.img);
    formData.append("title", editData.title);
    formData.append("description", editData.description);
    id ? updatePost(formData) : savePost(formData);
  };

  const savePost = async (info) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/add",
        info,
        options
      );
      setLoading(false);
      data.ok &&
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Post saved.",
          timer: 1500,
          showConfirmButton: false,
        });
      history.push("/");
    } catch (error) {
      if (!error.response.data.ok) {
        return alert(error.response.data.message);
      }
      console.log("Error in function savePost", error.message);
    }
  };

  const imgFormatValidation = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      if (!/\.(jpg|jpeg|JPG|JPEG|PNG|png|svg|SVG)$/i.test(img.name)) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Invalid file format.",
        });
        e.target.value = "";
      } else {
        setEditData({
          ...editData,
          img: img,
          preview: URL.createObjectURL(img),
        });
      }
    }
  };

  const updatePost = async (info) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        "/update/" + id,
        info,
        options
      );
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Post updated.",
        timer: 1500,
        showConfirmButton: false,
      });
      history.push("/");
    } catch (error) {
      if (!error.response.data.ok) {
        return alert(error.response.data.message);
      }
      console.log("Error in function updatePost", error.message);
    }
  };
  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card">
          {editData.preview !== "" && (
            <img src={editData.preview} className="card-img-top" />
          )}
          <div className="card-body">
            <form onSubmit={actions}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  required
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  // required
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="file"
                  value={editData.nameImg}
                  // required
                  onChange={(e) => imgFormatValidation(e)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <button className="btn-primary form-control" type="submit">
                  Save
                </button>
              </div>
            </form>

            {loading&& <div class="progress">
              <div className="progress-bar progress-bar-striped progress-bar-animated bg-warning" style={{width: `${uploadState}%` }}></div>
            </div>}
            
          </div>
        </div>
      </div>
    </div>
  );
};
