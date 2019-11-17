import * as React from 'react';
// routing, etc.

interface Person {
  firstName: string,
  lastName: string
}

const greeter = (person: Person): string => `Hello ${person.firstName} ${person.lastName}!`;

export default function App() {
  const user: Person = {
    firstName: 'Mahesh',
    lastName: 'Makani',
  };

  return (
    <div>
      <h1>hbk stream front</h1>
      <h2>{greeter(user)}</h2>
    </div>
  );
}
