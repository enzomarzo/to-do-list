This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

You can view the live page at: https://to-do-list-enzomarzo.vercel.app/

if you want to run it locally:
- `npm run dev` and open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Initial Goal

Develop a notes application that enables users to take quick and easy notes utilizing browser storage.

### How it works

I have designed both a menu and a content component for note management. Additionally, I've developed a custom hook to effectively handle the data, thereby segregating the data management aspect from the remaining code.

Some features that have been developed:
- **Add Note**: add your fist note by writing the title / content or type a title in the menu input
- **Remove note**: click the garbage icon on the menu
- **Save note** don't forget to reach the save button or use the keyboard shortcut `crtl + s`.
- **Sort notes** use the options to sort by name or date

### Next possible steps

- Implement a **light mode** and allow the user to switch between it and the default dark mode
- Add a **search function** to allow users to search for specific notes
  As the app grows, consider using a tool like the **Context API** or Redux to manage the application's state
- Integrate the **Jest library** and add unit tests for components
- Allow users to save notes as **PDFs**
- Allow users to **insert markdown** and **add images** to notes
