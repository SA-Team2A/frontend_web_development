import React, { Component } from 'react'

// Assets
import landing1 from '../../assets/landing1.jpg'
import feature_1 from '../../assets/feature_1.png'
import feature_2 from '../../assets/feature_2.png'
import feature_3 from '../../assets/feature_3.png'

export default class Landing extends Component {
  render() {
    document.title = 'Cucinapp'
    return (
      <div className="adjust-margin">
        <div className="container-fluid">
          <div className="section">
            <div className="row">
              <div className="gradient"></div>
                <img src={ landing1 } className="bg-img" alt="Landing"/>
              <div className="all-center text-center">
                <h1 className="super-big text-white">Cucinapp</h1>
                <h1 className="text-white gv-font">Busca, comparte y prueba recetas.</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="section d-flex">
            <div className="row align-self-center d-flex w-100">
              <div className="col-md-6 align-self-center w-100">
                <h1 className="">Cocina paso a paso</h1>
                <p className='primary-color-text'>
                  Obtén instrucciones paso a paso para cocinar de forma facil y sencilla.
                </p>
              </div>
              <div className="col-md-6">
                <img src={ feature_1 } className="img-features-v" alt="Feature_1"/>
              </div>
            </div>
          </div>

          <hr />
          <div className="section d-flex">
            <div className="row align-self-center d-flex w-100">
              <div className="col-md-6">
                <img src={ feature_2 } className="img-features" alt="Feature_2"/>
              </div>
              <div className="col-md-6 align-self-center w-100">
                <h1>Diversas recetas</h1>
                <p className='primary-color-text'>
                  Encuentra ideas y recetas para cualquier ocasión y que encajen con
                  tus necesidades
                </p>
              </div>
            </div>
          </div>

          <hr />
          <div className="section d-flex">
            <div className="row align-self-center d-flex w-100">
              <div className="col-md-6 align-self-center w-100">
                <h1>Colecciones y Favoritos</h1>
                <p className='primary-color-text'>
                  Guarda tus recetas favoritas para después y organizate al momento
                  de cocinar, o agrupalas en colecciones para facilitar tu busqueda
                  (navidad, postres, asado).
                </p>
              </div>
              <div className="col-md-6">
                <img src={ feature_3 } className="img-features" alt="Feature_3"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
