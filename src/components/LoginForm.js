import React from 'react'
const LoginForm = ({username, password, fieldHandler, loginHandler}) => (
  <div>
    <h2>Log in</h2>

    <form onSubmit={loginHandler}>
      <div>
        username
          <input
          type="text"
          name="username"
          value={username}
          onChange={fieldHandler}
        />
      </div>
      <div>
        password
          <input
          type="password"
          name="password"
          value={password}
          onChange={fieldHandler}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)
export default LoginForm