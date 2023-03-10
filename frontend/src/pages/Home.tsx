import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import { changeName } from '../slicers/test.slicer';
import { RootState } from '../store/store';

function Home() {
  const name = useSelector((state: RootState): string => state.test.name)
  const dispatch = useDispatch()

  const handleChange = (event: any): void => {
    dispatch(changeName(event.target.value))
  }

  return (
    <div>
      <Navbar />
      This is home page!
      <input type='text' onChange={handleChange} />
      <p>{`o nome é ${name}`}</p>
    </div>
  )
}

export default Home;
