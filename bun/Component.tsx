function Component(props: { message: string }) {
  return (
    <body>
      <h1>{props.message}</h1>
    </body>
  );
}

console.log(Component({ message: 'Hello, world!' }));