
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
const BookTable = () => {
    const [inform, setInform] = useState({
        name:'',
        phone:'',
    });
    const [date,setDateTime] = useState('') 
    const [select,setSelect] = useState('') 
    const [timeNow,setTimeNow] = useState('') 
    
    useEffect(() => {
        const currentDate = new Date();
        const currentDateTime = currentDate.toISOString().slice(0, 16);
        setDateTime(currentDateTime);
        setTimeNow(currentDateTime);
      }, []);
    
      const handleInform = (event) => {
        setInform({...inform,[event.target.name]: event.target.value});
      };
      const handleBook = (e)=>{
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('name',inform.name)
        formdata.append('phone_number',inform.phone)
        formdata.append('people',select)
        formdata.append('date_time',date)
        axios.post('api/book/add',formdata)
            .then(res=>{
                if (res.data.status === 200) {
                    swal('Success','Book ','success');
                }
            })
            .catch(()=>{
                swal('Error','Book ','error');
            })
      }
    
    return (
        <>

            <section className="online-booking heading text-center mb-5">
                <div className="container">
                    <h2 className="section-title text-center"><strong>Make Your </strong>online booking</h2>
                    <div className="divider dark mb-4">
                        <div className="icon-wrap">
                            <i className="icon icon-spoon"></i>
                        </div>
                    </div>
                    
                    <div className="search-bar mb-xlarge ">
                        <form className="search-form d-block" onSubmit={handleBook}>

                        <div className="form-outline datetimepicker">
  <input type="datetime-local" value={date} min={timeNow} onChange={e=>setDateTime(e.target.value)} className="form-control"/>

</div> 
                            <div className="form-group">
                                        <div className="pix_btn text-center">

                                            <input type="text"  name="name" onChange={handleInform} className="form-control" placeholder="Name"/>
                                            <input type="text" name="phone"  className="form-control mt-4"  onChange={handleInform} placeholder="Phone number"/>

                                        </div>



                                </div>
                            

                            <div className="form-group no-border">
                                <div className="select">
                                    <select name='people' value={select} onChange={e=>setSelect(e.target.value)}>
                                        <option value="4">4 People</option>
                                        <option value="5">5 People</option>
                                        <option value="6">6 People</option>
                                        <option value="7">7 People</option>
                                        <option value="8">8 People</option>
                                    </select>
                                </div>
                            </div>

                            
                            <button className="button btn-effect" type="submit">Book Now</button>

                        </form>
                    </div>

                </div>
            </section>
            
            <section className="tables-room-wrap">
                <div className="container">
                    <div className="content-box dark heading col-md-6 light">
                        <div className="content text-center pb-4">
                            <h2 className="section-title"><strong>Dining </strong>40 tables room</h2>
                            <div className="divider mb-4">
                                <div className="icon-wrap">
                                    <i className="icon icon-spoon"></i>
                                </div>
                            </div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore aliqua.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="reservation-modes">
                <div className="container">

                    <div className="heading text-center">
                        <h2 className="section-title text-center"><strong>Check </strong>our reservation</h2>
                        <div className="divider dark mb-4">
                            <div className="icon-wrap">
                                <i className="icon icon-spoon"></i>
                            </div>
                        </div>
                    </div>

                    <div className="content">
                        <p><strong>Reserve by Phone</strong></p>
                        <p>Tourists can reserve hotel by Phone. Fully functional when not.Swipe enabled. Or disabled, if you prefer.Fully responsive. Scales with its container.Separate settings per breakpoint Uses CSS3 when available. Fully functional when not.Swipe enabled. Or disabled, if you prefer.</p>

                        <div className="contact-numbers">
                            <div className="numbers"><i className="icon icon-phone"></i>Restaurant: (123) 459-7847</div>
                            <div className="numbers"><i className="icon icon-mobile"></i>Cellphone: (111) 980-300-00</div>
                        </div>

                        <p><strong>View our restaurants address</strong></p>
                        <p>View our restaurants address. Separate settings per breakpoint Uses CSS3 when available. Fully functional when not.Swipe enabled. Or disabled, if you prefer.Fully responsive. Scales with its container.Separate settings per breakpoint Uses CSS3 when available. Fully functional when not.Swipe enabled. Or disabled, if you prefer.</p>

                        <div className="contact-address">
                            <div className="address darkColor"><strong>Oakland</strong> 1693 Park Street <a href="#">reservation@hungerhunt.com</a></div>
                            <div className="address darkColor"><strong>Dallas</strong> 2205 Wilson Avenue <a href="#">reservation@hungerhunt.com</a></div>
                            <div className="address darkColor"><strong>Wheeling</strong> 4801 Bingamon Branch Road <a href="#">reservation@hungerhunt.com</a></div>
                            <div className="address darkColor"><strong>Washington</strong> 2176 Hickory Lane <a href="#">reservation@hungerhunt.com</a></div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="order-menu pb-5">
                <div className="container">

                    <div className="bright heading text-center light">
                        <h2 className="section-title text-center"><strong>Check </strong>order it now menu</h2>
                        <div className="divider mb-4">
                            <div className="icon-wrap">
                                <i className="icon icon-spoon"></i>
                            </div>
                        </div>
                    </div>

                    <div className="price-list">

                        <div className="row">

                            <table className="col-md-6">
                                <tr>
                                    <td className="light">
                                        <img src="images/food1.jpg" className="menuImg"/>
                                            <div className="title">
                                                <strong>Tarte Tatin</strong> <em>with a caramelised sugar crust</em></div>
                                    </td>
                                    <td className="color-primary"><strong>$6.00</strong></td>
                                </tr>

                                <tr>
                                    <td className="light">
                                        <img src="images/food2.jpg" className="menuImg"/>
                                            <div className="title"><strong>Assiette De Fromages</strong> <em>Chutney and biscuits</em></div></td>
                                    <td className="color-primary"><strong>$5.00</strong></td>
                                </tr>

                                <tr>
                                    <td className="light">
                                        <img src="images/food3.jpg" className="menuImg"/>
                                            <div className="title"><strong>Melitinia Cookies</strong> <em>Sweet cheese pastries</em></div></td>
                                    <td className="color-primary"><strong>$15.00</strong></td>
                                </tr>

                                <tr>
                                    <td className="light">
                                        <img src="images/food4.jpg" className="menuImg"/>
                                            <div className="title"><strong>Creme Brulee Vanilla Custard</strong> <em>with a caramelised sugar crust</em></div></td>
                                    <td className="color-primary"><strong>$5.00</strong></td>
                                </tr>
                            </table>

                            <table className="col-md-6">
                                <tr>
                                    <td className="light">
                                        <img src="images/food1.jpg" className="menuImg"/>
                                            <div className="title"><strong>Tarte Tatin</strong> <em>with a caramelised sugar crust</em></div></td>
                                    <td className="color-primary"><strong>$6.00</strong></td>
                                </tr>

                                <tr>
                                    <td className="light">
                                        <img src="images/food2.jpg" className="menuImg"/>
                                            <div className="title"><strong>Assiette De Fromages</strong> <em>Chutney and biscuits</em></div></td>
                                    <td className="color-primary"><strong>$5.00</strong></td>
                                </tr>

                                <tr>
                                    <td className="light">
                                        <img src="images/food3.jpg" className="menuImg"/>
                                            <div className="title"><strong>Melitinia Cookies</strong> <em>Sweet cheese pastries</em></div></td>
                                    <td className="color-primary"><strong>$15.00</strong></td>
                                </tr>

                                <tr>
                                    <td className="light">
                                        <img src="images/food4.jpg" className="menuImg"/>
                                            <div className="title"><strong>Creme Brulee Vanilla Custard</strong> <em>with a caramelised sugar crust</em></div></td>
                                    <td className="color-primary"><strong>$5.00</strong></td>
                                </tr>
                            </table>

                        </div>
                    </div>

                    <div className="pix_btn text-center">
                        <a href="#" className="button btn-effect mt-5">View full menu</a>
                    </div>

                </div>
            </section>



        </>
    )
}
export default BookTable