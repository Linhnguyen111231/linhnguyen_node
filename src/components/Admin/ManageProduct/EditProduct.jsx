import { useEffect, useState } from "react";
import stl from "../../../assets/css/Admin/fixforminput.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Loading from "../../Loading";

const EditFood = () => {
  const idParams = useParams()
  const [data, setData] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    detail: '',
    price: '',
    quantity: '',
  })
  const [loading, setLoading] = useState(true)
  
 
  useEffect(() => {
    axios.get(`api/admin/foods/${idParams.id}/edit`)
      .then(res => {
        if (res.data.status === 200) {
          setProduct(res.data.foods)
          setLoading(false)

        } else {
          swal('error', "Don't find it", 'error')
        }
      })
    }, [])
  

  const [select, setSelect] = useState('');
  const [image, setImage] = useState([])
  const changePage = useNavigate();
  useEffect(() => {
    axios.get('api/admin/category')
      .then(res => {
        if (res.data.status === 200) {
          setData(res.data.all_categories)

        }
      })
  }, [])
  const handleInput = (e) => {
    e.persist()
    setProduct({ ...product, [e.target.name]: e.target.value })
  }
  const handleImage = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setImage(file);
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("img_food", image);
    formData.append("detail", product.detail);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("category_id", select);
    console.log(formData.get('category_id'));
  };
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("img_food", image);
    formData.append("detail", product.detail);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("category_id", select);
    axios.post("api/admin/add-food", formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        changePage('admin/cateogy')
      } else {

        swal("Error", "You don't add product successful", "Error");
      }
    })
      .catch(err => {
        swal("Error", err, "Error");

      })
  }
  const handleCancel = () => {
    changePage("/admin/category");
  };
  if (loading) {
    return <Loading/>
}else{
  return (
    <div className="container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">

        <h1>Form Add Product</h1>
        <div className="mb-3 mt-5">

          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" value={product.name}  onChange={handleInput} className={'form-label ' + stl.fxinputSelect} id="name" aria-describedby="name" name="name" />

          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" value={product.detail} onChange={handleInput} className={'form-label ' + stl.fxinputSelect} id="description" aria-describedby="description" name="detail" />

          <label htmlFor="price" className="form-label">Price</label>
          <input type="number" value={product.price} onChange={handleInput} className={'form-label ' + stl.fxinputSelect} id="price" aria-describedby="price" name="price" />

          <label htmlFor="photo" className="form-label">Photo</label>
          <div className="form-group">
            <label htmlFor="photo">Attach a photograph</label>
            <input onChange={handleImage} type="file" name="img_food" id="photo" className={'form-control-file ' + stl.fxinputSelect} required />
          </div>
          {image && (
            <img src={image.preview} alt="" style={{ width: "300px" }} />
          )}
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input type="number" value={product.quantity} onChange={handleInput} className={'form-label ' + stl.fxinputSelect} id="quantity" aria-describedby="quantity" name="quantity" />

          <label htmlFor="categories" className="form-label">Category: </label>

          <select className="form-select" value={select} onChange={e => setSelect(e.target.value)}>

            <option disabled>Slect One</option>
            {data && data.map((e, i) => {
              return (
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
          }
};
export default EditFood
