import React from "react";
import PropTypes from "prop-types";

function ColorControl({ label, value, onChange }) {
  return (
    <div>
      <label>{label}</label>
      <input type="color" value={value} onChange={onChange} />
    </div>
  );
}

ColorControl.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ColorControl;
