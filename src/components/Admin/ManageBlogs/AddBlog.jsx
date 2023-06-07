import { useNavigate } from "react-router-dom";
import stl from  "../../../assets/css/Admin/fixforminput.module.css";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
const AddBlog = () => {
  const [inputChange, setInputChange] = useState({
    title: '',
    description: ''
  });
  const [imgView, setImgView] = useState([]);

  const changePage = useNavigate();
  const handleInput = (e)=>{
    e.persist()
    setInputChange({...inputChange,[e.target.name]: e.target.value})
  }
  const handleImage = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setImgView(file);
  };
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("title", inputChange.title);
    formData.append("description", inputChange.description);
    formData.append("img_blog", imgView);
      axios.post("api/admin/add-blog",formData).then((res) => {
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
          changePage('admin/cateogy')
        } else {
          swal("Error", "You don't add product successful", "Error");
        }
      })
      .catch(err =>{
        swal("Error", err, "Error");

      })
      
  };
  const handleCancel = () => {
    changePage("/admin/blogs");
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3 mt-5">
        <h1>Form Add Blog</h1>
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            onChange={handleInput}
            type="text"
            className={'form-control ' + stl.fxinputSelect}
            id="name"
            aria-describedby="name"
            name="title"
          />
        <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            onChange={handleInput}
            type="text"
            className={'form-control ' + stl.fxinputSelect}
            id="description"
            aria-describedby="description"
            name="description"
          />
          <label htmlFor="photo" className="form-label">
            Photo
          </label>
          <div className="form-group">
            <label htmlFor="photo">Attach a photograph</label>
            <input
              onChange={handleImage}
              type="file"
              name="img_category"
              id="photo"
              multiple
              className={'form-control-file ' + stl.fxinputSelect}
              required
            />
            {imgView && (
              <img src={imgView.preview} alt="" style={{ width: "300px" }} />
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-success mr-3">
          Create
        </button>
        <button onClick={handleCancel} className="btn btn-warning">
          Cancel
        </button>
      </form>
    </div>
  );
};
export default AddBlog;
