import { useEffect, useState } from "react";
import stl from "../../../assets/css/Admin/fixforminput.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name:'',
    detail:'',
    price:'',
    quantity:'',
  })
  const [select, setSelect] = useState('');
  const [data, setData] = useState([]);
 
  const [imageView, setImageView] = useState([])
  const changePage = useNavigate();
  useEffect(()=>{
    axios.get('api/admin/category')
            .then(res=>{
                if (res.data.status === 200) {
                    setData(res.data.all_categories)
                   
                }
            })
  },[])
  const handleInput = (e)=>{
    e.persist()
    setProduct({...product,[e.target.name]: e.target.value})
  }
  const handleImageView = (e) => {
    if (e.target.files[0]!=null) {
      const file = e.target.files[0];
      setImageView(file);
      file.preview = URL.createObjectURL(file);
    }
  };
  const handleSubmit =(e)=>{
    e.preventDefault()
    console.log(imageView.name);
    const formData = new FormData();
    formData.append("name",product.name);
    formData.append("img_food", imageView);
    formData.append("detail", product.detail);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("category_id", select);
      axios.post("api/admin/add-food",formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        }}).then((res) => {
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
          changePage('admin/foods')
        } else {

          swal("Error", "You don't add product successful", "Error");
        }
      })
      .catch(err =>{
        swal("Error", err, "Error");

      })
  }
  const handleCancel = () => {
    changePage("/admin/category");
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>

        <h1>Form Add Product</h1>
        <div className="mb-3 mt-5">

          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" onChange={handleInput} className={'form-label ' + stl.fxinputSelect} id="name" aria-describedby="name" name="name" />

          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" onChange={handleInput} className={'form-label ' + stl.fxinputSelect} id="description" aria-describedby="description" name="detail" />

          <label htmlFor="price" className="form-label">Price</label>
          <input type="number" min={0} onChange={handleInput} className={'form-label ' + stl.fxinputSelect} id="price" aria-describedby="price" name="price" />

          <label htmlFor="photo" className="form-label">Photo</label>
          <div className="form-group">
            <label htmlFor="photo">Attach a photograph</label>
            <input onChange={handleImageView} type="file" name="img_food" id="photo" className={'form-control-file ' + stl.fxinputSelect} required />
          </div>
          {imageView && (
              <img src={imageView.preview} alt="" style={{     width: '300px',
                display: 'block',
                margin: '0 auto' }} />
            )}
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input type="number" onChange={handleInput} className={'form-label ' + stl.fxinputSelect} id="quantity" aria-describedby="quantity" name="quantity" />

          <label htmlFor="categories" className="form-label">Category: </label>

          <select className="form-select" value={select} onChange={e=>setSelect(e.target.value)}>
            
            <option selected>Slect One</option>
            {data && data.map((e,i)=>{
              return(
                <option value={e.id} key={i}>{e.category_name}</option>
              )
            })
            
            }
          </select>



        </div>
        <button type="submit" className="btn btn-success">Create</button>
        <button onClick={handleCancel} className="btn btn-warning">Cancel
</button>
      </form>
    </div>
  )
};
export default AddProduct
