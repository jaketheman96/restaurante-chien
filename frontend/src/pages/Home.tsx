// import { useDispatch, useSelector } from 'react-redux';
import MainHome from '../components/MainHome';
import Navbar from '../components/Navbar';
// import { changeName } from '../slicers/user.slicer';
// import { RootState } from '../store/store';

function Home() {
  // const name = useSelector((state: RootState): string => state.user.name)
  // const dispatch = useDispatch()

  // const handleChange = (event: any): void => {
  //   dispatch(changeName(event.target.value))
  // }

  return (
    <>
      <Navbar />
      <MainHome />
    </>
  )
}

export default Home;
