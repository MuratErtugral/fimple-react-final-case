import React from 'react'
import styles from '../styles/components/loader.module.css'
import withTheme from '../hoc/withTheme'

const Loader = ({theme}) => {
  return (
    <div className={`${styles.loader} ${theme === 'dark' && styles.dark }`}></div>
  )
}

export default withTheme(Loader)