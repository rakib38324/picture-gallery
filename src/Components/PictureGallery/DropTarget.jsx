/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';


const DropTarget = ({ id, content, moveBox }) => {
    const [, ref] = useDrop({
      accept: 'box',
      drop: (draggedItem) => {
        if (draggedItem.id !== id) {
          moveBox(draggedItem.id, id);
        }
      },
    });
  
    return (
      <div ref={ref} className="box">
        {content}
      </div>
    );
  };

  export default DropTarget;
  

  DropTarget.propTypes ={
   props_name: PropTypes.element.any
}