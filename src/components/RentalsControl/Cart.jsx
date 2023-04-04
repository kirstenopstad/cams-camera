import PropTypes from 'prop-types';

export default function Cart({items}) {
  return (
    <div className="my-2">
      {items.map((item) => {
        return (
          <>
            <p>{item.brand} {item.model}</p>
          </>
        );
      })}
    </div>
  );
}

Cart.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object)
}