import "./Popup.css";

const Popup = ({ isOpen, onClose, message }) => {
  return (
    <section className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div
        className="popup__container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button type="button" className="popup__close" onClick={onClose} />
        <p className="popup__text">{JSON.stringify(message)}</p>
      </div>
    </section>
  );
};

export default Popup;
