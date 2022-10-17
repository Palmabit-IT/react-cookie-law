import React from 'react';

interface Props {
  checked?: boolean
  onChange?: (checked: boolean) => void
  id?: string
  text?: string
  styles?: Record<string, React.CSSProperties>
  disabled?: boolean
}

interface State {
  checked: boolean
}

class CookieOption extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { checked = false } = props;
    this.state = { checked };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange() {
    const { onChange = () => undefined } = this.props;
    const { checked } = this.state;
    const newValue = !checked;

    this.setState({ checked: newValue });
    onChange(newValue);
  }

  render() {
    const {
      id = '',
      text = '',
      styles = {},
      disabled = false,
    } = this.props;

    const isDisabled = disabled ? { disabled } : {};
    const { checked } = this.state;

    const { optionWrapperStyle, optionLabelStyle, checkboxStyle } = styles;

    return (
      <div
        className="react-cookie-law-option-wrapper"
        style={optionWrapperStyle}
      >
        <input
          type="checkbox"
          id={id}
          className="react-cookie-law-option-checkbox"
          style={checkboxStyle}
          checked={checked}
          onChange={this.handleOnChange}
          {...isDisabled}
        />
        <label htmlFor={id} style={optionLabelStyle}>
          {text}
        </label>
      </div>
    );
  }
}

export default CookieOption;
