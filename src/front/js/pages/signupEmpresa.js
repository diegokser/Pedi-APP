import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "/workspaces/Pedi-APP/src/front/styles/signupCliente.css";
import "../../styles/signupEmpresa.css";
import Swal from "sweetalert2";

export const SingupEmpresa = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
        calleNumero:"",
        pisoPuerta:"",
        codigoPostal:"",
        ciudad:"",
        estado:"",
        nombre: "",
        cif: "",
        reserva: false,
        delivery: false,
        mañana: false,
        tarde:false,
        terminosCondiciones: false
        // lunes: {
        //     mañana: false,
        //     tarde:false,
        // },
        // martes: {
        //     mañana: false,
        //     tarde:false,
        // },
        // miercoles: {
        //     mañana: false,
        //     tarde:false,
        // },
        // jueves: {
        //     mañana: false,
        //     tarde:false,
        // },
        // viernes: {
        //     mañana: false,
        //     tarde:false,
        // }, 
        // sabado: {
        //     mañana: false,
        //     tarde:false,
        // },
        // domingo: {
        //     mañana: false,
        //     tarde:false,
        // },
    })

    //   const handleCheckboxChange = (time, day) => {
    //     return (event) => {
    //       setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         [day]: {
    //           ...prevFormData[day],
    //           [time]: event.target.checked
    //         }
    //       }));
    //     };
    //   };
      
    const handleCheckboxChange = (fieldName) => {
        return (event) => {
          setFormData({ ...formData, [fieldName]: event.target.checked });
        };
      };

    const navigate = useNavigate()

    const handleSignupCompanies = (e) => {
        e.preventDefault()
        if (formData.nombre === "" && formData.cif === "" && formData.calleNumero === "" && formData.pisoPuerta === "" && formData.codigoPostal === "" && formData.ciudad === "" && formData.estado === "") {
            return  Swal.fire("Check all the fields");
          }
          else if (formData.terminosCondiciones === false){
            return Swal.fire("You have to agree to Terms and Conditions to be able to signup")
          }
        else{
            actions.signupEmpresa(formData.nombre, formData.cif, formData.calleNumero, formData.pisoPuerta, formData.codigoPostal, formData.estado, formData.ciudad, formData.delivery, formData.reserva, formData.mañana, formData.tarde, formData.terminosCondiciones);
            navigate('/', { replace: true });}
    };

    useEffect(() => {
         console.log(formData);
     }, [formData]);

    return(
        <>
            <div className="container-fluid text-center signupcompany_page_container p-5" onSubmit={(e) => handleSignupCompanies(e)}>
                <div className="row signupcompany_all">
                    <div className="col-4 d-flex signupcompany_logo_container">
                        <p className="signupcompany_logo border">dishdash</p>
                </div>
                <div className="col-8 signupcompany_form_container ">
                    <h1 className="signupcompany_title">Signup Company</h1>
                    <p className="signupcompany_subtitle">Welcome! Please sign up</p>
                    <form className="col-12 col-md-12 mb-3 mx-auto" >
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label signupcompany_label">Name</label>
                            <input className="form-control" id="name" aria-describedby="emailHelp" placeholder="Name" value={formData.nombre} onChange={(data) => {setFormData({...formData, nombre: data.target.value})}} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cif" className="form-label signupcompany_label">CIF</label>
                            <input className="form-control" id="cif" placeholder="CIF" value={formData.cif} onChange={(data) => {setFormData({...formData, cif: data.target.value})}} required/>
                        </div>
                        <p className="signupcompany_label">Adress</p>
                        <div className="row">
                            <div className="col-12 mb-3">
                                <input className="form-control" id="number" placeholder="Street and number" value={formData.calleNumero} onChange={(data) => {setFormData({...formData, calleNumero: data.target.value})}} required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 mb-3">
                                <input  className="form-control" id="unit" placeholder="Floor, door" value={formData.pisoPuerta} onChange={(data) => {setFormData({...formData, pisoPuerta: data.target.value})}} required/>
                            </div>
                            <div className="col-6 mb-3">
                                <input  className="form-control" id="postalCode" placeholder="Postal Code" value={formData.codigoPostal} onChange={(data) => {setFormData({...formData, codigoPostal: data.target.value})}} required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 mb-3">
                                <input type="lastName" className="form-control" id="city" placeholder="City" value={formData.ciudad} onChange={(data) => {setFormData({...formData, ciudad: data.target.value}); console.log(formData)}} required/>
                            </div>
                            <div className="col-6 mb-3">
                                <input className="form-control" id="state" placeholder="State" value={formData.estado} onChange={(data) => {setFormData({...formData, estado: data.target.value}); console.log(formData)}} required/>
                            </div>
                        </div>
                        <p>Are you doing?</p>
                        <div className="row">
                            <div className="col-12 col-md-4 form-check ms-5">
                                <input className="checkbox form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" checked={formData.delivery} onChange={handleCheckboxChange('delivery')}/>
                                <label className="form-check-label" htmlFor="inlineCheckbox1">Delivery</label>
                            </div>
                            <div className="col-12 col-md-4 form-check ms-5">
                                <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" checked={formData.reserva} onChange={handleCheckboxChange('reserva')}/>
                                <label className="form-check-label" htmlFor="inlineCheckbox2">Reservation</label>
                            </div>
                        </div>
                        <p className="mt-2">Choose your opening times:</p>
                        <div className="row">
                            <div className="col-12 col-md-4 form-check ms-5">
                                <input className="form-check-input" type="checkbox" id="mondayMorning" value="option1" checked={formData.mañana} onChange={handleCheckboxChange('mañana')}/>
                                <label className="form-check-label" htmlFor="monday">Morning</label>
                            </div>
                            <div className="col-12 col-md-4 form-check ms-5">
                                <input className="form-check-input" type="checkbox" id="mondayAfternoon" value="option2"checked={formData.tarde} onChange={handleCheckboxChange('tarde')} />
                                <label className="form-check-label" htmlFor="monday">Afternoon</label>
                            </div> 
                        </div>
                        {/* <div className="row">
                            <p className="col-12 col-md-3 ms-5">Monday</p>
                            <div className="col-12 col-md-2 form-check">
                                <input className="form-check-input" type="checkbox" id="mondayMorning" value="option1" checked={formData.lunes.mañana} onChange={handleCheckboxChange('mañana', 'lunes')}/>
                                <label className="form-check-label" htmlFor="monday">Morning</label>
                            </div>
                            <div className="col-12 col-md-2 form-check ms-3">
                                <input className="form-check-input" type="checkbox" id="mondayAfternoon" value="option2"checked={formData.lunes.tarde} onChange={handleCheckboxChange('tarde', 'lunes')} />
                                <label className="form-check-label" htmlFor="monday">Afternoon</label>
                            </div> */}
                        <div className="mb-3 form-check mt-3">
                            <input type="checkbox" className="form-check-input" id="exampleCheck4" checked={formData.terminosCondiciones} onChange={handleCheckboxChange('terminosCondiciones')}/>
                            <label className="form-check-label" htmlFor="exampleCheck1">I agree the <b>Terms and Conditions</b></label>
                        </div>
                        <button type="submit" className="btn col-12 mb-2 login_submit">Sign up</button>
                    </form>
                </div>
            </div>
        </div>  
    </>
    )
}
