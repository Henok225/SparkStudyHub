import React, { useState } from 'react';
import { FileQuestionMark } from 'lucide-react';
import { assets } from '../../../assets/assets';

const CheckImage = ({ imageUrl, Icon, title }) => {
  const [imageLoaded, setImageLoaded] = useState(true);

  const handleImageError = () => {
    setImageLoaded(false);
  };

  if (!imageUrl || !imageLoaded) {
    return (
      <div className="image-icon-placeholder">
       <img src={assets.thumbnail1_icon} alt="" /> 
       {/* <Icon color='lightblue' size={100} /> */}
      </div>
    );
  }

  return (
    <img 
      src={imageUrl} 
      alt={`Image for quiz on ${title}`} 
      onError={handleImageError} 
    />
  );
};

export default CheckImage;