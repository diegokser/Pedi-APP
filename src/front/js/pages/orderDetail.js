import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/orderDetail.css";
import bk from "../../img/bk.png"
import Swal from "sweetalert2";



const OrderDetail = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [company, setCompany] = useState({});
  const [delivery, setdelivery] = useState("");

  useEffect( () =>{
    (async () => {
              
              
      try {
        if (Object.keys(store.current_user_data) == 0 || Object.keys(store.product) == 0){
          
          Swal.fire("User not loged")
          navigate('/searchEmpresa', { replace: true });
        }
        
        const response = await fetch(process.env.BACKEND_URL + "/api/companyget", { 
          method : "POST",
          body: JSON.stringify({id : store.product.id}),
          headers: { 
              "Content-Type": "application/json",
              }       
          
        })
        const result = await response.json()
      
        setCompany(result.company) 
        
      }catch(error){
          console.log("Error loading message from backend")
      }		
    })()
  }, []);
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    if( delivery == ""){
      Swal.fire("Select delivery or takeout option")
    } else {
     
      navigate("/checkout", { replace: true });
    }
    
  }
  if (Object.keys(store.product) != 0 && Object.keys(company) != 0) {
    return (
      <><form onSubmit={(e) => handleSubmit(e)}>
        
        <div className="container-fluid text-center  order_page_container p-5 ">
          <div className="row order_all p-5">
  
            <div className="col-5 order_left_col px-4 pb-4 me-4">
              <div className="row left_first_row py-4 ">
                  <div className="col-2 order_img_box "> <img src={company.imagen} alt="..." className="order_img " /></div>
                  <div className="col-5 order_company_name  "> <h2>{company.nombre}</h2> </div>
                  <div className="col-5 d-flex ">
                    <div className="order_btn_box ">
                      <input type="radio" className="btn-check order_btn " name="options" id="option1" autoComplete="off"  disabled={company.delivery ==true? false : true} onClick={() => {setdelivery(true)}} />
                      <label className="btn  order_btn me-2" htmlFor="option1">Delivery</label>
  
                      <input type="radio" className="btn-check order_btn" name="options" id="option2" autoComplete="off" onClick={() => {setdelivery(false)}} />
                      <label className="btn  order_btn text-nowrap" htmlFor="option2">Take away</label>
                    </div>
                  </div>
              </div>
              <div className="row left_second_row pt-1 ">
                  <div className="col order_delidet_box  "> 
                    <h3>Delivery details</h3>
                  </div>
                  <div className="col order_delidet_box  "> 
                    <i className="fas fa-map-marker-alt fa-lg order_icon"></i>
                    <p className="order_adress fs-6">{store.current_user_data.direccion}</p>
                  </div>
                  <div className="col order_instructions_box d-flex mt-2  ">  
                    <p className="order_adress fs-6">instrucciones de la direccion</p>
                  </div>
              </div>
              <div className="row left_second_row  ">
                  <div className="col order_delidet_box  "> 
                    <h3>Delivery estimate</h3>
                  </div>
                    <div className="col order_delidet_box  "> 
                      <i className="fas fa-bicycle fa-lg order_icon"></i>
                      <div className=" ">
                        <p className="order_adress fs-5 ">Standard</p>
                        <p className="order_adress  text-secondary fs-6 ">10-20min</p>
                      </div>
                    </div>
                    <div className="col order_instructions_box d-flex mt-2  ">  
                        <i className="fas fa-calendar-alt fa-lg order_icon"></i>
                        <div className="  ">
                          <p className="order_adress fs-5 ">Scheduled</p>
                          <p className="order_adress  text-secondary fs-6 ">Select a time</p>
                        </div>
                    </div>  
              </div>
              <div className="row left_second_row  ">
                  <div className="col order_delidet_box  "> 
                    <h3>Payment</h3>
                  </div>
                    <div className="col order_delidet_box  "> 
                      <i className="far fa-credit-card fa-lg order_icon"></i>
                      <p className="order_adress fs-5 ">Credit Card</p>
                    </div>
                    <div className="col order_delidet_box  "> 
                      <i className="fas fa-coins fa-lg order_icon"></i>
                      <p className="order_adress fs-5 ">Cash</p>
                    </div>
                    
                    
              </div>
            </div>
  
            <div className="col-5 order_right_col px-4 pb-4">
                <div className="row right_first_row py-4 ">
                  <h3 className=" text-start">Order summary</h3> 
                </div>
                <div className="row right_second_row py-4 pt-1 ">
                  <div className="col-7 order_detail_box ">
                    <div className=" d-flex  w-100">
                      <p className="order_product fs-5">{store.product.nombre}  </p> 
                      <p className="order_quant fs-5 text-secondary  ">{store.product.cantidad}  </p> 
                    </div>
                    <p className="order_adress text-secondary fs-6 ">{store.product.descripcion}</p>
                    
                  </div>
                  <div className="col-4  order_product_price  ">
                    <p className="order_product_price fs-5">{(store.product.cantidad * store.product.precio).toFixed(2)}$  </p> 
                    <div className="btn-group order_product_btnbox" role="group" aria-label="Basic example">
                      <button type="button" className="btn  btn-sm order_product_btn"><i className="fa-solid fa-trash-can  mx-1"></i></button>
                      <button type="button" className="btn  btn-sm order_product_btn"><p className="my-auto mx-1" >1</p></button>
                      <button type="button" className="btn  btn-sm order_product_btn"><p className="my-auto mx-1" >+</p></button>
                    </div>
                  </div>
                </div>
                <div className="row right_third_row py-4 ">
                    <div className="col d-flex  w-100"> <h4 className=" text-start">Subtotal</h4> <h4 className=" ms-auto me-3">{(store.product.cantidad * store.product.precio).toFixed(2)}$</h4></div> 
                    <div className="col d-flex  w-100"> <h4 className=" text-start">Tax</h4> <h4 className=" ms-auto me-3">{(store.product.cantidad * store.product.precio * 0.21).toFixed(2)}$</h4></div> 
                    <div className="col d-flex  w-100"> <h3 className=" text-start">Total</h3> <h3 className=" ms-auto me-3">{(store.product.cantidad * store.product.precio *1.21).toFixed(2)}$</h3></div> 
                    <div className="col d-flex  w-100"> <p className=" text-secondary order_disclaimer">If you’re not around when the delivery person arrives,   they’ll leave your 
                        order at the door. By placing your order, you agree to take full responsibility
                        for it once it’s delivered. Orders containing alcohol or other restricted
                        items may not be eligible for leave at door and will be returned to the store
                        if you are not avaiable.</p></div> 
                </div>
                
                <button type="submit" className="btn btn-primary btn-lg order_submit">Place order</button>
            </div>
          </div>
        </div>
      </form></>
      
    );
  } else {
    return (
      <>
      <h1>loading</h1>
      </>
    )
  }
  
};

export default OrderDetail;