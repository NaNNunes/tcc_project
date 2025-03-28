import React from 'react'

import styles from "./User_Login.module.css"

const User_Login = () => {
  return (
    <div className={styles.boxcontent}>
        <div className={styles.logo}>
            <h1>ConsertAtivo</h1>
        </div>
        <hr />
        <div className={styles.credentials}>
            <label htmlFor="">
                CPF: <input type="text" name="" id="cpfusertxt" className={styles.inputlogin}/>
            </label>
            <label htmlFor="">
                Senha: <input type="password" name="" id="userpasstxt" className={styles.inputlogin}/>
            </label>   
        </div>
        <div className={styles.frgtpass}><a href="" className={styles.frgt}>Esqueci a senha</a></div>
        <button className={styles.btn} type="button" onClick={{}}>Acessar</button>
        <hr />
        <div className="resgistrarse">
            <p>Não possui conta?</p>
            <button className={styles.btn}> Registrar-se</button>
        </div>
    </div>
  )
}

export default User_Login