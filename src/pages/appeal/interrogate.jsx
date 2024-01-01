import React from 'react'
import Result from '../../components/result'
import { useParams } from 'react-router-dom';

const Interrogate = () => {
 const { basvuruNo } = useParams();
  return (
    <Result id={basvuruNo} />
  )
}

export default Interrogate