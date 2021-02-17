import React, { useState ,Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import Spinner from '../Layout/Spinner'

const NewPost = ({ addPost ,history }) => {
  const [text, setText] = useState('');
  const [img,setImage] = useState('')
  const [loading,setLoading] = useState(false)

  const uploadImage = image =>{
    setLoading(true)
    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","media-clone")
    data.append("cloud_name","tallam")
    fetch("https://api.cloudinary.com/v1_1/tallam/image/upload",{
        method : 'POST',
        body:data
    })
    .then(res=>res.json())
    .then(data=>{
        setImage(data.url)
        setLoading(false)
    })
    .catch(err=>console.log(err))
  }

  const cancel=()=>{
    setLoading(false)
    setText('')
    setImage('')
    history.goBack()
  }
  return loading ?  <Spinner /> :(
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Say Something...</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addPost({ text , img:img },history);
          setText('');
          setImage('')
        }}
      >
        {img ? <img src={img} className="NewPostImage"/> : <Fragment />  }
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <div style={{ "display": "inline-block"}}>
            <label>
                <input type="file" style={{display:"none"}} onChange={e=>uploadImage(e.target.files[0])}/>
                <span className="btn btn-primary">Upload Pic</span>
            </label>
        </div>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
        <button className="btn btn-danger" onClick={cancel}>cancel</button>
      </form>
    </div>
  );
};

NewPost.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(NewPost);