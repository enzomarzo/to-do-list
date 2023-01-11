This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

I chose to use Next because it provides out-of-the-box tools and is quick and easy to get started.

### Getting Started

You can view the live page at: https://to-do-list-enzomarzo.vercel.app/

if you want to run it locally:

- `npm run dev` and open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### The challenge

create a Notes Application that allow the user to take very simple notes that uses Browser Storage

### How it works

I have created a menu and a content component for managing notes. I have also created a custom hook to handle the data, separating the responsibility of data management from the rest of the code.

- **Add Note**: add your fist note by writing the title / content or type a title in the menu input
- **Remove note**: click the garbage icon on the menu
- **Save note** don't forget to reach the save button or use the keyboard shortcut `crtl + s`.
- **Sort notes** use the options to sort by name or date

As the app grows it makes sense to use a tool like the Context API or Redux to manage the application's state

### Next possible steps

- Implement a **light mode** and allow the user to switch between it and the default dark mode
- Add a **search function** to allow users to search for specific notes
  As the app grows, consider using a tool like the **Context API** or Redux to manage the application's state
- Integrate the **Jest library** and add unit tests for components
- Allow users to save notes as **PDFs**
- Allow users to **insert markdown** and **add images** to notes
