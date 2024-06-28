import { Toast } from "react-bootstrap";

const ToastComponent = ({
  toastTitle,
  toastText,
  className,
  show,
  toggleShow,
}) => {
  return (
    <Toast className={className} show={show} onClose={toggleShow}>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">{toastTitle}</strong>
        <small>just now</small>
      </Toast.Header>
      <Toast.Body>{toastText}</Toast.Body>
    </Toast>
  );
};

export default ToastComponent;
