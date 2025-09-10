import React, { useState } from 'react';
import "./ConfirmationPrompt.css"

// ConfirmationDialog component
// This component handles the display logic and user interaction.
const ConfirmationPrompt = ({ message, onConfirm, onCancel, isVisible }) => {
  if (!isVisible) return null; // Don't render if not visible

  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Confirm Action</h2>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="button-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="button-confirm" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
     
    </div>
  );
};

export default ConfirmationPrompt;