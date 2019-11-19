import React, { Component } from 'react';
import axios from 'axios';

class AddNewProducts extends Component {

  // UNSAFE_componentWillMount() {
  //   axios({
  //     url: '',
  //     method: 'post',
  //   })
  // }


  changeImage = (e) => {
    console.log(e.target.files);
    console.log(e.target.files[0]);
  }


  handleSubmit = () => {
    console.log(this.refs.input.files[0]);
    let file = this.refs.input.files[0];

    let formdata = new FormData();

    formdata.append('myfile', file);
    // formdata.append('name', file.name);

    axios({
      url: 'http://localhost:4000/server/upload.php',
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data'
      },
      data: formdata
    }).then(res => {
      console.log(res.data)
    })
  }

  render() {
    return (
      <div className="cod-md-8 home-admin__item home-admin__addproducts">
          <div className='home-admin__item--title'>
              <h2>Add New Products</h2>
          </div>
          <input type='file' name='file' ref='input' accept='image/*' onChange={this.changeImage}/>
          <button type='button' onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

export default AddNewProducts;
