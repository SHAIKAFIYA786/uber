# 🔁 FLOW: Connecting UserContext with CaptainSignup

## ✅ STEP 1: Create the Context (UserContext.js)
- Import necessary modules.
- Define the user state.
- Pass both `user` and `setuser` via the Context Provider.

```js
import React, { createContext, useState } from 'react';

export const UserContextData = createContext();

const UserContext = ({ children }) => {
  const [user, setuser] = useState({
    email: '',
    fullname: '',
    lastname: ''
  });

  return (
    <UserContextData.Provider value={{ user, setuser }}>
      {children}
    </UserContextData.Provider>
  );
};

export default UserContext;
```

## ✅ STEP 2: Wrap Your App with the Context
In `App.js` or the top-most file that controls routes:

```js
import UserContext from './UserContext';

function App() {
  return (
    <UserContext>
      {/* Your routes/components */}
    </UserContext>
  );
}

export default App;
```
> This makes `user` and `setuser` available in all components wrapped inside.

## ✅ STEP 3: Use the Context in CaptainSignup
- Import the context and grab the setter function:

```js
import { useContext } from "react";
import { UserContextData } from "../UserContext"; // adjust path if needed

const { setuser } = useContext(UserContextData);
```

- Then, after the user submits the form:

```js
setuser({
  email: email,
  fullname: firstname,
  lastname: lastname,
});
```
> This will update the global user state, and any component consuming this context will get the updated info.

## ✅ STEP 4: Access the User Info Anywhere
In any other component, just do:

```js
import { useContext } from "react";
import { UserContextData } from "../UserContext";

const { user } = useContext(UserContextData);
```
> Now `user.email`, `user.fullname`, etc., are available anywhere in your app.

---

## 🧠 Example: Final Context Flow Recap

| Step | Action |
|------|--------|
| 1 | Create `UserContext` with `user` and `setuser` |
| 2 | Wrap `<App />` in `<UserContext>` |
| 3 | Use `useContext` in `CaptainSignup` to access `setuser` |
| 4 | On form submit, call `setuser({ ... })` |
| 5 | Anywhere in app, use `useContext` to read user info |

---

Would you like the complete code setup wired together in one place for testing? Let me know!

