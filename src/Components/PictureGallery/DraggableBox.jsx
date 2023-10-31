
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const DraggableBox = ({ id, content }) => {
  const [, ref] = useDrag({
    type: 'box',
    item: { id, type: 'box' },
  });

  return (
    <div ref={ref} className="box">
      {content}
    </div>
  );
};
export default DraggableBox;
  

DraggableBox.propTypes ={
   props_name: PropTypes.element.any
}