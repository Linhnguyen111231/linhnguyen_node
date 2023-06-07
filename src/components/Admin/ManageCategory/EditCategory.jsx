import { useNavigate, useParams } from "react-router-dom";
import stl from "../../../assets/css/Admin/fixforminput.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import Loading from "../../Loading";

const EditCategory = ()=>{
    const idParams= useParams()
    const [loading, setLoading] = useState(true)
    
    const [inputChange, setInputChange] = useState("");
  const [imgView, setImgView] = useState([]);

  const changePage = useNavigate();
  useEffect(()=>{
    axios.get(`api/admin/category/${idParams.id}/edit`)
        .then(res =>{
            if (res.data.status === 200) {
                setInputChange(res.data.category.category_name);
                setImgView(res.data.category.img_category);
                setLoading(true)
            }else{
                swal('error',"Don't find it" , 'error')
            }
        })
  },[])
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("category_name", inputChange);
    formData.append("img_category", imgView);
      axios.post(`api/admin/category/${idParams.id}/update`,formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        }}).then((res) => {
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
          changePage('/admin/category')
          
        } else {
          swal("Error", "You don't edit category successful", "Error");
        }
      })
      .catch(err =>{
        swal("Error", err, "Error");

      })
      
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setImgView(file);
  };
  const handleCancel = () => {
    changePage("/admin/category");
  };
//   if (loading) {
//     return <Loading/>
// }else{
    return (
        <div className="container">
      <form onSubmit={handleSubmit}>
            <h3></h3>
        <div className="mb-3 mt-5">
        <h1>Form Edit Category</h1>
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
              
            />
            {imgView && (
              <img src={imgView.preview || `http://127.0.0.1:8000/uploads/category/${imgView}`} alt="" style={{ width: "300px" }} />
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-success mr-3">
          Update
        </button>
        <button onClick={handleCancel} className="btn btn-warning">
          Cancel
        </button>
      </form>
    </div>
    )
            // }
}
export default EditCategory