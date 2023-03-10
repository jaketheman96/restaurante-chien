import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeName } from '../slicers/test.slicer';
import { RootState } from '../store/store';

function Home() {
  const name = useSelector((state: RootState) => state.test.name)
  const dispatch = useDispatch()

  const handleChange = (event: any) => {
    dispatch(changeName(event.target.value))
  }

  return (
    <div>
      This is home page!
      <input type='text' onChange={handleChange} />
      <p>{`o nome é ${name}`}</p>
    </div>
  )
}

export default Home;
