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

<!-- Would you like the complete code setup wired together in one place for testing? Let me know!



how the animation running for example see 
how see hpw smartly you are the using the useref and those thing 
for example see the when to present the location page is upto us am i right

for example let say the 
const [openPanel,setPanel]=useSate(false);
instaily false but when you click one the input field we are running the function onclick which will cahge the setPanel value to the true 
here the state of the variable changes when the satte changes gsap with the the help of the reference variable it will it animation 
refernce is just  used to remember the panel page for the panel page we will have given the panelref
 
 now here the variable changed right 
 it will run gasap code and which variabeit has target it will known by reference variable


     useGSAP(function () {
        if (openPanel) {
            gsap.to(panelRef.current, {
                height: '70%',
                duration: 1,
                ease: 'power2.inOut',
            });
        } else {
            gsap.to(panelRef.current, {
                height: '0%'
            });
        }
    }, [openPanel]); -->

## GSAP Panel Animation Documentation

### ✨ Purpose
To smoothly animate the **Location Search Panel** using `GSAP` when the input fields are clicked — i.e., when the user wants to pick or enter a location.

---

### ✅ Key Concepts Used
- **`useState`** – To manage the visibility of the panel.
- **`useRef`** – To point to the actual DOM element that should be animated.
- **`useGSAP`** – A special hook from `@gsap/react` to run animations whenever dependencies change (just like `useEffect`).

---

### ⚙️ Step-by-step Working

#### 1. Initial Setup
```js
const [openPanel, setPanel] = useState(false);
const panelRef = useRef(null);
```
- `openPanel` starts as `false`, meaning the panel is **hidden** initially.
- `panelRef` is used to **target the panel DOM element** for animation.

---

#### 2. User Action Triggers State Change
```js
<input
  type="text"
  onClick={() => setPanel(true)}
/>
```
- When the user clicks the input box (to enter location), `setPanel(true)` is called.
- This changes `openPanel` from `false` ➝ `true`.

---

#### 3. GSAP Hook Listens for Change
```js
useGSAP(() => {
    if (openPanel) {
        gsap.to(panelRef.current, {
            height: '70%',
            duration: 1,
            ease: 'power2.inOut',
        });
    } else {
        gsap.to(panelRef.current, {
            height: '0%'
        });
    }
}, [openPanel]);
```

- This hook **runs whenever `openPanel` changes.**
- If `openPanel === true`, it animates the panel height from `0%` ➝ `70%`, making it **slide up and appear.**
- If `openPanel === false`, it goes back to `0%`, hiding the panel.

---

### 📌 How `useRef` Helps
- `panelRef` gives direct access to the actual HTML element (`<div>` in this case).
- Without `useRef`, GSAP wouldn't know **which element to animate.**
- You assign the ref like this:

```js
<div ref={panelRef} className="...">...</div>
```

So, GSAP internally does something like:
> "Hey, I’ll animate whatever element `panelRef.current` is pointing to."

---

### ✅ Summary
| Concept         | Purpose                                  |
|----------------|-------------------------------------------|
| `useState`     | Manage toggle state for the panel         |
| `useRef`       | Remember the DOM element to animate       |
| `useGSAP`      | Run animation when state changes          |
| `gsap.to()`    | Actually performs the animation effect    |


