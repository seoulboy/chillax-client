import React, { useState, useEffect, useRef } from 'react';
import './UploadForm.scss';

const UploadForm = props => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('white-noise');
  const [description, setDescription] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const audioInput = useRef(null);
  const thumbnailInput = useRef(null);

  useEffect(() => {
    if (!props.showUploadModal) {
      setTitle('');
      setType();
      setDescription('');
      setAudioFile(null);
      setThumbnailFile(null);
    }
  }, [props.showUploadModal]);

  const submitHandler = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    props.uploadSound(formData, props.user._id);
  };

  // TODO: if white noise is checked, allow upto 4 sounds upload.
  // loading animation when file is being uploaded.
  return (
    <div className='form-container'>
      <form
        className='upload-form'
        onSubmit={e => submitHandler(e)}
        encType='multipart/form-data'
      >
        <label htmlFor='upload-sound'>
          <p>Drag and drop your white noise here.</p>
          <br />
          or choose files to upload
          <br />
          <input
            id='upload-sound'
            type='file'
            name='sound'
            accept='audio/*'
            ref={audioInput}
            onChange={e => setAudioFile(e.target.files[0])}
          />
        </label>
        {
          <label htmlFor='upload-thumbnail'>
            Upload Thumbnail
            <br />
            <input
              id='upload-thumbnail'
              type='file'
              name='image'
              accept='image/*'
              ref={thumbnailInput}
              onChange={e => setThumbnailFile(e.target.files[0])}
            />
          </label>
        }
        {thumbnailFile && (
          <label htmlFor='upload-title'>
            <input
              id='upload-title'
              name='title'
              type='text'
              placeholder='enter title'
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </label>
        )}
        {thumbnailFile && (
          <label>
            <input
              type='radio'
              name='type'
              value='white-noise'
              defaultChecked
              onChange={e => setType(e.target.value)}
            />
            white noise
            <input
              type='radio'
              name='type'
              value='soundscape'
              onChange={e => setType(e.target.value)}
            />
            soundscape
          </label>
        )}
        {thumbnailFile && (
          <label htmlFor='upload-description'>
            <input
              type='text'
              name='description'
              placeholder='describe your sound here'
              onChange={e => setDescription(e.target.value)}
              value={description}
              required
            />
          </label>
        )}

        {thumbnailFile && <input type='submit' value='Upload' />}
      </form>
    </div>
  );
};

export default UploadForm;
