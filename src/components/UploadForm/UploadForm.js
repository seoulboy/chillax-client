import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import './UploadForm.scss';

const UploadForm = props => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState('//:0');

  const audioInput = useRef(null);
  const thumbnailInput = useRef(null);
  const thumbnailDiv = useRef(null);
  const whiteNoiseRadioBtn = useRef(null);
  const soundScapeRadioBtn = useRef(null);

  useEffect(() => {
    if (!props.showUploadModal) {
      setTitle('');
      setType();
      setDescription('');
      setAudioFile(null);
      setThumbnailFile(null);
    }
  }, [props.showUploadModal]);

  const blobToFile = (blob, fileName) => {
    blob.lastModifiedDate = new Date();
    blob.name = fileName;
    return blob;
  };

  const submitHandler = async e => {
    e.preventDefault();
    console.log('submithandler called');
    const formData = new FormData(e.target);
    // delete original image from formdata
    formData.delete('image');
    if (thumbnailFile) {
      // capture and store it in a variable
      const thumbnailCanvas = await html2canvas(thumbnailDiv.current);
      const thumbnailDataURL = thumbnailCanvas.toDataURL();

      // convert to blob
      fetch(thumbnailDataURL)
        .then(response => response.blob())
        .then(blob => {
          // append the blob to formdata as image and upload
          const resizedThumbnailFile = blobToFile(blob, 'thumbnail.jpg');
          formData.append('image', resizedThumbnailFile);
          props.uploadSound(formData, props.user._id);
          alert('upload successful!');
        });
    } else {
      formData.append('defaultImage', props.user.thumbnail);
      props.uploadSound(formData, props.user._id);
      alert('upload successful!');
    }
    clearInputFields();
    props.handleClose();
  };

  const handleImageResizing = event => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = event => {
      const image = document.createElement('img');
      image.onload = () => {
        const canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);

        const MAX_WIDTH = 1000;
        const MAX_HEIGHT = 1000;
        var width = image.width;
        var height = image.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, width, height);
        var dataUrl = canvas.toDataURL('image/png');
        setPreviewSrc(dataUrl);
      };
      image.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const titleCase = str => {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  };

  const parseFileName = filename => {
    const nameWithoutExtension = filename.replace(/\.[^/.]+$/, '');
    const spacedOutName = nameWithoutExtension
      .split('_')
      .join(' ')
      .split('-')
      .join(' ');
    return titleCase(spacedOutName);
  };

  const clearInputFields = () => {
    whiteNoiseRadioBtn.current.checked = false;
    thumbnailInput.current.value = null;
    audioInput.current.value = null;
    setPreviewSrc('//:0');
  };

  return (
    <div className='form-container'>
      <form
        className='upload-form'
        onSubmit={e => submitHandler(e)}
        encType='multipart/form-data'
      >
        <div className='sound-thumbnail-input-container'>
        <span>Select the type of sound you would like to upload:</span>
        <br/>

          <label className='type-label'>
            <input
              ref={whiteNoiseRadioBtn}
              type='radio'
              name='type'
              value='white-noise'
              onChange={e => {
                setType(e.target.value);
                audioInput.current.value = '';
              }}
            />
            <span className='white-noise-text'>white noise</span>
          </label>
          

          <label
            htmlFor='upload-sound'
            className={type ? 'visible' : 'invisible'}
          >
            <div>
              <p className={type === 'soundscape' ? 'invisible' : 'visible'}>
                <br />
                You can upload a single sound for white noise.
                <br />
              </p>
              <p className={type === 'soundscape' ? 'visible' : 'invisible'}>
                <br />
                You can upload upto four sound for soundscape.
                <br />
              </p>

              <input
                id='upload-sound'
                type='file'
                name='sound'
                accept='audio/*'
                ref={audioInput}
                onChange={e => {
                  if (e.target.files[0]) {
                    setAudioFile(e.target.files[0]);
                    setTitle(parseFileName(e.target.files[0].name));
                  }
                }}
                multiple={type === 'white-noise' ? false : 'multiple'}
              />
            </div>
          </label>
          <label
            htmlFor='upload-thumbnail'
            className={audioFile ? 'visible' : 'invisible'}
          >
            <div className='thumb' ref={thumbnailDiv}>
              <img id='thumbnail-preview' src={previewSrc} alt='' />
              <button
                type='button'
                className={thumbnailFile ? 'invisible' : 'visible'}
                onClick={e => {
                  e.preventDefault();
                  thumbnailInput.current.click();
                }}
              >
                Upload image
              </button>
            </div>
            <p>
              <button
                id='replace-image-button'
                type='button'
                className={thumbnailFile ? 'visible' : 'invisible'}
                onClick={e => {
                  e.preventDefault();
                  thumbnailInput.current.click();
                }}
              >
                replace image
              </button>
              <input
                id='upload-thumbnail'
                type='file'
                name='image'
                accept='image/*'
                ref={thumbnailInput}
                onChange={e => {
                  if (e.target.value) {
                    handleImageResizing(e);
                    setThumbnailFile(e.target.value);
                  }
                }}
              />
            </p>
          </label>
        </div>
        <div className='title-description-container'>
          <label
            htmlFor='title-input'
            className={audioFile ? 'visible' : 'invisible'}
          >
            <span className='required-field'>*</span>Title
            <br />
            <input
              id='title-input'
              name='title'
              type='text'
              placeholder='enter title'
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </label>
          <label
            htmlFor='description-input'
            className={audioFile ? 'visible' : 'invisible'}
          >
            <span className='required-field'>*</span>Description
            <br />
            <textarea
              cols='40'
              rows='5'
              id='description-input'
              name='description'
              placeholder='describe your sound here'
              onChange={e => setDescription(e.target.value)}
              value={description}
              required
            />
          </label>
        </div>
        <div className='decision-buttons-container'>
          <div className={audioFile ? 'visible' : 'invisible'}>
            <span className='required-field'>*</span>Required Fields
            <div className='save-cancel-button-container'>
              <button
                id='cancel-button'
                type='button'
                onClick={() => {
                  clearInputFields();
                  props.handleClose();
                }}
              >
                Cancel
              </button>
              <input id='save-button' type='submit' value='Save' />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
