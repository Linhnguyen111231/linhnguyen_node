import { useNavigate } from "react-router-dom";
import stl from  "../../../assets/css/Admin/fixforminput.module.css";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
const AddCategory = () => {
  const [inputChange, setInputChange] = useState("");
  const [imgView, setImgView] = useState([]);

  const changePage = useNavigate();

  const handleImage = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setImgView(file);
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("category_name", inputChange);
    formData.append("img_category", imgView);
      axios.post("api/admin/add-category",formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        }},).then((res) => {
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
          changePage('/admin/category')
        } else {
          swal("Error", "You don't add product successful", "Error");
        }
      })
      .catch(err =>{
        swal("Error", err, "Error");

      })
      
  };
  const handleCancel = () => {
    changePage("/admin/category");
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-5">
        <h1>Form Add Category</h1>
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            onChange={(e) => setInputChange(e.target.value)}
            value={inputChange}
            type="text"
            className={'form-control ' + stl.fxinputSelect}
            id="name"
            aria-describedby="name"
            name="category_name"
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
export default AddCategory;
