import { observer } from 'mobx-react-lite';
import { todo } from '../mobx/todo';



const TotalCompleteItems = observer(() => {
  const todos = todo.todos?.filter((todo) => todo.completed === true);

	return <h4 className='mt-3'>{`Total Complete Items: ${todos?.length}`}</h4>;
})

export default TotalCompleteItems;
